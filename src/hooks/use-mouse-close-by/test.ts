import { useMouseCloseBy } from './index';
import { getNewDefinedArea } from './lib';

describe('useMouseCloseBy', () => {
  test('export what is expected', () => {
    expect(useMouseCloseBy).toBeDefined();
  });
});

describe('getNewDefinedArea', () => {
  test('export what is expected', () => {
    expect(getNewDefinedArea).toBeDefined();
  });

  test('to create defined area', () => {
    const clientRect = {
      x: 70,
      y: 70,
      bottom: 16,
      right: 22,
    } as DOMRect;

    const result = getNewDefinedArea(clientRect, { x: 50, y: 50 });
    expect(result).toEqual({
      endX: 72,
      endY: 66,
      startX: 20,
      startY: 20,
    });
  });

  test('to default X and Y to 0 then boundary is 0 or negative', () => {
    const clientRect = {
      x: 40,
      y: 40,
      bottom: 16,
      right: 22,
    } as DOMRect;

    const result = getNewDefinedArea(clientRect, { x: 50, y: 50 });
    expect(result).toEqual({
      endX: 72,
      endY: 66,
      startX: 0,
      startY: 0,
    });
  });
});
