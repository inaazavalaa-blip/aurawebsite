"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { DoubleSide, Object3D, type InstancedMesh } from "three";

type Hojuela = {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  caida: number;
  giro: number;
  escala: number;
  fase: number;
};

const azar = (min: number, max: number) => min + Math.random() * (max - min);

function Hojuelas({ cantidad, quieto }: { cantidad: number; quieto: boolean }) {
  const malla = useRef<InstancedMesh>(null);
  const datos = useRef<Hojuela[]>([]);
  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    datos.current = Array.from({ length: cantidad }, () => ({
      x: azar(-7, 7),
      y: azar(-4.5, 4.5),
      z: azar(-3, 1.5),
      rx: azar(0, Math.PI),
      ry: azar(0, Math.PI),
      rz: azar(0, Math.PI),
      caida: azar(0.12, 0.35),
      giro: azar(0.3, 1),
      escala: azar(0.04, 0.11),
      fase: azar(0, Math.PI * 2),
    }));
  }, [cantidad]);

  useFrame((state, delta) => {
    const m = malla.current;
    if (!m) return;
    // Hasta que existan los datos, no se dibuja nada (evita un destello en el centro).
    m.count = datos.current.length;
    if (m.count === 0) return;
    const t = state.clock.elapsedTime;
    datos.current.forEach((d, i) => {
      if (!quieto) {
        d.y -= d.caida * delta;
        if (d.y < -4.8) d.y = 4.8;
        d.rx += d.giro * delta;
        d.ry += d.giro * 0.6 * delta;
      }
      dummy.position.set(d.x + Math.sin(t * 0.5 + d.fase) * 0.35, d.y, d.z);
      dummy.rotation.set(d.rx, d.ry, d.rz);
      dummy.scale.setScalar(d.escala);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={malla} args={[undefined, undefined, cantidad]}>
      {/* Pentágono irregular: parece una lámina de pan de oro */}
      <circleGeometry args={[1, 5]} />
      <meshStandardMaterial
        color="#f2d27c"
        emissive="#c99a3f"
        emissiveIntensity={0.6}
        metalness={0.7}
        roughness={0.32}
        side={DoubleSide}
      />
    </instancedMesh>
  );
}

/** Lluvia suave de pan de oro (referencia: El beso de Klimt). */
export default function PanDeOro({ cantidad = 90, className = "" }: { cantidad?: number; className?: string }) {
  const [quieto, setQuieto] = useState(false);

  useEffect(() => {
    setQuieto(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      {/* El lienzo es solo decorativo: no debe capturar clics de lo que hay debajo. */}
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 3, 4]} intensity={1.4} color="#fff3d6" />
        <Hojuelas cantidad={cantidad} quieto={quieto} />
        <Environment resolution={128}>
          <Lightformer intensity={2.4} position={[0, 4, -6]} scale={[10, 6, 1]} color="#fff1c9" />
          <Lightformer intensity={1.2} position={[-6, 0, 0]} rotation-y={Math.PI / 2} scale={[20, 3, 1]} color="#f3d33b" />
          <Lightformer intensity={0.8} position={[6, 0, 0]} rotation-y={-Math.PI / 2} scale={[20, 3, 1]} color="#ffffff" />
        </Environment>
      </Canvas>
    </div>
  );
}
