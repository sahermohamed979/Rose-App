'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
// لو three عندك أقدم من r151 استخدم mergeBufferGeometries بدل mergeGeometries
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------
const BURST_SPEED = 0.7; // 1 = سرعة عادية، قللها لو عايز الضخ أبطأ

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function paint(
  geo: THREE.BufferGeometry,
  color: string
): THREE.BufferGeometry {
  const c = new THREE.Color(color);
  const n = geo.attributes.position.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    arr[i * 3] = c.r;
    arr[i * 3 + 1] = c.g;
    arr[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return geo;
}

const rand = (a = 0, b = 1) => a + Math.random() * (b - a);

// ---------------------------------------------------------------------------
// Geometries for the side bursts (built once)
// ---------------------------------------------------------------------------
function makeMiniFlower(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 6; i++) {
    const p = new THREE.SphereGeometry(0.06, 8, 6);
    p.scale(1, 0.35, 1.5);
    p.translate(0, 0, 0.075);
    p.rotateY((i / 6) * Math.PI * 2);
    parts.push(paint(p, '#ffffff'));
  }
  for (let i = 0; i < 5; i++) {
    const p = new THREE.SphereGeometry(0.045, 8, 6);
    p.scale(1, 0.4, 1.3);
    p.translate(0, 0.03, 0.04);
    p.rotateY((i / 5) * Math.PI * 2 + 0.3);
    parts.push(paint(p, '#ffe3ea'));
  }
  const center = new THREE.SphereGeometry(0.03, 8, 6);
  center.translate(0, 0.05, 0);
  parts.push(paint(center, '#ffd36b'));
  return mergeGeometries(parts)!;
}

function makeMiniGift(base: string): THREE.BufferGeometry {
  const box = paint(new THREE.BoxGeometry(0.2, 0.16, 0.2), base);
  const lid = paint(new THREE.BoxGeometry(0.22, 0.05, 0.22), base);
  lid.translate(0, 0.105, 0);
  const r1 = paint(
    new THREE.BoxGeometry(0.05, 0.17, 0.205),
    '#f3c97a'
  );
  const r2 = paint(
    new THREE.BoxGeometry(0.205, 0.17, 0.05),
    '#f3c97a'
  );
  const r3 = paint(
    new THREE.BoxGeometry(0.05, 0.055, 0.225),
    '#f3c97a'
  );
  r3.translate(0, 0.105, 0);
  const r4 = paint(
    new THREE.BoxGeometry(0.225, 0.055, 0.05),
    '#f3c97a'
  );
  r4.translate(0, 0.105, 0);
  const bow1 = paint(
    new THREE.TorusGeometry(0.04, 0.012, 6, 12),
    '#f3c97a'
  );
  bow1.translate(-0.04, 0.16, 0);
  const bow2 = paint(
    new THREE.TorusGeometry(0.04, 0.012, 6, 12),
    '#f3c97a'
  );
  bow2.translate(0.04, 0.16, 0);
  return mergeGeometries([box, lid, r1, r2, r3, r4, bow1, bow2])!;
}

function makeHeart(): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.moveTo(0, 0.25);
  s.bezierCurveTo(0, 0.25, -0.05, 0, -0.25, 0);
  s.bezierCurveTo(-0.55, 0, -0.55, 0.35, -0.55, 0.35);
  s.bezierCurveTo(-0.55, 0.55, -0.35, 0.77, 0, 0.95);
  s.bezierCurveTo(0.35, 0.77, 0.55, 0.55, 0.55, 0.35);
  s.bezierCurveTo(0.55, 0.35, 0.55, 0, 0.25, 0);
  s.bezierCurveTo(0.1, 0, 0, 0.25, 0, 0.25);
  const g = new THREE.ExtrudeGeometry(s, {
    depth: 0.18,
    bevelEnabled: true,
    bevelSize: 0.04,
    bevelThickness: 0.05,
    bevelSegments: 2,
  });
  g.center();
  g.rotateZ(Math.PI);
  return g;
}

function makePetal(): THREE.BufferGeometry {
  const g = new THREE.SphereGeometry(0.07, 8, 6);
  g.scale(1, 0.16, 0.7);
  return g;
}

// ---------------------------------------------------------------------------
// Generic side-burst particle system (one InstancedMesh = one draw call)
// ---------------------------------------------------------------------------
interface BurstProps {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  count: number;
  size: number;
  edge: number;
  gravity?: number;
  power?: number;
  spin?: number;
  palette?: string[];
}

interface Particle {
  side: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  age: number;
  max: number;
  rx: number;
  ry: number;
  rz: number;
  sx: number;
  sy: number;
  sz: number;
  s: number;
}

