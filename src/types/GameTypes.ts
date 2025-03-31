export interface Resource {
    name: string;
    amount: string;  // Stored as string in Redux
    perClick: string;  // Stored as string in Redux
    perSecond: string;  // Stored as string in Redux
}

// This represents the state of an upgrade (just level)
export interface UpgradeState {
    id: string;
    level: number;
}

export interface Upgrade {
    id: string;
    name: string;
    baseCost: bigint;
    level: number;
    multiplier: bigint;
    type: 'click' | 'auto';
    description: string;
}

// This represents the configuration of an upgrade (static data)
export interface UpgradeConfig {
    id: string;
    name: string;
    baseCost: string;  // Stored as string in Redux
    multiplier: string;  // Stored as string in Redux
    type: 'click' | 'auto';
    description: string;
} 