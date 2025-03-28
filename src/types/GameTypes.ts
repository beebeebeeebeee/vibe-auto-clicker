export interface Resource {
    name: string;
    amount: number;
    perClick: number;
    perSecond: number;
}

export interface Upgrade {
    id: string;
    name: string;
    baseCost: number;
    level: number;
    multiplier: number;
    type: 'click' | 'auto';
    description: string;
} 