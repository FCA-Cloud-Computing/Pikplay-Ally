import React, { useEffect, useState } from 'react';
import './pulse-indicator.scss';
import useCommonStore from '@/hooks/commonStore';

const PulseIndicator = () => {
    const [position, setPosition] = useState(null);
    const visualIndicator = useCommonStore(state => state.visualIndicator)
    const { targetId, text, textStyle, containerStyle } = visualIndicator || {}

    useEffect(() => {
        const updatePosition = () => {
            const target = document.getElementById(targetId);
            if (target) {
                const rect = target.getBoundingClientRect();
                setPosition({
                    top: rect.top + window.scrollY,
                    left: rect.left + window.scrollX + rect.width + 10,
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

    if (!position) return null;

    return (
        <div
            className='PulseIndicatorComponent'
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left - 30,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                ...containerStyle
            }}
        >
            <span className="pulse-indicator" />
            <span className="pulse-text" style={textStyle}>
                {text}
                {/* Ejemplo */}
            </span>
        </div>
    );
};

export default PulseIndicator;
