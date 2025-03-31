import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import Game from './components/Game';
import SettingsDialog from './components/SettingsDialog';
import { useState } from 'react';
import { SettingsIcon } from './utils/settingsIcon';
import './App.css'

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <button
            className="settings-button"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Settings"
          >
            <SettingsIcon />
          </button>
          <Game />
          <SettingsDialog
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
