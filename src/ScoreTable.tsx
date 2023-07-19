import { GameState } from "./types";

interface ScoreTableProps {
    gameState: GameState;
    residualTime: number;
}

export const ScoreTable = ({gameState, residualTime}: ScoreTableProps) => {
  return (
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
  )
}
