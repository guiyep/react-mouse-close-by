export type BoundaryArea = {
  x: number;
  y: number;
};

export type UseMouseCloseByProps = {
  ref: React.RefObject<HTMLElement>;
  boundaryArea: BoundaryArea;
  fireOnlyOnce?: boolean;
};

export type DefinedArea = {
  startY: number;
  endY: number;
  startX: number;
  endX: number;
};
