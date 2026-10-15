'use client';

import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';

const RoseSceneLazy = lazy(() =>
  import('./rose-scene').then((mod) => ({
    default: () => <mod.RoseScene />,
  }))
);

export function HeroThreeCanvas(): React.JSX.Element {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.3, 3.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <RoseSceneLazy />
        </Suspense>
      </Canvas>
    </div>
  );
}
