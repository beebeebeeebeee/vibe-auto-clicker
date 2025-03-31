import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { click } from '../store/gameSlice';
import Player from './Player';
import ClickParticle from './ClickParticle';
import { getAssetPath } from '../utils/assetUtils';
import { formatNumber } from '../utils/numberFormat';

export default function ResourceDisplay() {
    const dispatch = useDispatch();
    const { resources } = useSelector((state: RootState) => state.game);
    const [isClicking, setIsClicking] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: string; x: number; y: number }>>([]);
    const particleIdRef = useRef(0);

    const handleClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        dispatch(click());
        setIsClicking(true);
        
        // Generate a unique ID for each particle
        const particleId = `particle-${Date.now()}-${particleIdRef.current++}`;
        setParticles(prev => [...prev, { id: particleId, x, y }]);
        
        setTimeout(() => setIsClicking(false), 100);
    };

    return (
        <div className="resource-display">
            <h2 className="resource-amount">
                {formatNumber(BigInt(resources.coins.amount))} {resources.coins.name}
            </h2>
            <div className="resource-stats">
                <div className="stat-item">
                    <span>Per Click: {formatNumber(BigInt(resources.coins.perClick))}</span>
                </div>
                <div className="stat-item">
                    <span>Per Second: {formatNumber(BigInt(resources.coins.perSecond))}</span>
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
                {particles.map((particle, idx) => (
                    <ClickParticle
                        key={idx}
                        x={particle.x}
                        y={particle.y}
                        value={BigInt(resources.coins.perClick)}
                        onComplete={() => setParticles(prev => prev.filter(p => p.id !== particle.id))}
                    />
                ))}
            </div>
        </div>
    );
} 