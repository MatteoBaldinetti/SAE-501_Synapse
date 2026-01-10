/**
 * ThreeDViewer.jsx - Visualiseur 3D pour les modèles de formation
 * 
 * Permet de visualiser des modèles 3D associés aux formations :
 * - Chargement de fichiers 3D (GLB, GLTF, etc.)
 * - Contrôles de rotation, zoom, pan
 * - Annotations sur le modèle
 * 
 * Peut être utilisé :
 * - En page standalone (route /3d-viewer)
 * - Intégré dans CoursDetail.jsx
 * 
 * Route : /3d-viewer
 * Utilisé par : App.jsx, CoursDetail.jsx (optionnel)
 * Dépendances : Three.js ou bibliothèque 3D similaire
 */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { useLocation } from 'react-router-dom';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

function ThreeDViewer() {
  const location = useLocation();
  const { modelUrl } = location.state || {};

  if (!modelUrl) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Aucun modèle à afficher.</p>;

  return (
    <div style={{ width: '100vw', height: '90vh' }}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 60 }}
        gl={{ antialias: true }}
        style={{ background: '#9d9c9cff' }} 
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        <Suspense
          fallback={
            <Html center>
              Chargement...
            </Html>
          }
        >
          <Model url={modelUrl} />
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default ThreeDViewer;