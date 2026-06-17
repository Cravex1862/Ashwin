/**
 * Lightweight markdown-to-HTML converter for rendering GitHub READMEs.
 * Supports headings, bold, italic, strikethrough, inline code, fenced code blocks,
 * links, images, unordered/ordered lists, blockquotes, horizontal rules, and tables.
 */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function processInline(text) {
  // 1. Extract inline code to protect it from further processing
  const codes = [];
  let result = text.replace(/`([^`]+)`/g, (_, code) => {
    codes.push(code);
    return `%%ICODE${codes.length - 1}%%`;
  });

  // 2. Escape HTML
  result = escapeHtml(result);

  // 3. Images (must be before links since ![...](...) starts with !)
  result = result.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="md-img" loading="lazy" decoding="async" />'
  );

  // 4. Links
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="md-link">$1</a>'
  );

  // 5. Bold + Italic (***text***)
  result = result.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  // Bold (**text**)
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic (*text*) — avoid matching inside URLs
  result = result.replace(/(?<![\\w*])\*([^*\n]+)\*(?![\\w*])/g, '<em>$1</em>');
  // Strikethrough (~~text~~)
  result = result.replace(/~~(.*?)~~/g, '<del>$1</del>');

  // 6. Restore inline code
  result = result.replace(/%%ICODE(\d+)%%/g, (_, i) => {
    return `<code class="md-inline-code">${escapeHtml(codes[parseInt(i)])}</code>`;
  });

  return result;
}

export function markdownToHtml(md) {
  if (!md) return '';

  const lines = md.split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // --- Fenced code blocks ---
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      out.push(
        `<pre class="md-pre${lang ? ` language-${escapeHtml(lang)}` : ''}"><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`
      );
      continue;
    }

    // --- Empty line ---
    if (trimmed === '') { i++; continue; }

    // --- Headers ---
    const hMatch = trimmed.match(/^(#{1,6})\s+(.*)/);
    if (hMatch) {
      const lvl = hMatch[1].length;
      out.push(`<h${lvl} class="md-h${lvl}">${processInline(hMatch[2])}</h${lvl}>`);
      i++;
      continue;
    }

    // --- Horizontal rules ---
    if (/^[-*_]{3,}\s*$/.test(trimmed)) {
      out.push('<hr class="md-hr" />');
      i++;
      continue;
    }

    // --- Blockquotes ---
    if (trimmed.startsWith('>')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      out.push(
        `<blockquote class="md-blockquote">${quoteLines.map(l => processInline(l)).join('<br/>')}</blockquote>`
      );
      continue;
    }

    // --- Unordered lists ---
    if (/^[-*+]\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*+]\s+/, ''));
        i++;
      }
      out.push(
        `<ul class="md-ul">${items.map(it => `<li>${processInline(it)}</li>`).join('')}</ul>`
      );
      continue;
    }

    // --- Ordered lists ---
    if (/^\d+[.)]\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ''));
        i++;
      }
      out.push(
        `<ol class="md-ol">${items.map(it => `<li>${processInline(it)}</li>`).join('')}</ol>`
      );
      continue;
    }

    // --- Tables ---
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableRows = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableRows.push(lines[i].trim());
        i++;
      }
      if (tableRows.length >= 2) {
        const headerCells = tableRows[0].split('|').filter(c => c.trim()).map(c => c.trim());
        const bodyRows = tableRows.slice(2); // skip separator row
        let tableHtml = '<div class="md-table-wrap"><table class="md-table"><thead><tr>';
        headerCells.forEach(cell => { tableHtml += `<th>${processInline(cell)}</th>`; });
        tableHtml += '</tr></thead><tbody>';
        bodyRows.forEach(row => {
          const cells = row.split('|').filter(c => c.trim()).map(c => c.trim());
          tableHtml += '<tr>';
          cells.forEach(cell => { tableHtml += `<td>${processInline(cell)}</td>`; });
          tableHtml += '</tr>';
        });
        tableHtml += '</tbody></table></div>';
        out.push(tableHtml);
      }
      continue;
    }

    // --- Standalone image ---
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (imgMatch) {
      out.push(
        `<figure class="md-figure"><img src="${escapeHtml(imgMatch[2])}" alt="${escapeHtml(imgMatch[1])}" class="md-img" loading="lazy" decoding="async" /></figure>`
      );
      i++;
      continue;
    }

    // --- Paragraph (collect consecutive non-special lines) ---
    const pLines = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('>') &&
      !/^[-*+]\s+/.test(lines[i].trim()) &&
      !/^\d+[.)]\s+/.test(lines[i].trim()) &&
      !/^[-*_]{3,}\s*$/.test(lines[i].trim()) &&
      !(lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|'))
    ) {
      pLines.push(lines[i]);
      i++;
    }
    out.push(`<p class="md-p">${processInline(pLines.join(' '))}</p>`);
  }

  return out.join('\n');
}
