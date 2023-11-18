import { useMouseCloseBy } from './index';
import { getNewDefinedArea } from './lib';
import React, { useRef, useLayoutEffect } from 'react';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('useMouseCloseBy', () => {
  test('export what is expected', () => {
    expect(useMouseCloseBy).toBeDefined();
  });

  test('to fire when mouse getting close', async () => {
    const handler = jest.fn();

    const TestHookWithButtonArea = () => {
      const buttonRef = useRef<HTMLButtonElement>(null);

      useLayoutEffect(() => {
        jest.spyOn(buttonRef.current, 'getBoundingClientRect').mockImplementation(() => {
          return { x: 70, y: 70, bottom: 70, right: 70 } as DOMRect;
        });
      }, []);

      useMouseCloseBy(
        {
          handler,
          boundaryArea: { x: 10, y: 10 },
        },
        buttonRef,
      );

      return (
        <div>
          <button ref={buttonRef}>Test</button>
        </div>
      );
    };

    const user = userEvent.setup();

    render(<TestHookWithButtonArea />);
    await user.pointer({ coords: { clientX: 60, clientY: 60 } });

    expect(handler).toHaveBeenCalledTimes(1);
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
