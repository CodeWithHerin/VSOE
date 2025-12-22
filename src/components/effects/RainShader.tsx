'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RainParticles = ({ count = 2000 }) => {
    const mesh = useRef<THREE.Points>(null!);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 30;
            const y = (Math.random() - 0.5) * 30;
            const z = (Math.random() - 0.5) * 10;
            const velocity = Math.random() * 0.3 + 0.2;
            temp.push({ x, y, z, velocity });
        }
        return temp;
    }, [count]);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        particles.forEach((p, i) => {
            pos[i * 3] = p.x;
            pos[i * 3 + 1] = p.y;
            pos[i * 3 + 2] = p.z;
        });
        return pos;
    }, [particles, count]);

    useFrame(() => {
        if (!mesh.current) return;
        const positions = mesh.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            let y = positions[i * 3 + 1];
            y -= particles[i].velocity;

            if (y < -15) {
                y = 15;
            }

            positions[i * 3 + 1] = y;
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position" // @ts-ignore
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#aaddff"
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default function RainShader() {
    return (
        <div className="absolute inset-0 pointer-events-none z-10 mix-blend-screen">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
                <RainParticles />
            </Canvas>
        </div>
    );
}
