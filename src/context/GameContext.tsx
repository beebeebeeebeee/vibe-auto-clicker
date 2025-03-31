import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Resource, Upgrade } from '../types/GameTypes';

interface GameState {
    resources: Resource;
    upgrades: Upgrade[];
    lastTick: number;
}

type GameAction =
    | { type: 'CLICK' }
    | { type: 'TICK' }
    | { type: 'BUY_UPGRADE'; upgradeId: string };

const initialState: GameState = {
    resources: {
        name: 'Coins',
        amount: '0',
        perClick: '1',
        perSecond: '0'
    },
    upgrades: [
        {
            id: 'click1',
            name: 'Better Clicking',
            baseCost: BigInt(10),
            level: 0,
            multiplier: BigInt(1),
            type: 'click',
            description: 'Adds +1 coin per click'
        },
        {
            id: 'click2',
            name: 'Power Click',
            baseCost: BigInt(50),
            level: 0,
            multiplier: BigInt(2),
            type: 'click',
            description: 'Multiplies click value by 2'
        },
        {
            id: 'auto1',
            name: 'Auto Collector',
            baseCost: BigInt(25),
            level: 0,
            multiplier: BigInt(1),
            type: 'auto',
            description: 'Generates 1 coin per second'
        },
        {
            id: 'auto2',
            name: 'Coin Factory',
            baseCost: BigInt(100),
            level: 0,
            multiplier: BigInt(5),
            type: 'auto',
            description: 'Generates 5 coins per second'
        },
        {
            id: 'auto3',
            name: 'Mining Rig',
            baseCost: BigInt(250),
            level: 0,
            multiplier: BigInt(25),
            type: 'auto',
            description: 'Generates 25 coins per second'
        },
        {
            id: 'click3',
            name: 'Golden Touch',
            baseCost: BigInt(500),
            level: 0,
            multiplier: BigInt(5),
            type: 'click',
            description: 'Multiplies click value by 5'
        }
    ],
    lastTick: Date.now()
};

// Helper function to calculate upgrade cost based on level
const calculateUpgradeCost = (baseCost: bigint, level: number): bigint => {
    // Convert the multiplier to BigInt after calculation to maintain precision
    const multiplier = BigInt(Math.round(Math.pow(1.5, level) * 1000)) / BigInt(1000);
    return baseCost * multiplier;
};

const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
} | null>(null);

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'CLICK':
            return {
                ...state,
                resources: {
                    ...state.resources,
                    amount: state.resources.amount + state.resources.perClick
                }
            };
        case 'TICK': {
            const now = Date.now();
            const deltaTime = (now - state.lastTick) / 1000;
            // Convert deltaTime to BigInt with millisecond precision
            const deltaTimeMs = BigInt(Math.round(deltaTime * 1000));
            const deltaCoins = (BigInt(state.resources.perSecond) * deltaTimeMs) / BigInt(1000);
            
            return {
                ...state,
                lastTick: now,
                resources: {
                    ...state.resources,
                    amount: state.resources.amount + deltaCoins
                }
            };
        }
        case 'BUY_UPGRADE': {
            const upgrade = state.upgrades.find(u => u.id === action.upgradeId);
            if (!upgrade) return state;

            const cost = calculateUpgradeCost(upgrade.baseCost, upgrade.level);
            if (BigInt(state.resources.amount) < cost) return state;
            
            const newState = {
                ...state,
                resources: {
                    ...state.resources,
                    amount: (BigInt(state.resources.amount) - cost).toString()
                },
                upgrades: state.upgrades.map(u =>
                    u.id === action.upgradeId 
                        ? { ...u, level: u.level + 1 }
                        : u
                )
            };

            // Apply upgrade effects
            if (upgrade.type === 'click') {
                if (upgrade.id === 'click1') {
                    // Additive bonus
                    newState.resources.perClick += upgrade.multiplier;
                } else {
                    // Multiplicative bonus
                    newState.resources.perClick = (BigInt(newState.resources.perClick) * upgrade.multiplier).toString();
                }
            } else if (upgrade.type === 'auto') {
                newState.resources.perSecond = (BigInt(newState.resources.perSecond) + upgrade.multiplier).toString();
            }

            return newState;
        }
    }
}

export function GameProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
} 