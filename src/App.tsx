import { Stopwatch } from "./Stopwatch"
import { useState, useEffect } from 'react';
import { GameState, WinCondition, Difficulty } from "./types";


function App() {

  const [gameState, setGameState] = useState(GameState.Idle);
  const [residualTime, setResidualTime] = useState(0);
  const [difficulty, setDifficulty] = useState(Difficulty.Easy);
  const [timersRunning, setTimersRunning] = useState(1);

  const startGame = () => {
    
    switch (difficulty) {
      case Difficulty.Easy:
        setTimersRunning(1);
        break;
      case Difficulty.Normal:
        setTimersRunning(2);
        break;
      case Difficulty.Hard:
        setTimersRunning(3);
        break;
      case Difficulty.Pro:
        setTimersRunning(4);
        break;
      default:
        break;
    }

    setResidualTime(0)
    setGameState(GameState.Running)
  }

  const defineWinner = () => {
    (residualTime <= WinCondition.Easy) 
      ? setGameState(GameState.Win)
      : setGameState(GameState.Lose)
  }

  useEffect(() => {
    if (timersRunning !== 0) return;
    
    switch (difficulty) {
      case Difficulty.Easy:
        defineWinner();
        break;
      case Difficulty.Normal:
        defineWinner();
        break;
      case Difficulty.Hard:
        defineWinner();
        break;
      case Difficulty.Pro:
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
