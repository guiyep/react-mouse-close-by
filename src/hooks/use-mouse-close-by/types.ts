export type BoundaryArea = {
  x: number;
  y: number;
};

export type UseMouseCloseByProps = {
  handler: () => void;
  boundaryArea: BoundaryArea;
  fireOnlyOnce?: boolean;
};

export type DefinedArea = {
  startY: number;
  endY: number;
  startX: number;
  endX: number;
};