function Burst({
  geometry,
  material,
  count,
  size,
  edge,
  gravity = 2.4,
  power = 1,
  spin = 3,
  palette,
}: BurstProps): React.JSX.Element {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const k = Math.min(1.3, Math.max(0.6, edge / 1.4));

  const reset = (p: Particle, i: number, initial = false) => {
    p.side = i % 2 === 0 ? -1 : 1;
    p.x = p.side * edge;
    p.y = -0.75 + rand(0, 0.5);
    p.z = rand(-0.5, 0.5);
    p.vx = -p.side * edge * rand(0.55, 1.1) * power;
    p.vy = rand(1.7, 2.7) * power * Math.min(1, k + 0.15);
    p.vz = rand(-0.5, 0.5);
    p.max = rand(2.2, 3.6);
    p.age = initial ? -rand(0, p.max) : 0;
    p.rx = rand(0, 6);
    p.ry = rand(0, 6);
    p.rz = rand(0, 6);
    p.sx = rand(-spin, spin);
    p.sy = rand(-spin, spin);
    p.sz = rand(-spin, spin);
    p.s = size * k * rand(0.7, 1.3);
  };

  const parts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const p = {} as Particle;
      reset(p, i, true);
      return p;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, edge]);

  useEffect(() => {
    const m = ref.current;
    if (!m || !palette) {
      return;
    }
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      c.set(palette[i % palette.length]);
      m.setColorAt(i, c);
    }
    if (m.instanceColor) {
      m.instanceColor.needsUpdate = true;
    }
  }, [palette, count]);

  useFrame((_, delta) => {
    const m = ref.current;
    if (!m) {
      return;
    }
    const dt = Math.min(delta, 0.05) * BURST_SPEED;
    parts.forEach((p, i) => {
      p.age += dt;
      if (p.age < 0) {
        dummy.scale.setScalar(0);
      } else {
        if (p.age > p.max) {
          reset(p, i);
        }
        p.vy -= gravity * dt;
        p.vx *= 1 - 0.25 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.z += p.vz * dt;
        p.rx += p.sx * dt;
        p.ry += p.sy * dt;
        p.rz += p.sz * dt;

        const t = p.age / p.max;
        const pop = Math.min(1, p.age * 5);
        const fade = t > 0.8 ? 1 - (t - 0.8) / 0.2 : 1;
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(p.rx, p.ry, p.rz);
        dummy.scale.setScalar(p.s * pop * fade);
      }
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[geometry, material, count]}
      frustumCulled={false}
    />
  );
}

// ---------------------------------------------------------------------------
// All side bursts
// ---------------------------------------------------------------------------
function SideBursts({ edge }: { edge: number }): React.JSX.Element {
  const g = useMemo(
    () => ({
      flower: makeMiniFlower(),
      giftRed: makeMiniGift('#b3153f'),
      giftPink: makeMiniGift('#ff8fb0'),
      heart: makeHeart(),
      petal: makePetal(),
      spark: new THREE.OctahedronGeometry(0.045, 0),
    }),
    []
  );

  const m = useMemo(
    () => ({
      flower: new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.55,
        side: THREE.DoubleSide,
      }),
      gift: new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.3,
        metalness: 0.25,
      }),
      heart: new THREE.MeshPhysicalMaterial({
        color: '#ff4d79',
        roughness: 0.25,
        clearcoat: 1,
        emissive: new THREE.Color('#5a0320'),
        emissiveIntensity: 0.4,
      }),
      petal: new THREE.MeshStandardMaterial({
        roughness: 0.5,
        side: THREE.DoubleSide,
      }),
      spark: new THREE.MeshStandardMaterial({
        color: '#ffe08a',
        emissive: new THREE.Color('#ffb300'),
        emissiveIntensity: 1.2,
        metalness: 0.8,
        roughness: 0.2,
      }),
    }),
    []
  );

  const flowerColors = [
    '#e0305a',
    '#ff6b8f',
    '#ffffff',
    '#ffb3c6',
    '#c4153f',
    '#ffd0a8',
  ];
  const petalColors = ['#e0305a', '#ff8fa8', '#c4153f', '#ffc2d1'];
  const heartColors = ['#ff4d79', '#ff7a9c', '#e0305a'];

  return (
    <>
      <Burst
        geometry={g.flower}
        material={m.flower}
        count={30}
        size={1.1}
        edge={edge}
        palette={flowerColors}
      />
      <Burst
        geometry={g.petal}
        material={m.petal}
        count={70}
        size={1}
        edge={edge}
        spin={5}
        palette={petalColors}
        gravity={1.6}
      />
      <Burst
        geometry={g.heart}
        material={m.heart}
        count={16}
        size={0.16}
        edge={edge}
        palette={heartColors}
      />
      <Burst
        geometry={g.giftRed}
        material={m.gift}
        count={6}
        size={1.1}
        edge={edge}
        power={0.9}
      />
      <Burst
        geometry={g.giftPink}
        material={m.gift}
        count={6}
        size={1.1}
        edge={edge}
        power={0.9}
      />
      <Burst
        geometry={g.spark}
        material={m.spark}
        count={50}
        size={1}
        edge={edge}
        power={1.3}
        gravity={1.2}
        spin={6}
      />
    </>
  );
}

