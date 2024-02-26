import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = typeof window !== 'undefined' ? window : { innerWidth: 0, innerHeight: 0 };
  return { width, height };
}

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setScreenSize(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}