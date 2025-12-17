'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Plane } from '@react-three/drei';
import * as THREE from 'three';

// --- Advanced Rain Shader ---
// Based on "Heartfelt" by BigWIngs (shadertoy) adapted for React Three Fiber

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform sampler2D uTexture;
uniform float uRainIntensity;
varying vec2 vUv;

vec3 N13(float p) {
   vec3 p3 = fract(vec3(p) * vec3(.1031, .11369, .13787));
   p3 += dot(p3, p3.yzx + 19.19);
   return fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
}

vec4 N14(float t) {
	return fract(sin(t*vec4(123., 1024., 1456., 264.))*vec4(6547., 345., 8799., 1564.));
}

float N(float t) {
    return fract(sin(t*12345.564)*7658.76);
}

float Saw(float b, float t) {
	return smoothstep(0., b, t)*smoothstep(1., b, t);
}

vec2 DropLayer2(vec2 uv, float t) {
    vec2 UV = uv;
    
    uv.y += t*0.75;
    vec2 a = vec2(6., 3.);
    vec2 grid = a*2.;
    vec2 id = floor(uv*grid);
    
    float colShift = N(id.x); 
    uv.y += colShift;
    
    id = floor(uv*grid);
    vec3 n = N13(id.x*35.2+id.y*2376.1);
    vec2 st = fract(uv*grid)-vec2(.5, 0);
    
    float x = n.x-.5;
    
    float y = UV.y*20.;
    float wiggle = sin(y+sin(y));
    x += wiggle*(.5-abs(x))*(n.z-.5);
    x *= .7;
    float ti = fract(t+n.z);
    float y2 = (Saw(.85, ti)-.5)*.9+.5;
    vec2 p = vec2(x, y2);
    
    float d = length((st-p)*a.yx);
    
    float mainDrop = smoothstep(.4, .0, d);
    
    float r = sqrt(smoothstep(1., y2, st.y));
    float cd = abs(st.x-x);
    float trail = smoothstep(.23*r, .15*r*r, cd);
    float trailFront = smoothstep(-.02, .02, st.y-y2);
    trail *= trailFront*r*r;
    
    y = UV.y;
    float trail2 = smoothstep(.2*r, .0, cd);
    float droplet = max(mainDrop, trail);
    
    return vec2(droplet, trail);
}

void main() {
  vec2 uv = vUv;
  vec2 UV = vUv;
  
  // Slow down the rain for a more "cinematic" feel
  float t = uTime * 0.2; 
  
  float rainAmount = uRainIntensity;
  
  if (rainAmount > 0.0) {
      vec2 drop = DropLayer2(uv, t);
      vec2 drop2 = DropLayer2(uv*1.85, t); // Layer 2 for depth
      
      float drops = drop.x + drop2.x;
      
      // Distortion - Greatly reduced for realism (was 0.05)
      vec2 normal = vec2(drop.x, drop2.x); 
      vec2 distortion = normal * 0.005; 
      
      uv += distortion;
      
      // Vignette / Glass tint
      vec4 col = texture2D(uTexture, uv);
      
      // Subtle lighting adjustments
      // Darken slightly where drops are
      col.rgb -= drops * 0.02;
      
      // Add a subtle "glass" reflection/shine
      col.rgb += drops * 0.01;
      
      // Slight blue tint for the "cold London rain" feel
      col.rgb = mix(col.rgb, vec3(0.4, 0.45, 0.5), drops * 0.1);
      
      gl_FragColor = col;
  } else {
      gl_FragColor = texture2D(uTexture, uv);
  }
}
`;

// --- Component ---

const RainScene = ({ image, intensity = 0.5 }: { image: string, intensity?: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(image);
    const { viewport } = useThree();

    // Uniforms
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uTexture: { value: texture },
            uRainIntensity: { value: intensity }
        }),
        [texture, intensity]
    );

    useFrame((state) => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTexture.value = texture;
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uRainIntensity.value = intensity;
        }
    });

    return (
        <Plane args={[viewport.width, viewport.height]} ref={meshRef}>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </Plane>
    );
};

export default function LivingWindow({ image, weather = 'clear' }: { image: string, weather?: string }) {
    // Only show rain effect if weather is 'rain'
    const intensity = weather === 'rain' ? 1.0 : 0.0;

    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <React.Suspense fallback={null}>
                    <RainScene image={image} intensity={intensity} />
                </React.Suspense>
            </Canvas>
        </div>
    );
}
