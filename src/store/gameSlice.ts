import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Resource, UpgradeState } from '../types/GameTypes';
import { UPGRADES } from '../config/upgrades';

export interface GameState {
    resources: {
        coins: Resource;
    };
    upgrades: UpgradeState[];
    lastTick: number;
}

const initialState: GameState = {
    resources: {
        coins: {
            name: 'Coins',
            amount: '0',
            perClick: '1',
            perSecond: '0'
        }
    },
    upgrades: UPGRADES.map(upgrade => ({
        id: upgrade.id,
        level: 0
    })),
    lastTick: Date.now()
};

// Helper function to calculate upgrade cost
const calculateUpgradeCost = (baseCost: string, level: number): string => {
    const base = BigInt(baseCost);
    const multiplier = BigInt(2);
    const levelBigInt = BigInt(level);
    return (base * (multiplier ** levelBigInt)).toString();
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        click: (state) => {
            const currentAmount = BigInt(state.resources.coins.amount);
            const perClick = BigInt(state.resources.coins.perClick);
            state.resources.coins.amount = (currentAmount + perClick).toString();
        },
        tick: (state) => {
            const now = Date.now();
            const deltaTime = (now - state.lastTick) / 1000;
            const deltaTimeMs = BigInt(Math.round(deltaTime * 1000));
            const perSecond = BigInt(state.resources.coins.perSecond);
            const deltaCoins = (perSecond * deltaTimeMs) / BigInt(1000);
            
            const currentAmount = BigInt(state.resources.coins.amount);
            state.resources.coins.amount = (currentAmount + deltaCoins).toString();
            state.lastTick = now;
        },
        buyUpgrade: (state, action: PayloadAction<string>) => {
            const upgradeId = action.payload;
            const upgradeState = state.upgrades.find(u => u.id === upgradeId);
            const upgradeConfig = UPGRADES.find(u => u.id === upgradeId);
            
            if (!upgradeState || !upgradeConfig) return;
            
            const cost = calculateUpgradeCost(upgradeConfig.baseCost, upgradeState.level);
            const currentAmount = BigInt(state.resources.coins.amount);
            
            if (currentAmount < BigInt(cost)) return;
            
            // Deduct cost
            state.resources.coins.amount = (currentAmount - BigInt(cost)).toString();
            upgradeState.level += 1;
            
            // Apply upgrade effects
            if (upgradeConfig.type === 'click') {
                const currentPerClick = BigInt(state.resources.coins.perClick);
                const multiplier = BigInt(upgradeConfig.multiplier);
                
                if (upgradeConfig.id === 'click1') {
                    // For click1, we add the multiplier
                    state.resources.coins.perClick = (currentPerClick + multiplier).toString();
                } else {
                    // For other click upgrades, we multiply
                    state.resources.coins.perClick = (currentPerClick * multiplier).toString();
                }
            } else if (upgradeConfig.type === 'auto') {
                const currentPerSecond = BigInt(state.resources.coins.perSecond);
                const multiplier = BigInt(upgradeConfig.multiplier);
                state.resources.coins.perSecond = (currentPerSecond + multiplier).toString();
            }
        },
        resetGame: () => initialState
    }
});

export const { click, tick, buyUpgrade, resetGame } = gameSlice.actions;
export default gameSlice.reducer; 