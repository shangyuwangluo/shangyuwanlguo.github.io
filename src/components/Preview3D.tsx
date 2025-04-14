import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Preview3DProps = {
  design: {
    shape: string;
    dimensions: { width: number; height: number };
  };
};

export const Preview3D = ({ design }: Preview3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 
      mountRef.current.offsetWidth / mountRef.current.offsetHeight, 
      0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(
      design.dimensions.width / 10, 
      design.dimensions.height / 10
    );
    const material = new THREE.MeshBasicMaterial({ color: 0x009688, wireframe: true });
    const kite = new THREE.Mesh(geometry, material);
    scene.add(kite);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      kite.rotation.x += 0.01;
      kite.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [design]);

  return <div ref={mountRef} style={{ width: '100%', height: '400px' }} />;
};