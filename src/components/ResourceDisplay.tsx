import { useState } from 'react';
import { useGame } from '../context/GameContext';
import Player from './Player';
import ClickParticle from './ClickParticle';
import { getAssetPath } from '../utils/assetUtils';

export default function ResourceDisplay() {
    const { state, dispatch } = useGame();
    const { resources } = state;
    const [isClicking, setIsClicking] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
    let particleId = 0;

    const handleClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        dispatch({ type: 'CLICK' });
        setIsClicking(true);
        
        // Add particle
        setParticles(prev => [...prev, { id: particleId++, x, y }]);
        
        setTimeout(() => setIsClicking(false), 100);
    };

    return (
        <div className="resource-display">
            <h2 className="resource-amount">
                {Math.floor(resources.amount).toLocaleString()} {resources.name}
            </h2>
            <div className="resource-stats">
                <div className="stat-item">
                    <span>Per Click: {resources.perClick.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                    <span>Per Second: {resources.perSecond.toLocaleString()}</span>
                </div>
            </div>
            <div className="game-area">
                <Player isClicking={isClicking} />
                <button 
                    className="click-button"
                    onClick={handleClick}
                >
                    <img src={getAssetPath('click-target.svg')} alt="Click Target" />
                </button>
                {particles.map(particle => (
                    <ClickParticle
                        key={particle.id}
                        x={particle.x}
                        y={particle.y}
                        value={resources.perClick}
                        onComplete={() => setParticles(prev => prev.filter(p => p.id !== particle.id))}
                    />
                ))}
            </div>
        </div>
    );
} 