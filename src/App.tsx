import * as React from 'react';
import { DefaultBackground, DefaultCanvas, Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import { CustomRenderer } from './renderer';

export default function CustomRendererExample() {
  const [debug, setDebug] = React.useState(false);

  // React.useLayoutEffect(() => {
  //   // Hide the regular shapes layer using CSS.
  //   const script = document.createElement('style');
  //   if (!script) return;
  //   script.innerHTML = `.tl-shapes { display: none; }`;
  //   document.body.appendChild(script);
  //   return () => {
  //     script.remove();
  //   };
  // });

  const components = {
    // We're replacing the Background component with our custom renderer
    Background: debug ? DefaultBackground : CustomRenderer,
    // Even though we're hiding the shapes, we'll still do a bunch of work
    // in react to figure out which shapes to create. In reality, you might
    // want to set the Canvas component to null and render it all yourself.
    Canvas: DefaultCanvas,
  };

  return (
    <div className="tldraw__editor" style={{ position: 'fixed', inset: 0 }}>
      <Tldraw persistenceKey="example" components={components}>
        {debug && <CustomRenderer debug={debug} />}
      </Tldraw>
      <button
        onClick={() => setDebug((d) => !d)}
        style={{
          zIndex: 1000,
          position: 'fixed',
          bottom: '0.5rem',
          right: '0.5rem',
        }}
      >
        {debug ? 'Canvas' : 'Debug'}
      </button>
    </div>
  );
}
