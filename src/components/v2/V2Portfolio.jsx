import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import HeroPortal from './HeroPortal';
import SkillsSection from './SkillsSection';
import ProjectsSection3D from './ProjectsSection3D';
import ContactSection3D from './ContactSection3D';
import ProjectDetail3D from './ProjectDetail3D';
import SEOHead from '../SEO/SEOHead';
import { PersonSchema, WebSiteSchema, BreadcrumbSchema, ProjectSchemas } from '../SEO/JSONLD';
import { playClickSound, playWhooshSound } from '../../utils/audio';
import { SITE_URL } from '../../utils/seo';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function V2Portfolio({ projects, onProjectClick }) {
  const canvasRef = useRef();
  const containerRef = useRef();
  const cameraRef = useRef(null);
  const scrollTriggerInstanceRef = useRef(null);
  const savedCameraState = useRef(null);
  const [phase, setPhase] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);

  const scrollToSection = (targetY) => {
    playClickSound();
    playWhooshSound(150);
    gsap.to(window, { scrollTo: { y: targetY, autoKill: false }, duration: 0.45, ease: "power3.out" });
  };

  const handleV2ProjectClick = (project) => {
    if (!project || !cameraRef.current) return;
    playClickSound();
    playWhooshSound(150);

    const cam = cameraRef.current;
    savedCameraState.current = {
      px: cam.position.x, py: cam.position.y, pz: cam.position.z,
      rx: cam.rotation.x, ry: cam.rotation.y, rz: cam.rotation.z,
    };

    if (scrollTriggerInstanceRef.current) {
      scrollTriggerInstanceRef.current.disable();
    }

    gsap.to(cam.position, {
      z: -60, x: -25, y: 15,
      duration: 0.7, ease: 'power4.inOut',
    });
    gsap.to(cam.rotation, {
      y: Math.PI * 0.7, x: -0.2, z: 0.1,
      duration: 0.7, ease: 'power4.inOut',
    });

    setSelectedProject(project);
  };

  const handleV2ProjectBack = () => {
    playClickSound();
    playWhooshSound(150);

    const saved = savedCameraState.current;
    if (saved && cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: saved.px, y: saved.py, z: saved.pz,
        duration: 0.5, ease: 'power3.inOut',
      });
      gsap.to(cameraRef.current.rotation, {
        x: saved.rx, y: saved.ry, z: saved.rz,
        duration: 0.5, ease: 'power3.inOut',
        onComplete: () => {
          if (scrollTriggerInstanceRef.current) {
            scrollTriggerInstanceRef.current.enable();
          }
        },
      });
    } else if (scrollTriggerInstanceRef.current) {
      scrollTriggerInstanceRef.current.enable();
    }

    setSelectedProject(null);
  };

  // Lock body scroll while viewing a project
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x050505, 0.015);

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const masterGroup = new THREE.Group();
      scene.add(masterGroup);

      const pulseLight = new THREE.PointLight(0x76B2F0, 5, 30);
      masterGroup.add(pulseLight);

      const starGeo = new THREE.BufferGeometry();
      const starCount = 15000;
      const starPos = new Float32Array(starCount * 3);
      for(let i = 0; i < starCount * 3; i++) {
        starPos[i] = (Math.random() - 0.5) * 400;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.15, transparent: true, opacity: 0.6 });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      const introGeo = new THREE.IcosahedronGeometry(4, 3);
      const introMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            float mixVal = sin(vUv.y * 10.0 + uTime * 2.0) * 0.5 + 0.5;
            vec3 color = mix(vec3(0.46, 0.70, 0.94), vec3(0.96, 0.11, 0.66), mixVal); 
            gl_FragColor = vec4(color, 0.8);
          }
        `,
        wireframe: true,
        transparent: true,
        opacity: 1
      });
      const introMesh = new THREE.Mesh(introGeo, introMat);
      masterGroup.add(introMesh);

      const constGeo = new THREE.BufferGeometry();
      const constCount = 3000;
      const constPos = new Float32Array(constCount * 3);
      for(let i = 0; i < constCount * 3; i++) {
        constPos[i] = (Math.random() - 0.5) * 60;
      }
      constGeo.setAttribute('position', new THREE.BufferAttribute(constPos, 3));
      const constMat = new THREE.PointsMaterial({ color: 0x76B2F0, size: 0.2, transparent: true, opacity: 0 });
      const constellation = new THREE.Points(constGeo, constMat);
      masterGroup.add(constellation);

      const crystalGeo = new THREE.OctahedronGeometry(4, 0);
      const pinkMat = new THREE.MeshStandardMaterial({
        color: 0xF61BA9, // Pink
        roughness: 0.9,
        metalness: 0.1,
        transparent: true,
        opacity: 0
      });
      const blueMat = new THREE.MeshStandardMaterial({
        color: 0x76B2F0, // Blue
        roughness: 0.9,
        metalness: 0.1,
        transparent: true,
        opacity: 0
      });
      const crystalMesh = new THREE.Mesh(crystalGeo, blueMat);
      crystalMesh.position.set(0, 0, -40);
      masterGroup.add(crystalMesh);

      const torusGeo = new THREE.TorusGeometry(5, 1, 16, 50);
      const torusMesh = new THREE.Mesh(torusGeo, pinkMat);
      torusMesh.position.set(-18, 10, -35);
      masterGroup.add(torusMesh);

      const dodecaGeo = new THREE.DodecahedronGeometry(4);
      const dodecaMesh = new THREE.Mesh(dodecaGeo, blueMat);
      dodecaMesh.position.set(18, -10, -30);
      masterGroup.add(dodecaMesh);

      // Phase 2 Shapes (Skills)
      const cylGeo = new THREE.CylinderGeometry(1.5, 1.5, 6, 32);
      const phase2Mesh1 = new THREE.Mesh(cylGeo, blueMat);
      phase2Mesh1.position.set(10, -2, -15);
      masterGroup.add(phase2Mesh1);

      const tetraGeo = new THREE.TetrahedronGeometry(3);
      const phase2Mesh2 = new THREE.Mesh(tetraGeo, pinkMat);
      phase2Mesh2.position.set(20, 5, -15);
      masterGroup.add(phase2Mesh2);

      // Phase 3 Shapes (Projects)
      const knotGeo = new THREE.TorusKnotGeometry(2.5, 0.8, 100, 16);
      const phase3Mesh1 = new THREE.Mesh(knotGeo, pinkMat);
      phase3Mesh1.position.set(-10, 0, -10);
      masterGroup.add(phase3Mesh1);

      const smallOctaGeo = new THREE.OctahedronGeometry(3, 0);
      const phase3Mesh2 = new THREE.Mesh(smallOctaGeo, blueMat);
      phase3Mesh2.position.set(12, -5, -10);
      masterGroup.add(phase3Mesh2);

      // Space Dust
      const dustGeo = new THREE.BufferGeometry();
      const dustCount = 3000;
      const dustPos = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount * 3; i++) {
        dustPos[i] = (Math.random() - 0.5) * 150; 
      }
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
      const dustMat = new THREE.PointsMaterial({ color: 0xF61BA9, size: 0.5, transparent: true, opacity: 0.5 });
      const spaceDust = new THREE.Points(dustGeo, dustMat);
      masterGroup.add(spaceDust);

      const ambient = new THREE.AmbientLight(0xffffff, 0.5);
      const dirLight1 = new THREE.DirectionalLight(0xF61BA9, 3);
      dirLight1.position.set(10, 10, 10);
      const dirLight2 = new THREE.DirectionalLight(0x76B2F0, 3);
      dirLight2.position.set(-10, -10, -10);
      scene.add(ambient, dirLight1, dirLight2);

      camera.position.set(0, 0, 15);
      cameraRef.current = camera;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true, 
          onUpdate: (self) => {
            const p = self.progress;

            if (p < 0.25) setPhase(1);
            else if (p < 0.50) setPhase(2);
            else if (p < 0.75) setPhase(3);
            else setPhase(5);
          }
        }
      });

      scrollTriggerInstanceRef.current = tl.scrollTrigger;

      tl.to(camera.position, { z: 2, ease: "power2.inOut", duration: 2 }, 0);
      tl.to(introMat, { opacity: 0, duration: 1 }, 1);
      tl.call(() => { introMesh.visible = false; }, null, 2);
      tl.call(() => { introMesh.visible = true; }, null, 1.9);
      tl.to(constMat, { opacity: 1, duration: 1 }, 1.5);
      tl.to(camera.position, { x: 15, z: -5, ease: "power2.inOut", duration: 2.5 }, 2);
      tl.to(camera.rotation, { y: -Math.PI/6, ease: "power2.inOut", duration: 2.5 }, 2);
      tl.to(constMat, { opacity: 0, duration: 1 }, 4);
      tl.to(camera.position, { y: 20, x: 0, z: -10, ease: "power3.inOut", duration: 2 }, 5);
      tl.to(camera.rotation, { x: -Math.PI/2, y: 0, z: 0, ease: "power3.inOut", duration: 2 }, 5);
      tl.to(camera.position, { y: 2, z: -15, ease: "power3.inOut", duration: 2 }, 7); 
      tl.to(camera.rotation, { x: 0, ease: "power3.inOut", duration: 2 }, 7);
      tl.to(pinkMat, { opacity: 1, duration: 1 }, 9.5);
      tl.to(blueMat, { opacity: 1, duration: 1 }, 9.5);
      tl.to(camera.position, { x: 15, y: 5, z: -30, ease: "power1.inOut", duration: 2.5 }, 10);
      tl.to(camera.rotation, { y: Math.PI/4, x: -0.1, ease: "power1.inOut", duration: 2.5 }, 10);

      const clock = new THREE.Clock();
      let rafId;

      const animate = () => {
        const t = clock.getElapsedTime();
        introMat.uniforms.uTime.value = t;
        introMesh.rotation.x = t * 0.2;
        introMesh.rotation.y = t * 0.3;
        pulseLight.intensity = 5 + Math.sin(t * 3) * 2;
        constellation.rotation.y = t * 0.02;
        stars.rotation.y = t * 0.005;
        stars.rotation.x = t * 0.002;
        spaceDust.rotation.y = t * 0.01;
        spaceDust.rotation.x = t * 0.005;
        crystalMesh.rotation.y = t * 0.5;
        crystalMesh.rotation.x = t * 0.2;
        crystalMesh.position.y = Math.sin(t) * 1; 
        torusMesh.rotation.x = t * 0.3;
        torusMesh.rotation.y = t * 0.4;
        dodecaMesh.rotation.x = t * 0.2;
        dodecaMesh.rotation.z = t * 0.5; 
        
        phase2Mesh1.rotation.x = t * 0.3;
        phase2Mesh1.rotation.y = t * 0.2;
        phase2Mesh2.rotation.x = t * 0.4;
        phase2Mesh2.rotation.z = t * 0.3;
        
        phase3Mesh1.rotation.x = t * 0.5;
        phase3Mesh1.rotation.y = t * 0.2;
        phase3Mesh2.rotation.y = t * 0.3;
        phase3Mesh2.rotation.x = t * 0.1;

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(rafId);
        
        // Dispose geometries and materials
        starGeo.dispose();
        starMat.dispose();
        introGeo.dispose();
        introMat.dispose();
        constGeo.dispose();
        constMat.dispose();
        crystalGeo.dispose();
        pinkMat.dispose();
        blueMat.dispose();
        torusGeo.dispose();
        dodecaGeo.dispose();
        cylGeo.dispose();
        tetraGeo.dispose();
        knotGeo.dispose();
        smallOctaGeo.dispose();
        dustGeo.dispose();
        dustMat.dispose();

        renderer.dispose();
        scene.clear();
        // gsap.context() will automatically revert timelines/scrolltriggers created inside it.
      };
    }, containerRef); // Scope gsap context

    return () => ctx.revert(); // Clean up context on unmount
  }, []);

  return (
    <div style={{ background: '#050505', color: '#ffffff', margin: 0, padding: 0, overflowX: 'hidden' }}>
      <SEOHead />
      <PersonSchema />
      <WebSiteSchema />
      <BreadcrumbSchema items={[{ name: 'Home', url: SITE_URL }]} />
      <ProjectSchemas projects={projects} />
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <div ref={containerRef} style={{ height: '400vh', position: 'relative', width: '100%' }}></div>
      
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 10 }}>
        
        <canvas ref={canvasRef} aria-label="Interactive 3D WebGL background environment" role="img" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }} />

        <div style={{ opacity: selectedProject ? 0 : 1, transition: 'opacity 0.4s ease', pointerEvents: selectedProject ? 'none' : undefined }}>
          <HeroPortal phase={phase} />
          <SkillsSection phase={phase} />
          <ProjectsSection3D phase={phase} projects={projects} onProjectClick={handleV2ProjectClick} />
          <ContactSection3D phase={phase} />
        </div>

        {selectedProject && (
          <ProjectDetail3D project={selectedProject} onBack={handleV2ProjectBack} />
        )}

        {/* Navigation Dots -> Text */}
        <nav aria-label="Section navigation" className="fixed left-2 top-1/2 -translate-y-1/2 flex flex-col items-start gap-6 z-50 pointer-events-auto bg-transparent backdrop-blur-sm p-4 rounded-r-2xl border border-transparent hover:bg-white/5 transition-colors duration-300" style={{ opacity: selectedProject ? 0 : 1, transition: 'opacity 0.3s ease', pointerEvents: selectedProject ? 'none' : undefined }}>
          {[
            { pNum: 1, multiplier: 0, label: "Intro" },
            { pNum: 2, multiplier: 1, label: "Skills" },
            { pNum: 3, multiplier: 2, label: "Projects" },
            { pNum: 5, multiplier: 3, label: "Contact" }
          ].map((item) => (
            <button 
              key={item.pNum} 
              onClick={() => scrollToSection(window.innerHeight * item.multiplier)}
              className={`bg-transparent border-none text-left transition-all duration-300 font-mono tracking-widest uppercase cursor-pointer ${
                phase === item.pNum 
                  ? 'text-white text-lg font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-110' 
                  : 'text-gray-500 text-sm hover:text-gray-300 hover:scale-105'
              }`}
              title={item.label}
              aria-label={`Go to section ${item.label}`}
              aria-current={phase === item.pNum ? 'true' : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>
        
      </div>
    </div>
  );
}
