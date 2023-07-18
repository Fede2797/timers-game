import { useEffect, useState, useRef } from 'react';
import { GameState, Difficulty } from './types';

interface stopWatchProps {
  timerTime: number;
  residualTime: number;
  setResidualTime: (t: number) => void;
  gameState: GameState;
  setGameState: (s: GameState) => void;
  timersRunning: number;
  setTimersRunning: (n: number) => void;
  difficulty: Difficulty;
}

export const Stopwatch = ({timerTime, residualTime, setResidualTime, gameState, setGameState, timersRunning, setTimersRunning, difficulty}: stopWatchProps) => {

  const [time, setTime] = useState(timerTime);
  const [running, setRunning] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const timerAnimation = useRef('animate-[timer_5s_linear_both]');
  const colSpanCondition = useRef((difficulty === Difficulty.Easy || difficulty === Difficulty.Hard) && timerTime === 5000);

  useEffect(() => {
    colSpanCondition.current = ((difficulty === Difficulty.Easy || difficulty === Difficulty.Hard) && timerTime === 5000);
    console.log(colSpanCondition.current);
  }, [difficulty])
  

  useEffect(() => {
    switch (timerTime) {
      case 5000:
        timerAnimation.current = 'animate-[timer_5s_linear_both]'
        break;
      case 6000:
        timerAnimation.current = 'animate-[timer_6s_linear_both]'
        break;
      case 7000:
        timerAnimation.current = 'animate-[timer_7s_linear_both]'
        break;
      case 8000:
        timerAnimation.current = 'animate-[timer_8s_linear_both]'
        break;
    
      default:
        break;
    }
  }, [timerTime])

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
    if (gameState !== GameState.Running) setRunning(false)
  }, [gameState])
  

  useEffect(() => {
    if ( time > 0 ) return;
    setRunning(false);
    setGameState(GameState.Lose)
    setTime(0)
  }, [time])

  useEffect(() => {
    if ( gameState === GameState.Running ) {
      setTime(timerTime)
      setRunning(true)
      resetAnimation()
    }

  }, [gameState])

  const stopTimer = () => {
    if (time === 0 || gameState !== GameState.Running || !running) return;
    setRunning(false)
    setResidualTime( residualTime + time )
    setTimersRunning( timersRunning - 1 )
  }

  const resetAnimation = () => {
    setAnimationKey(animationKey + 1);
  }

  return (
    <div 
      className={`relative w-[130px] h-[130px]  m-auto flex flex-col justify-center items-center border-4 border-white rounded-full text-[20px] text-white font-semibold ${ colSpanCondition.current ? 'col-span-2' : '' } md:w-[200px] md:h-[200px] md:text-[32px]`}
      onClick={() => stopTimer()}
    >
      {/* White rolling ball */}
      <div key={animationKey} className={`absolute right-[-4px] top-[-4px] w-[130px] h-[130px] aspect-[1/1] after:right-[-9px] after:top-[53px] md:w-[200px] md:h-[200px] after:absolute after:w-6 after:h-6 after:bg-white after:rounded-full md:after:right-[-9px] md:after:top-[88px] ${ running ? timerAnimation.current : timerAnimation.current + ' pause'}`}></div>
      <div className="min-w-[78px] md:min-w-[125px]">
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