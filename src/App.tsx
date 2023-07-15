import { Stopwatch } from "./Stopwatch"
import { useState, useEffect } from 'react';
import { GAME_WIN, GAME_LOSE, GAME_IDLE, GAME_RUNS } from "./constants";
import { EASY, NORMAL, HARD, PRO } from "./constants";
import { EASY_WIN_COND, NORMAL_WIN_COND, HARD_WIN_COND, PRO_WIN_COND } from "./constants";


function App() {

  const [gameState, setGameState] = useState(GAME_IDLE);
  const [residualTime, setResidualTime] = useState(0);
  const [difficulty, setDifficulty] = useState(EASY);
  const [timersRunning, setTimersRunning] = useState(1);

  const startGame = () => {
    
    switch (difficulty) {
      case EASY:
        setTimersRunning(1);
        break;
      case NORMAL:
        setTimersRunning(2);
        break;
      case HARD:
        setTimersRunning(3);
        break;
      case PRO:
        setTimersRunning(4);
        break;
      default:
        break;
    }

    setResidualTime(0)
    setGameState(GAME_RUNS)
  }

  const defineWinner = () => {
    (residualTime <= EASY_WIN_COND) 
      ? setGameState(GAME_WIN)
      : setGameState(GAME_LOSE)
  }

  useEffect(() => {
    if (timersRunning !== 0) return;
    
    switch (difficulty) {
      case EASY:
        defineWinner();
        break;
      case NORMAL:
        defineWinner();
        break;
      case HARD:
        defineWinner();
        break;
      case PRO:
        defineWinner();
        break;
      default:
        break;
    }
  }, [timersRunning])
  
 
  return (
    <div className="bg-black min-h-screen flex flex-col items-center">
      <div className="mt-10 text-[24px] text-white font-semibold">
        <span>SCORE</span>
      </div>
      <div className="text-[32px] text-white font-semibold">
        <span>{("0" + Math.floor((residualTime / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((residualTime / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((residualTime / 10) % 100)).slice(-2)}</span>
      </div>

      <button 
        className="w-[200px] h-[80px] mt-10 text-[24px] text-white font-semibold border-4 border-white"
        onClick={() => startGame()}
      >
        <span>START GAME</span>
      </button>

      <Stopwatch timerTime={5000} residualTime={residualTime} setResidualTime={setResidualTime} gameState={gameState} setGameState={setGameState} timersRunning={timersRunning} setTimersRunning={setTimersRunning}/>
    </div>
  )
}

export default App
