import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { tick } from '../store/gameSlice';
import ResourceDisplay from './ResourceDisplay';
import UpgradeShop from './UpgradeShop';
import { getAssetPath } from '../utils/assetUtils';

export default function Game() {
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(tick());
        }, 1000); // Update every 100ms

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