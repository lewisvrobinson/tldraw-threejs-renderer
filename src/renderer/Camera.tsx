import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import { useEditor } from 'tldraw';
import { OrthographicCamera, PerspectiveCamera } from '@react-three/drei';

export function Camera() {
  const editor = useEditor();
  const rLight = React.useRef(null);

  useFrame(({ camera, size }) => {
    // Get viewport bounds and zoom level from tldraw
    const bounds = editor.getViewportPageBounds();
    const zoom = editor.getZoomLevel();

    // Correct aspect ratio based on current canvas size
    const aspect = size.width / size.height;

    // Update camera's frustum to match tldraw's view, applying zoom correctly
    const cameraSize = (bounds.h * zoom) / 2;
    camera.left = -(cameraSize * aspect);
    camera.right = cameraSize * aspect;
    camera.top = cameraSize;
    camera.bottom = -cameraSize;

    // Set camera position based on tldraw's camera position, adjusting for zoom
    camera.position.set(bounds.midX, -bounds.midY, 100);
    // rLight.current.position.set(bounds.midX, -bounds.midY, 500);
    // rLight.current.intensity = 20000 * zoom;

    // Apply the zoom and update the projection matrix
    camera.zoom = zoom;
    camera.updateProjectionMatrix();
  });

  return (
    <>
      {/* <pointLight ref={rLight} position={[0, 0, 500]} intensity={10000} /> */}
      <OrthographicCamera
        makeDefault
        near={0.1}
        far={10000}
        position={[0, 0, 100]} // Initial position (will be updated in useFrame)
      />
    </>
  );
}

export function DebugCamera() {
  const editor = useEditor();
  const bounds = editor.getViewportPageBounds();
  const zoom = editor.getZoomLevel();
  return (
    <>
      <pointLight position={[bounds.midX, -bounds.midY, 500]} intensity={30000} />
      <PerspectiveCamera makeDefault position={[bounds.midX, -bounds.midY, 1000]} far={100000} zoom={zoom} />
    </>
  );
}
