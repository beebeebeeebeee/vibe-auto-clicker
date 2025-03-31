import { formatNumber } from '../utils/numberFormat';

interface ClickParticleProps {
    x: number;
    y: number;
    value: bigint;
    onComplete: () => void;
}

export default function ClickParticle({ x, y, value, onComplete }: ClickParticleProps) {
    return (
        <div 
            className="click-particle"
            style={{ left: x, top: y }}
            onAnimationEnd={onComplete}
        >
            +{formatNumber(value)}
        </div>
    );
} 