import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { resetGame } from '../store/gameSlice';

interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
    const dispatch = useDispatch();

    const handleReset = useCallback(() => {
        if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            dispatch(resetGame());
            localStorage.clear();
            onClose();
        }
    }, [dispatch, onClose]);

    if (!isOpen) return null;

    return (
        <div className="settings-dialog-overlay">
            <div className="settings-dialog">
                <h2>Settings</h2>
                <button className="settings-button danger" onClick={handleReset}>
                    Reset Progress
                </button>
                <button className="settings-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
} 