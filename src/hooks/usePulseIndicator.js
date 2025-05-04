import { useEffect, useState } from 'react';

export const usePulseIndicator = (targetId, text) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const updatePosition = () => {
      const target = document.getElementById(targetId);
      if (target) {
        const rect = target.getBoundingClientRect();
        setPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX + rect.width + 10, // a la derecha
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetId]);

  const Indicator = () =>
    position && (
      <div
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span className="pulse-indicator" />
        <span className="pulse-text">{text}</span>
      </div>
    );

  return Indicator;
};
