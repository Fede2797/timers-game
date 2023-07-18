import { Stopwatch } from "./Stopwatch"
import { useState, useEffect, useRef } from 'react';
import { GameState, WinCondition, Difficulty, ClocksTimers } from './types';


function App() {

  const [gameState, setGameState] = useState(GameState.Idle);
  const [residualTime, setResidualTime] = useState(0);
  const [difficulty, setDifficulty] = useState(Difficulty.Easy);
  const [timersRunning, setTimersRunning] = useState(1);
  const [clocksTimers, setClocksTimers] = useState(ClocksTimers.Easy);

  const winCondition = useRef(WinCondition.Easy);

  const startGame = () => {
    setResidualTime(0)

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

    setGameState(GameState.Running)
  }

  const defineWinner = () => {
    (residualTime <= winCondition.current) 
      ? setGameState(GameState.Win)
      : setGameState(GameState.Lose)
  }

  useEffect(() => {
    if (timersRunning === 0) defineWinner();
  }, [timersRunning])


  // TODO: Cuando programe los botones para cambiar la dificultad, deshabilitarlos si gameState === GameState.Running
  useEffect(() => {
    
    switch (difficulty) {
      case Difficulty.Easy:
        setTimersRunning(1);
        winCondition.current = WinCondition.Easy;
        setClocksTimers(ClocksTimers.Easy)
        break;
      case Difficulty.Normal:
        setTimersRunning(2);
        winCondition.current = WinCondition.Normal;
        setClocksTimers(ClocksTimers.Normal)
        break;
      case Difficulty.Hard:
        setTimersRunning(3);
        winCondition.current = WinCondition.Hard;
        setClocksTimers(ClocksTimers.Hard)
        break;
      case Difficulty.Pro:
        setTimersRunning(4);
        winCondition.current = WinCondition.Pro;
        setClocksTimers(ClocksTimers.Pro)
        break;
      default:
        break;
    }
    
  }, [difficulty])
  
  
 
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

      {/* Difficulty buttons */}
      <div className="mt-4 flex gap-2 text-white font-semibold text-[15px] md:text-[24px] md:mt-10 uppercase">
        <button 
          className="w-[60px] h-[40px] md:w-[150px] md:h-[80px] border-4 border-white"
          disabled={ gameState === GameState.Running ? true : false }
          onClick={() => setDifficulty(Difficulty.Easy)}
        >
          <span>Easy</span>
        </button>
        <button 
          className="w-[70px] h-[40px] md:w-[150px] md:h-[80px] border-4 border-white"
          disabled={ gameState === GameState.Running ? true : false }
          onClick={() => setDifficulty(Difficulty.Normal)}
        >
          <span>Normal</span>
        </button>
        <button 
          className="w-[60px] h-[40px] md:w-[150px] md:h-[80px] border-4 border-white"
          disabled={ gameState === GameState.Running ? true : false }
          onClick={() => setDifficulty(Difficulty.Hard)}
        >
          <span>Hard</span>
        </button>
        <button 
          className="w-[60px] h-[40px] md:w-[150px] md:h-[80px] border-4 border-white"
          disabled={ gameState === GameState.Running ? true : false }
          onClick={() => setDifficulty(Difficulty.Pro)}
        >
          <span>Pro</span>
        </button>
      </div>

      <div className="mt-2 mb-4 text-white text-[15px] md:text-[20px]">
        <span>Total score must be less than
        <span> 00:</span>
        <span>{("0" + Math.floor((winCondition.current / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((winCondition.current / 10) % 100)).slice(-2)} </span>
         to win</span>
      </div>

      <button 
        className="w-[150px] h-[60px] md:w-[200px] md:h-[80px] mb-4 text-[20px] md:text-[24px] text-white font-semibold border-4 border-white"
        onClick={() => startGame()}
      >
        <span>START GAME</span>
      </button>

      <div className="grid grid-cols-2 gap-10">
        {
          clocksTimers.map( time => (
            <Stopwatch key={time} timerTime={time} residualTime={residualTime} setResidualTime={setResidualTime} gameState={gameState} setGameState={setGameState} timersRunning={timersRunning} setTimersRunning={setTimersRunning} difficulty={difficulty}/>
          ))
        }
      </div>
    </div>
  )
}

export default App