// Pulsing pink glow at each emitter
function EmitterGlow({ edge }: { edge: number }): React.JSX.Element {
  const l1 = useRef<THREE.PointLight>(null);
  const l2 = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    const v = 1.4 + Math.sin(clock.elapsedTime * 3) * 0.6;
    if (l1.current) {
      l1.current.intensity = v;
    }
    if (l2.current) {
      l2.current.intensity = v;
    }
  });
  return (
    <>
      <pointLight
        ref={l1}
        position={[-edge, -0.5, 0.8]}
        color="#ff3d7a"
        distance={3}
      />
      <pointLight
        ref={l2}
        position={[edge, -0.5, 0.8]}
        color="#ff3d7a"
        distance={3}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Rose: nested scalloped cups (closed bud in the middle, open outside)
// ---------------------------------------------------------------------------
function makeRoseLayer(
  r: number,
  h: number,
  open: number,
  lobes: number
): THREE.BufferGeometry {
  const curve = new THREE.SplineCurve([
    new THREE.Vector2(0.001, 0),
    new THREE.Vector2(r * 0.65, h * 0.12),
    new THREE.Vector2(r, h * 0.5),
    new THREE.Vector2(r * (1 + open * 0.5), h * 0.82),
    new THREE.Vector2(r * (1 + open), h),
  ]);
  const geo = new THREE.LatheGeometry(curve.getPoints(12), 40);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const rim = Math.max(0, (y - h * 0.55) / (h * 0.45));
    if (rim > 0) {
      const a = Math.atan2(z, x);
      const s = 1 + rim * 0.14 * Math.sin(lobes * a);
      pos.setXYZ(
        i,
        x * s,
        y + rim * h * 0.12 * Math.sin(lobes * a + 1.2),
        z * s
      );
    }
  }
  geo.computeVertexNormals();
  return geo;
}

const ROSE_LAYERS = [
  { r: 0.06, h: 0.26, open: -0.35, lobes: 3 },
  { r: 0.1, h: 0.25, open: -0.2, lobes: 3 },
  { r: 0.15, h: 0.23, open: 0.0, lobes: 4 },
  { r: 0.21, h: 0.21, open: 0.2, lobes: 5 },
  { r: 0.28, h: 0.19, open: 0.4, lobes: 5 },
  { r: 0.35, h: 0.17, open: 0.65, lobes: 6 },
];

function Rose({
  color = '#c4153f',
  stem = 1.0,
}: {
  color?: string;
  stem?: number;
}): React.JSX.Element {
  const ref = useRef<THREE.Group>(null);

  const layers = useMemo(() => {
    const outer = new THREE.Color(color);
    const inner = new THREE.Color(color).multiplyScalar(0.55);
    return ROSE_LAYERS.map((l, i) => ({
      geo: makeRoseLayer(l.r, l.h, l.open, l.lobes),
      mat: new THREE.MeshStandardMaterial({
        color: inner
          .clone()
          .lerp(outer, i / (ROSE_LAYERS.length - 1)),
        roughness: 0.45,
        side: THREE.DoubleSide,
      }),
      y: (ROSE_LAYERS.length - 1 - i) * 0.02,
      rot: i * 0.9,
    }));
  }, [color]);

  const green = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1f6b3a',
        roughness: 0.5,
        side: THREE.DoubleSide,
      }),
    []
  );

  const leafGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.quadraticCurveTo(0.12, 0.1, 0, 0.3);
    s.quadraticCurveTo(-0.12, 0.1, 0, 0);
    return new THREE.ShapeGeometry(s);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={ref}>
      <group position={[0, stem * 0.55, 0]}>
        {layers.map((l, i) => (
          <mesh
            key={i}
            geometry={l.geo}
            material={l.mat}
            position={[0, l.y, 0]}
            rotation={[0, l.rot, 0]}
          />
        ))}
        {/* calyx */}
        <mesh
          material={green}
          position={[0, -0.04, 0]}
          rotation={[Math.PI, 0, 0]}
        >
          <coneGeometry args={[0.16, 0.18, 10]} />
        </mesh>
      </group>

      <mesh material={green}>
        <cylinderGeometry args={[0.022, 0.028, stem, 8]} />
      </mesh>
      <mesh
        geometry={leafGeo}
        material={green}
        position={[0.02, 0.05, 0]}
        rotation={[0.2, 0.6, -1.0]}
        scale={1.3}
      />
      <mesh
        geometry={leafGeo}
        material={green}
        position={[-0.02, -0.1, 0]}
        rotation={[0.2, 3.6, 1.0]}
        scale={1.1}
      />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Gift box with ribbon + bow
