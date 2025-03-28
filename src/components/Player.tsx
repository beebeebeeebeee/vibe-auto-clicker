import { useState, useEffect } from 'react';
import { getAssetPath } from '../utils/assetUtils';

interface PlayerProps {
    isClicking: boolean;
}

export default function Player({ isClicking }: PlayerProps) {
    const [position, setPosition] = useState({ x: 50, y: 50 });

    useEffect(() => {
        if (isClicking) {
            // Random movement when clicking
            setPosition(prev => ({
                x: prev.x + (Math.random() * 20 - 10),
                y: prev.y + (Math.random() * 20 - 10)
            }));
        }
    }, [isClicking]);

    return (
        <div 
            className="player"
            style={{
                transform: `translate(${position.x}px, ${position.y}px) ${isClicking ? 'scale(1.1)' : 'scale(1)'}`,
            }}
        >
            <img src={getAssetPath('character.svg')} alt="Player" />
        </div>
    );
} 