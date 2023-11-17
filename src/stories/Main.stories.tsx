import React, { useRef } from 'react';
import { useMouseCloseBy } from '../hooks/use-mouse-close-by';

export default {
  title: 'Example/Basic',
  component: () => <div>{'test'}</div>,
};

const boundaryArea = { x: 50, y: 50 };

export const UseMouseCloseByTest = () => {
  const ref = useRef<HTMLDivElement>(null);

  useMouseCloseBy(
    () => {
      console.log('we entered');
    },
    { ref, boundaryArea },
  );

  return (
    <div style={{ display: 'inline-block', border: '1px solid red' }}>
      <div style={{ display: 'inline-block', margin: '50px', border: '1px solid blue' }} ref={ref}>
        Hellooooo
      </div>
    </div>
  );
};

export const Test = () => <div>{'test'}</div>;
