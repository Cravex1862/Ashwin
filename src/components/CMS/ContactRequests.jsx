import React, { useState, useEffect } from 'react';

export default function ContactRequests() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('cms_token');
      const response = await fetch('/api/contacts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setContacts(data.reverse()); // Most recent first
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Requests</h2>
      <div className="space-y-4">
        {contacts.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No contact requests yet
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-[#0f0f0f] border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{contact.name}</h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-[#76B2F0] hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(contact.createdAt).toLocaleDateString()} {new Date(contact.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap">{contact.reason}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
