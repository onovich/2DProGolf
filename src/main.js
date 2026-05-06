import './view/styles/game.css';
import { renderGameScreen } from './view/screens/gameScreen';
import { initGame } from './logic/engine/gameEngine';

const app = document.getElementById('app');
app.innerHTML = renderGameScreen();
initGame();
