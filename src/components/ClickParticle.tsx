interface ClickParticleProps {
    x: number;
    y: number;
    value: number;
    onComplete: () => void;
}

export default function ClickParticle({ x, y, value, onComplete }: ClickParticleProps) {
    return (
        <div 
            className="click-particle"
            style={{ left: x, top: y }}
            onAnimationEnd={onComplete}
        >
            +{value}
        </div>
    );
} 