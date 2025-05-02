import { useState, useEffect } from 'react';

export function useCountUp(target: number, duration = 500): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = performance.now();

    function animate(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [target, duration]);

  return value;
}
