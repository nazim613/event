// components/CustomCursor.js
'use client';

import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-6 h-6 rounded-full bg-black pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
    ></div>
  );
};

export default CustomCursor;