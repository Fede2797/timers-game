import { useState, useEffect, useRef } from 'react';
import { GameState, WinCondition, Difficulty, ClocksTimers } from './types';
import { ConfettiComp } from "./ConfettiComp";
import { StopwatchGrid } from './StopwatchGrid';
import { StartGameButton } from './StartGameButton';
import { DifficultyButtons } from './DifficultyButtons';
import { WinningConditionLabel } from './WinningConditionLabel';
import { ScoreTable } from './ScoreTable';

const audio = new Audio("/ticking-sound.mp3");

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

    audio.play()

    setGameState(GameState.Running)
  }

  const defineWinner = () => {
    (residualTime <= winCondition.current) 
      ? setGameState(GameState.Win)
      : setGameState(GameState.Lose)
    
    audio.pause();
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
      
      {/* If the player wins, throw confetti */}
      { gameState === "W" && (<ConfettiComp />) }
      
      <ScoreTable gameState={gameState} residualTime={residualTime}/>

      <DifficultyButtons gameState={gameState} setDifficulty={setDifficulty}/>
      <WinningConditionLabel winCondition={winCondition.current}/>

      <StartGameButton startGame={startGame}/>

      <StopwatchGrid clocksTimers={clocksTimers} residualTime={residualTime} setResidualTime={setResidualTime} gameState={gameState} setGameState={setGameState} timersRunning={timersRunning} setTimersRunning={setTimersRunning} difficulty={difficulty} />
    </div>
  )
}

export default App
