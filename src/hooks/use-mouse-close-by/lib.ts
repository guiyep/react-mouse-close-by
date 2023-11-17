import type { BoundaryArea, DefinedArea } from './types';

export const getNewDefinedArea = (clientRect: DOMRect, boundaryArea: BoundaryArea): DefinedArea => {
  return {
    startY: Math.max(clientRect.y - boundaryArea.y, 0),
    endY: clientRect.bottom + boundaryArea.y,
    startX: Math.max(clientRect.x - boundaryArea.x, 0),
    endX: clientRect.right + boundaryArea.y,
  };
};
