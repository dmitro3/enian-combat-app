import React, { useEffect, useState } from 'react';
import { sleep } from './utils';

interface CounterProps {
   start: number;
   end: number;
   duration: number; // in milliseconds
   onEnd?: () => void; // Optional callback for when the counter ends
}

const AnimatedCounter: React.FC<CounterProps> = ({
   start,
   end,
   duration,
   onEnd,
}) => {
   const [count, setCount] = useState(start);

   useEffect(() => {
      const startTime = performance.now();

      const step = async (currentTime: number) => {
         const elapsedTime = currentTime - startTime;
         const progress = Math.min(elapsedTime / duration, 1); // Ensures we don't exceed 1
         const currentCount = Math.floor(start + (end - start) * progress);
         setCount(currentCount);

         if (progress < 1) {
            requestAnimationFrame(step);
         } else if (onEnd && currentCount === 100) {
            await sleep(300);
            onEnd(); // Call the optional onEnd function when the counter reaches the end
         }
      };

      requestAnimationFrame(step);
   }, [start, end, duration]);

   return <>{count}</>;
};

export default AnimatedCounter;
