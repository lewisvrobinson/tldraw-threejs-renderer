export function OrbLight({ position, color = 'white', scale, rotation }) {
  return (
    <mesh position={position} scale={scale} rotation={rotation}>
      <pointLight color={color} intensity={10000} castShadow power={100000} />
      <sphereGeometry args={[8, 8, 8]} />
      <meshPhongMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        // opacity={0.8}
        // transparent
      />
    </mesh>
  );
}
