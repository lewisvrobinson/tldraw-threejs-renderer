import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { getDefaultColorTheme, useEditor, useValue } from "tldraw";
import { Camera } from "./Camera";
import { Shapes } from "./Shapes";
import {
  Stats,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

/**
 * Renders the tldraw editor using React Three Fiber.
 * Based on the custom rendered example
 * @see https://tldraw.dev/examples/custom-renderer
 */
export function CustomRenderer({ debug = false }) {
  const editor = useEditor();
  const isDarkMode = useValue(
    "is-dark-mode",
    () => editor.user.getIsDarkMode(),
    [editor],
  );
  const theme = useValue("theme", () => getDefaultColorTheme({ isDarkMode }), [
    isDarkMode,
  ]);

  React.useLayoutEffect(() => {
    // Hide the regular shapes layer using CSS.
    const script = document.createElement("style");
    if (!script) return;
    script.innerHTML = `.tl-shapes { opacity: 0.1; }`;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  });

  return (
    <Canvas shadows>
      <color attach="background" args={[theme.background]} />
      <fog attach="fog" args={[theme.background, 500, 5000]} />
      <ambientLight intensity={isDarkMode ? 0.08 : 0.8} />

      <group rotation={debug ? [-Math.PI / 2, 0, 0] : undefined}>
        <Shapes />

        <mesh position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[10000, 10000]} />
          <meshStandardMaterial color={theme.white.solid} />
        </mesh>
        {debug && <pointLight position={[0, 0, 500]} intensity={1000} />}
      </group>

      {debug ? (
        <>
          <PerspectiveCamera makeDefault position={[0, 1000, 0]} far={100000} />
          <OrbitControls makeDefault />
        </>
      ) : (
        <Camera />
      )}
      <Debug enabled={debug} />
    </Canvas>
  );
}

function BackPlane() {
  const editor = useEditor();
  const theme = getDefaultColorTheme({
    isDarkMode: editor.user.getIsDarkMode(),
  });

  const bounds = useValue("bounds", () => editor.getViewportPageBounds(), [
    editor,
  ]);

  if (!editor) return null;

  return (
    <mesh position={[1000, 1000, 0]} receiveShadow>
      <planeGeometry args={[bounds.maxX, bounds.maxY]} />
      <meshStandardMaterial color={theme.white.solid} />
    </mesh>
  );
}

function Debug({ enabled = false }) {
  const editor = useEditor();
  const isDarkMode = editor.user.getIsDarkMode();
  const theme = useValue("theme", () => getDefaultColorTheme({ isDarkMode }), [
    editor,
  ]);
  if (!enabled) return null;
  return (
    <>
      <Stats />
      <GizmoHelper alignment="bottom-left">
        <GizmoViewport
          axisColors={[theme.red.solid, theme.green.solid, theme.blue.solid]}
          labelColor={theme.solid}
        />
      </GizmoHelper>
    </>
  );
}