// ---------------------------------------------------------------------------
function GiftBox(): React.JSX.Element {
  const boxMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#7a0c2a',
        roughness: 0.35,
        clearcoat: 0.6,
        clearcoatRoughness: 0.25,
      }),
    []
  );
  const lidMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#9c1237',
        roughness: 0.3,
        clearcoat: 0.7,
      }),
    []
  );
  const gold = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f3c97a',
        roughness: 0.2,
        metalness: 0.9,
      }),
    []
  );

  return (
    <group>
      <mesh material={boxMat}>
        <boxGeometry args={[1.2, 0.8, 1.2]} />
      </mesh>
      <mesh material={lidMat} position={[0, 0.48, 0]}>
        <boxGeometry args={[1.3, 0.22, 1.3]} />
      </mesh>
      <mesh material={gold}>
        <boxGeometry args={[0.2, 0.81, 1.21]} />
      </mesh>
      <mesh material={gold}>
        <boxGeometry args={[1.21, 0.81, 0.2]} />
      </mesh>
      <mesh material={gold} position={[0, 0.48, 0]}>
        <boxGeometry args={[0.2, 0.23, 1.31]} />
      </mesh>
      <mesh material={gold} position={[0, 0.48, 0]}>
        <boxGeometry args={[1.31, 0.23, 0.2]} />
      </mesh>

      {/* Bow on the front edge so the bouquet can sit on top */}
      <group position={[0, 0.5, 0.68]}>
        <mesh
          material={gold}
          position={[-0.17, 0.08, 0]}
          rotation={[0, 0, Math.PI / 2.6]}
          scale={[1, 1.3, 0.6]}
        >
          <torusGeometry args={[0.14, 0.04, 12, 24]} />
        </mesh>
        <mesh
          material={gold}
          position={[0.17, 0.08, 0]}
          rotation={[0, 0, -Math.PI / 2.6]}
          scale={[1, 1.3, 0.6]}
        >
          <torusGeometry args={[0.14, 0.04, 12, 24]} />
        </mesh>
        <mesh material={gold} position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.06, 14, 12]} />
        </mesh>
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Center composition: gift box + bouquet of 3 roses
// ---------------------------------------------------------------------------
function CenterPiece({
  mobile,
}: {
  mobile: boolean;
}): React.JSX.Element {
  const rootRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!rootRef.current) {
      return;
    }
    rootRef.current.rotation.x = THREE.MathUtils.damp(
      rootRef.current.rotation.x,
      0.22 - state.pointer.y * 0.15,
      3,
      delta
    );
    rootRef.current.rotation.y = THREE.MathUtils.damp(
      rootRef.current.rotation.y,
      state.pointer.x * 0.4,
      3,
      delta
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.05} floatIntensity={0.25}>
      <group
        ref={rootRef}
        position={mobile ? [0, -0.3, 0] : [0, -0.35, 0]}
        scale={mobile ? 0.62 : 0.85}
        rotation={[0.22, 0, 0]}
      >
        <GiftBox />
        <group position={[0, 0.6, 0]}>
          <group position={[0, 0, 0]}>
            <Rose color="#c4153f" stem={1.1} />
          </group>
          <group position={[-0.32, 0, 0.05]} rotation={[0, 0, 0.35]}>
            <Rose color="#e0305a" stem={0.8} />
          </group>
          <group position={[0.32, 0, 0.05]} rotation={[0, 0, -0.35]}>
            <Rose color="#ff6b8f" stem={0.85} />
          </group>
        </group>
      </group>
    </Float>
  );
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export function RoseScene(): React.JSX.Element {
  const { viewport } = useThree();
  const mobile = viewport.width < 3.2;
  const edge = viewport.width * 0.5 * 0.94;

  return (
    <>
      <ambientLight intensity={0.75} color="#ffe8ed" />
      <directionalLight
        position={[4, 5, 4]}
        intensity={2.2}
        color="#fff4eb"
      />
      <directionalLight
        position={[-4, -2, -3]}
        intensity={1.4}
        color="#ff4d79"
      />
      <pointLight
        position={[0, 1, 2]}
        intensity={1.0}
        color="#ff2a6d"
      />

      <CenterPiece mobile={mobile} />
      <SideBursts edge={edge} />
      <EmitterGlow edge={edge} />
    </>
  );
}
