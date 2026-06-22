import { useEffect, useRef } from 'react';

export default function Cursor() {
  const curRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only enable custom cursor if device supports hovering
    if (!window.matchMedia('(hover: hover)').matches) return;

    const cur = curRef.current;
    const ring = ringRef.current;
    if (!cur || !ring) return;

    let mx = 0, my = 0; // Mouse coords
    let rx = 0, ry = 0; // Ring coords
    let active = true;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = `${mx}px`;
      cur.style.top = `${my}px`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Interpolation loop
    const tick = () => {
      if (!active) return;
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      requestAnimationFrame(tick);
    };

    const animFrameId = requestAnimationFrame(tick);

    // Handle cursor scale changes on hover
    const addHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, .pc, .ei, .sk-cell, select, input, textarea');
      targets.forEach(el => {
        const handleEnter = () => {
          cur.style.width = '18px';
          cur.style.height = '18px';
          ring.style.width = '52px';
          ring.style.height = '52px';
        };
        const handleLeave = () => {
          cur.style.width = '10px';
          cur.style.height = '10px';
          ring.style.width = '36px';
          ring.style.height = '36px';
        };

        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
        
        // Clean up hover listeners specifically
        el._cleanCursor = () => {
          el.removeEventListener('mouseenter', handleEnter);
          el.removeEventListener('mouseleave', handleLeave);
        };
      });
    };

    // Run hover listener attach on load and set an observer to update on DOM changes
    addHoverListeners();

    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      active = false;
      cancelAnimationFrame(animFrameId);
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();

      const targets = document.querySelectorAll('a, button, .pc, .ei, .sk-cell, select, input, textarea');
      targets.forEach(el => {
        if (el._cleanCursor) el._cleanCursor();
      });
    };
  }, []);

  return (
    <>
      <div id="cur" ref={curRef}></div>
      <div id="cur-ring" ref={ringRef}></div>
    </>
  );
}
