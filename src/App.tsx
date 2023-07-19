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
    <div className="relative bg-yellow min-h-screen flex flex-col items-center font-jost text-black">
      <div className="mt-10 px-4 flex flex-col items-center bg-white border-4 border-black rounded-xl md:mt-5">
        <div className="text-[32px] font-semibold uppercase md:text-[48px]">
          {
            ((gameState !== GameState.Win) && (gameState !== GameState.Lose)) ? (
              <span>Score</span>
            ) : (gameState === GameState.Win) 
                ? ( <span>You win!</span> ) 
                : ( <span>You lose</span> )
          }
        </div>
        <div className="text-[32px] font-semibold md:text-[48px]">
          <span>{("0" + Math.floor((residualTime / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((residualTime / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((residualTime / 10) % 100)).slice(-2)}</span>
        </div>
      </div>

      {/* Difficulty buttons */}
      <div className="mt-4 flex gap-2 font-semibold text-[15px] md:text-[28px] md:mt-5 uppercase md:gap-8">
        <div className="relative group">
          <button
            className="relative w-[60px] h-[40px] md:w-[150px] md:h-[80px] bg-green border-[3px] border-black rounded-xl md:group-hover:-translate-x-[6px] md:group-hover:-translate-y-[6px] transition-all z-10 md:group-active:translate-x-0 md:group-active:translate-y-0"
            disabled={ gameState === GameState.Running ? true : false }
            onClick={() => setDifficulty(Difficulty.Easy)}
          >
            <span>Easy</span>
          </button>
          {/* Shadow */}
          <div className='hidden md:block absolute w-[150px] h-[80px] top-[0px] left-[0px] bg-black border-[3px] border-black rounded-xl z-0'></div>
        </div>
        <div className="relative group">
          <button 
            className="relative w-[70px] h-[40px] md:w-[150px] md:h-[80px] bg-blue border-[3px] border-black rounded-xl md:group-hover:-translate-x-[6px] md:group-hover:-translate-y-[6px] transition-all z-10 md:group-active:translate-x-0 md:group-active:translate-y-0"
            disabled={ gameState === GameState.Running ? true : false }
            onClick={() => setDifficulty(Difficulty.Normal)}
          >
            <span>Normal</span>
          </button>
          {/* Shadow */}
          <div className='hidden md:block absolute w-[150px] h-[80px] top-[0px] left-[0px] bg-black border-[3px] border-black rounded-xl z-0'></div>
        </div>
        <div className="relative group">
          <button 
            className="relative w-[60px] h-[40px] md:w-[150px] md:h-[80px] bg-orange border-[3px] border-black rounded-xl md:group-hover:-translate-x-[6px] md:group-hover:-translate-y-[6px] transition-all z-10 md:group-active:translate-x-0 md:group-active:translate-y-0"
            disabled={ gameState === GameState.Running ? true : false }
            onClick={() => setDifficulty(Difficulty.Hard)}
          >
            <span>Hard</span>
          </button>
          {/* Shadow */}
          <div className='hidden md:block absolute w-[150px] h-[80px] top-[0px] left-[0px] bg-black border-[3px] border-black rounded-xl z-0'></div>
        </div>
        <div className="relative group">
          <button 
            className="relative w-[60px] h-[40px] md:w-[150px] md:h-[80px] bg-red border-[3px] border-black rounded-xl md:group-hover:-translate-x-[6px] md:group-hover:-translate-y-[6px] transition-all z-10 md:group-active:translate-x-0 md:group-active:translate-y-0"
            disabled={ gameState === GameState.Running ? true : false }
            onClick={() => setDifficulty(Difficulty.Pro)}
          >
            <span>Pro</span>
          </button>
          {/* Shadow */}
          <div className='hidden md:block absolute w-[150px] h-[80px] top-[0px] left-[0px] bg-black border-[3px] border-black rounded-xl z-0'></div>
        </div>
      </div>
      <div className="mt-2 mb-4 text-[15px] md:text-[24px]">
        <span>Total score must be less than or equal to
        <span> 00:</span>
        <span>{("0" + Math.floor((winCondition.current / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((winCondition.current / 10) % 100)).slice(-2)} </span>
         to win</span>
      </div>
      
      <div className="relative group">
        <button 
          onClick={startGame}
          className="relative w-[150px] h-[50px] md:w-[250px] md:h-[90px] text-[20px] md:text-[32px] font-semibold bg-black text-white z-10 md:group-hover:-translate-x-2 md:group-hover:-translate-y-2 md:group-active:translate-x-0 md:group-active:translate-y-0 transition-all uppercase"
        >
          Start game
        </button>
        <div className='hidden md:block absolute w-[150px] h-[50px] md:w-[250px] md:h-[90px] top-[0px] left-[0px] bg-white border-[3px] border-black z-0'></div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-10 md:mt-6 md:mb-10">
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
