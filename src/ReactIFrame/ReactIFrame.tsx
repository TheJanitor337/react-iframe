import * as React from 'react';
import { useEffect, useRef } from 'react';

export interface ReactIFrameProps extends React.ComponentPropsWithoutRef<"iframe"> {
  src: string;
  onLoad?: () => void;
}

const ReactIFrame = React.forwardRef<HTMLIFrameElement, ReactIFrameProps>(({ src, onLoad, ...restProps }, ref) => {
  const internalFrameRef: React.LegacyRef<HTMLIFrameElement> = useRef(null);

  React.useImperativeHandle<HTMLIFrameElement | null, HTMLIFrameElement | null>(
    ref,
    () => internalFrameRef.current
  );

  useEffect(() => {
    if (internalFrameRef?.current) {
      internalFrameRef.current.src = src;
    }
  }, []);

  return <iframe ref={internalFrameRef} onLoad={onLoad} {...restProps} />;
});

export default ReactIFrame;
