import { useLayoutEffect, useState, useEffect } from 'react';
import type { DefinedArea, UseMouseCloseByProps } from './types';
import { getNewDefinedArea } from './lib';

export const useMouseCloseBy = (
  mouseCallbackHandler: () => void,
  { ref, boundaryArea, fireOnlyOnce = false }: UseMouseCloseByProps,
) => {
  const [definedArea, setDefinedArea] = useState<DefinedArea>(null);
  const [isHandlerExecuted, setIsHandlerExecuted] = useState<boolean>(false);

  useLayoutEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    setDefinedArea(getNewDefinedArea(rect, boundaryArea));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  useEffect(() => {
    if (definedArea) {
      const handleMouseMove = (event: MouseEvent) => {
        const x = event.clientX;
        const y = event.clientY;

        if (x >= definedArea.startX && x <= definedArea.endX && y >= definedArea.startY && y <= definedArea.endY) {
          if (!isHandlerExecuted) {
            mouseCallbackHandler();
            setIsHandlerExecuted(true);
          }
        } else if (isHandlerExecuted) {
          if (!fireOnlyOnce) {
            setIsHandlerExecuted(false);
          }
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
    return () => {};
  }, [definedArea, mouseCallbackHandler, isHandlerExecuted, setIsHandlerExecuted, fireOnlyOnce]);
};
