import {
  useValue,
  useEditor,
  getDefaultColorTheme,
  type TLShape,
  type TLDefaultColorTheme,
} from 'tldraw';
import { OrbLight } from './Lights';

export function Shapes() {
  const editor = useEditor();
  const shapes = useValue(
    'rendered shapes',
    () => {
      if (!editor) throw new Error('No editor');
      return editor.getRenderingShapes();
    },
    [editor]
  );
  const theme: TLDefaultColorTheme = useValue(
    'theme',
    () => getDefaultColorTheme({ isDarkMode: editor.user.getIsDarkMode() }),
    [editor]
  );
  const currentPageId = editor.getCurrentPageId();

  return (
    <>
      {shapes.map(({ shape }) => {
        if (shape.parentId !== currentPageId) return null;

        const geo = editor.getShapeGeometry(shape);
        const bounds = editor.getShapePageBounds(shape);
        const depth = Math.max(shape.opacity, 0.1);
        const color = theme[shape.props.color];
        const transform = editor.getShapePageTransform(shape).decompose();
        const rotation = [0, 0, -transform.rotation];
        const scale = [transform.scaleX, transform.scaleY, 1];

        if (shape.props.geo === 'ellipse') {
          const position = [bounds?.midX, -bounds?.midY, depth * 50];
          console.log(geo);
          return (
            <OrbLight
              key={shape.id}
              position={position}
              scale={scale}
              rotation={rotation}
              color={color.solid}
            />
          );
        }

        const position = [bounds?.midX, -bounds?.midY, depth * 50];
        return (
          <mesh
            key={shape.id}
            position={position}
            scale={scale}
            rotation={rotation}
            castShadow
            receiveShadow
          >
            <boxGeometry
              args={[geo.bounds.width, geo.bounds.height, depth * 100]}
            />
            <meshStandardMaterial color={theme.white.semi} />
          </mesh>
        );
      })}
    </>
  );
}
