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
    }

  }, [gameState])
  

  const stopTimer = () => {
    if (time === 0 || gameState !== GAME_RUNS || !running) return;
    setRunning(false)
    setResidualTime( residualTime + time )
    setTimersRunning( timersRunning - 1 )
  }
  

  return (
    <div className="w-[200px] h-[200px] m-auto flex flex-col justify-center items-center border-4 border-white rounded-full text-[32px] text-white font-semibold">
      <div className="">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="">
        {/* <button onClick={() => setRunning(true)}>Start</button> */}
        <button onClick={() => stopTimer()}>STOP</button>
        {/* <button onClick={() => setTime(5000)}>Reset</button>        */}
      </div>
    </div>
  );
};