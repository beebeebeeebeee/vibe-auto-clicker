import { GameProvider } from './context/GameContext';
import Game from './components/Game';
import './App.css'

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;
