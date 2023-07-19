import { Difficulty, GameState } from "./types"

interface DifficultyButtonsProps {
  gameState: GameState;
  setDifficulty: (d: Difficulty) => void;
}

export const DifficultyButtons = ({gameState, setDifficulty}: DifficultyButtonsProps) => {
  return (
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
  )
}
