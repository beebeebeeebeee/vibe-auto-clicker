import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import ResourceDisplay from './ResourceDisplay';
import UpgradeShop from './UpgradeShop';
import { getAssetPath } from '../utils/assetUtils';

export default function Game() {
    const { dispatch } = useGame();

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: 'TICK' });
        }, 100); // Update every 100ms

        // Set background image
        document.documentElement.style.setProperty(
            '--background-image',
            `url("${getAssetPath('background.svg')}")`
        );

        return () => {
            clearInterval(timer);
            // Clean up
            document.documentElement.style.setProperty('--background-image', '');
        };
    }, [dispatch]);

    return (
        <div className="game-container">
            <ResourceDisplay />
            <UpgradeShop />
        </div>
    );
} 