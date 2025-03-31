import { UpgradeConfig } from '../types/GameTypes';

export const UPGRADES: UpgradeConfig[] = [
    {
        id: 'click1',
        name: 'Better Click',
        baseCost: '10',
        multiplier: '1',
        type: 'click',
        description: 'Increase coins per click by 1'
    },
    {
        id: 'click2',
        name: 'Double Click',
        baseCost: '100',
        multiplier: '2',
        type: 'click',
        description: 'Double your coins per click'
    },
    {
        id: 'auto1',
        name: 'Auto Clicker',
        baseCost: '50',
        multiplier: '1',
        type: 'auto',
        description: 'Generate 1 coin per second'
    },
    {
        id: 'auto2',
        name: 'Coin Factory',
        baseCost: '100',
        multiplier: '5',
        type: 'auto' as const,
        description: 'Generates 5 coins per second'
    },
    {
        id: 'auto3',
        name: 'Mining Rig',
        baseCost: '250',
        multiplier: '25',
        type: 'auto' as const,
        description: 'Generates 25 coins per second'
    },
    {
        id: 'click3',
        name: 'Golden Touch',
        baseCost: '500',
        multiplier: '5',
        type: 'click' as const,
        description: 'Multiplies click value by 5'
    }
] as const; 