import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Skybox({ path }: { path: string }) {
  const { scene } = useThree();

  React.useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(path, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
    });
  }, [path, scene]);

  return null; // No need to render any mesh for the background
}

export function Scene({ imagesPath }: { imagesPath: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }} className='w-full h-full'>
      <Skybox path={imagesPath} />
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
}
