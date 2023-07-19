import { Stopwatch } from './Stopwatch';
import { Difficulty, GameState } from './types';

interface stopWatchProps {
    residualTime: number;
    setResidualTime: (t: number) => void;
    gameState: GameState;
    setGameState: (s: GameState) => void;
    timersRunning: number;
    setTimersRunning: (n: number) => void;
    difficulty: Difficulty;
    clocksTimers: number[];
  }

export const StopwatchGrid = (props: stopWatchProps) => {
  return (
    <div className="mt-8 mb-10 grid grid-cols-2 gap-10 md:mt-6 md:mb-10">
    {
        props.clocksTimers.map( time => (
        <Stopwatch key={time} timerTime={time} residualTime={props.residualTime} setResidualTime={props.setResidualTime} gameState={props.gameState} setGameState={props.setGameState} timersRunning={props.timersRunning} setTimersRunning={props.setTimersRunning} difficulty={props.difficulty}/>
        ))
    }
    </div>
  )
}
