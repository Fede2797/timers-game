import { useEffect, useState } from "react";
import { GAME_WIN, GAME_LOSE, GAME_IDLE, GAME_RUNS } from "./constants";

interface stopWatchProps {
  timerTime: number;
  residualTime: number;
  setResidualTime: (t: number) => void;
  gameState: string;
  setGameState: (s: string) => void;
  timersRunning: number;
  setTimersRunning: (n: number) => void;
}

export const Stopwatch = ({timerTime, residualTime, setResidualTime, gameState, setGameState, timersRunning, setTimersRunning}: stopWatchProps) => {

  const [time, setTime] = useState(timerTime);
  const [running, setRunning] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if ( time > 0 ) return;
    setRunning(false);
    setGameState(GAME_LOSE)
    setTime(0)
  }, [time])

  useEffect(() => {
    if ( gameState === GAME_RUNS ) {
      setTime(timerTime)
      setRunning(true)
      resetAnimation()
    }

  }, [gameState])
  

  const stopTimer = () => {
    if (time === 0 || gameState !== GAME_RUNS || !running) return;
    setRunning(false)
    setResidualTime( residualTime + time )
    setTimersRunning( timersRunning - 1 )
  }

  const resetAnimation = () => {
    setAnimationKey(animationKey + 1);
  }

  return (
    <div 
      className="relative w-[200px] h-[200px] m-auto flex flex-col justify-center items-center border-4 border-white rounded-full text-[32px] text-white font-semibold "
      onClick={() => stopTimer()}
    >
      {/* White ball */}
      <div key={animationKey} className={`absolute right-[-4px] top-[-4px] w-[200px] h-[200px] after:absolute after:w-6 after:h-6 after:bg-white after:rounded-full after:right-[-9px] after:top-[88px] ${ running ? ' animate-timer' : 'animate-timer pause'}`}></div>
      <div className="min-w-[125px]">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="">
        <span>STOP</span>
      </div>
    </div>
  );
};