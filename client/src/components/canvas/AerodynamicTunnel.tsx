import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AerodynamicTunnel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported, falling back to clean CSS backdrop');
      return;
    }

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.008);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 65);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Aerodynamic Streamline Particles
    const PARTICLE_COUNT = 2400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);

    const yellowColor = new THREE.Color(0xccff00);
    const purpleColor = new THREE.Color(0x9945ff);
    const whiteColor = new THREE.Color(0xf3f4f6);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.2) * 28;
      const z = (Math.random() - 0.5) * 140;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Speed along tunnel
      speeds[i] = 0.6 + Math.random() * 1.4;

      // Color distribution: mostly white/silver with glowing yellow and purple accents
      const rand = Math.random();
      let col = whiteColor;
      if (rand > 0.75) {
        col = yellowColor;
      } else if (rand > 0.5) {
        col = purpleColor;
      }

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circular glowing particle texture
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 32;
    canvasTexture.height = 32;
    const ctx = canvasTexture.getContext('2d')!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(204,255,0,0.8)');
    gradient.addColorStop(0.8, 'rgba(153,69,255,0.2)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(canvasTexture);

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // 3. Formula 1 Car Wireframe Chassis
    const carGroup = new THREE.Group();

    // Nosecone & Main monocoque body
    const bodyCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.4, 26),   // Front nose tip
      new THREE.Vector3(0, 1.2, 16),   // Front bulkhead
      new THREE.Vector3(0, 3.2, 4),    // Cockpit opening
      new THREE.Vector3(0, 4.0, -3),   // Halo & airbox
      new THREE.Vector3(0, 3.0, -14),  // Engine shark fin
      new THREE.Vector3(0, 2.5, -24),  // Rear wing mount
    ]);
    const bodyGeo = new THREE.TubeGeometry(bodyCurve, 32, 1.5, 8, false);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xccff00,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, wireMat);
    carGroup.add(bodyMesh);

    // Front Wing
    const fwGeo = new THREE.BoxGeometry(22, 0.4, 4);
    const fwMat = new THREE.MeshBasicMaterial({ color: 0x9945ff, wireframe: true, transparent: true, opacity: 0.35 });
    const fwMesh = new THREE.Mesh(fwGeo, fwMat);
    fwMesh.position.set(0, -0.2, 22);
    carGroup.add(fwMesh);

    // Rear Wing & DRS Flap
    const rwGeo = new THREE.BoxGeometry(16, 3.2, 2.5);
    const rwMesh = new THREE.Mesh(rwGeo, fwMat);
    rwMesh.position.set(0, 4.2, -22);
    carGroup.add(rwMesh);

    // Sidepods (Left & Right aero underfloor)
    const spGeo = new THREE.BoxGeometry(5.5, 1.8, 14);
    const spMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.15 });

    const leftSp = new THREE.Mesh(spGeo, spMat);
    leftSp.position.set(-6.5, 0.6, 1);
    carGroup.add(leftSp);

    const rightSp = new THREE.Mesh(spGeo, spMat);
    rightSp.position.set(6.5, 0.6, 1);
    carGroup.add(rightSp);

    // Wheels (4 wide racing slicks)
    const wheelGeo = new THREE.CylinderGeometry(2.4, 2.4, 2.8, 16);
    const wheelMat = new THREE.MeshBasicMaterial({ color: 0x333644, wireframe: true, transparent: true, opacity: 0.3 });

    // Front Left & Right
    const flWheel = new THREE.Mesh(wheelGeo, wheelMat);
    flWheel.rotation.z = Math.PI / 2;
    flWheel.position.set(-10, 0, 16);
    carGroup.add(flWheel);

    const frWheel = new THREE.Mesh(wheelGeo, wheelMat);
    frWheel.rotation.z = Math.PI / 2;
    frWheel.position.set(10, 0, 16);
    carGroup.add(frWheel);

    // Rear Left & Right
    const rlWheel = new THREE.Mesh(wheelGeo, wheelMat);
    rlWheel.rotation.z = Math.PI / 2;
    rlWheel.position.set(-10.5, 0, -16);
    carGroup.add(rlWheel);

    const rrWheel = new THREE.Mesh(wheelGeo, wheelMat);
    rrWheel.rotation.z = Math.PI / 2;
    rrWheel.position.set(10.5, 0, -16);
    carGroup.add(rrWheel);

    scene.add(carGroup);

    // 4. Mouse interaction & aerodynamic displacement
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 15;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = normX;
      mouseY = normY;
      targetCameraX = normX * 18;
      targetCameraY = 15 + normY * 10;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 5. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 1, 0);

      // Car gentle aerodynamic pitch & yaw
      carGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.08 + mouseX * 0.12;
      carGroup.rotation.x = Math.sin(elapsedTime * 0.8) * 0.03 + mouseY * 0.06;
      carGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.3;

      // Update streamline particles
      const pos = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        // Stream particles travel along Z axis into camera
        pos[idx + 2] -= speeds[i] * 1.8;

        // Aerodynamic deflection around the car chassis
        const carDistZ = pos[idx + 2];
        const carDistX = pos[idx];
        const carDistY = pos[idx + 1];

        if (Math.abs(carDistZ) < 30 && Math.abs(carDistX) < 14 && Math.abs(carDistY) < 6) {
          // Push particles outwards aerodynamically
          pos[idx] += (carDistX > 0 ? 0.4 : -0.4);
          pos[idx + 1] += 0.2;
        }

        // Mouse displacement turbulence
        const distToMouseX = pos[idx] - mouseX * 30;
        if (Math.abs(distToMouseX) < 12) {
          pos[idx] += (distToMouseX > 0 ? 0.35 : -0.35);
        }

        // Reset particle if it passes camera
        if (pos[idx + 2] < -70) {
          pos[idx + 2] = 70;
          pos[idx] = originalPositions[idx] + (Math.random() - 0.5) * 6;
          pos[idx + 1] = originalPositions[idx + 1] + (Math.random() - 0.5) * 4;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      bodyGeo.dispose();
      wireMat.dispose();
      fwGeo.dispose();
      fwMat.dispose();
      rwGeo.dispose();
      spGeo.dispose();
      spMat.dispose();
      wheelGeo.dispose();
      wheelMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0.85 }}
    />
  );
};
