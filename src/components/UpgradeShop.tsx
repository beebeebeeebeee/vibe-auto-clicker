import { useGame } from '../context/GameContext';

const calculateUpgradeCost = (baseCost: number, level: number): number => {
    return Math.floor(baseCost * Math.pow(1.5, level));
};

export default function UpgradeShop() {
    const { state, dispatch } = useGame();
    const { upgrades, resources } = state;

    return (
        <div className="upgrade-shop">
            <h2>Upgrades</h2>
            <div className="upgrades-list">
                {upgrades.map(upgrade => {
                    const currentCost = calculateUpgradeCost(upgrade.baseCost, upgrade.level);
                    return (
                        <div key={upgrade.id} className="upgrade-item">
                            <div className="upgrade-info">
                                <h3>{upgrade.name} (Level {upgrade.level})</h3>
                                <p>{upgrade.description}</p>
                                <p className="upgrade-cost">Cost: {currentCost.toLocaleString()} coins</p>
                            </div>
                            <button
                                onClick={() => dispatch({ type: 'BUY_UPGRADE', upgradeId: upgrade.id })}
                                disabled={resources.amount < currentCost}
                            >
                                Upgrade
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 