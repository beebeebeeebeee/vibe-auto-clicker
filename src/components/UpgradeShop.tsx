import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { buyUpgrade } from '../store/gameSlice';
import { formatNumber } from '../utils/numberFormat';
import { UPGRADES } from '../config/upgrades';
import { ClickIcon, AutoIcon } from '../utils/upgradeIcons';
import { useState } from 'react';
import type { UpgradeState } from '../types/GameTypes';

// Helper function to calculate upgrade cost
const calculateUpgradeCost = (baseCost: string, level: number): string => {
    const base = BigInt(baseCost);
    const multiplier = BigInt(2);
    const levelBigInt = BigInt(level);
    return (base * (multiplier ** levelBigInt)).toString();
};

// Helper function to get profit text
const getProfitText = (
    type: 'click' | 'auto', 
    multiplier: string, 
    id: string, 
    level: number,
    currentPerClick: string,
): string => {
    const multiplierBigInt = BigInt(multiplier);
    if (type === 'click') {
        if(level === 0) {
            return `+0/click`;
        } else if (id === 'click1') {
            const totalBonus = multiplierBigInt * BigInt(level);
            return `+${formatNumber(totalBonus)}/click`;
        } else {
            const baseClick = BigInt(currentPerClick);
            const totalPower = baseClick * (multiplierBigInt ** BigInt(level));
            return `+${formatNumber(totalPower)}/click`;
        }
    } else {
        const totalBonus = multiplierBigInt * BigInt(level);
        return `+${formatNumber(totalBonus)}/second`;
    }
};

interface TooltipProps {
    description: string;
    isVisible: boolean;
    x: number;
    y: number;
}

const Tooltip = ({ description, isVisible, x, y }: TooltipProps) => {
    if (!isVisible) return null;
    
    return (
        <div 
            className="upgrade-tooltip"
            style={{
                left: `${x}px`,
                top: `${y}px`
            }}
        >
            {description}
        </div>
    );
};

export default function UpgradeShop() {
    const dispatch = useDispatch();
    const { resources, upgrades } = useSelector((state: RootState) => state.game);
    const [tooltip, setTooltip] = useState<{ description: string; x: number; y: number; } | null>(null);

    const handleMouseEnter = (e: React.MouseEvent, description: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            description,
            x: rect.left,
            y: rect.bottom + 5
        });
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    const handleUpgradeClick = (upgradeId: string) => {
        dispatch(buyUpgrade(upgradeId));
    };

    return (
        <div className="upgrade-shop">
            <h2>Upgrades</h2>
            <div className="upgrades-list">
                {UPGRADES.map(upgradeConfig => {
                    const upgradeState = upgrades.find((u: UpgradeState) => u.id === upgradeConfig.id)!;
                    const currentCost = calculateUpgradeCost(upgradeConfig.baseCost, upgradeState.level);
                    const canAfford = BigInt(resources.coins.amount) >= BigInt(currentCost);
                    const profitText = getProfitText(
                        upgradeConfig.type, 
                        upgradeConfig.multiplier, 
                        upgradeConfig.id,
                        upgradeState.level,
                        resources.coins.perClick
                    );
                    
                    return (
                        <div 
                            key={upgradeConfig.id} 
                            className="upgrade-item"
                            onMouseEnter={(e) => handleMouseEnter(e, upgradeConfig.description)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="upgrade-level">Lv{upgradeState.level}</div>
                            <div className="upgrade-icon">
                                {upgradeConfig.type === 'click' ? <ClickIcon /> : <AutoIcon />}
                            </div>
                            <div className="upgrade-name">{upgradeConfig.name}</div>
                            <div className="upgrade-profit">{profitText}</div>
                            <button
                                className="upgrade-button"
                                onClick={() => handleUpgradeClick(upgradeConfig.id)}
                                disabled={!canAfford}
                            >
                                {formatNumber(BigInt(currentCost))}
                            </button>
                        </div>
                    );
                })}
            </div>
            <Tooltip 
                description={tooltip?.description || ''} 
                isVisible={!!tooltip}
                x={tooltip?.x || 0}
                y={tooltip?.y || 0}
            />
        </div>
    );
} 