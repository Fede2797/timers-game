
interface StartGameButtonProps {
    startGame: () => void;
}

export const StartGameButton = ({startGame}: StartGameButtonProps) => {
  return (
    <div className="relative group">
        <button 
            onClick={startGame}
            className="relative w-[150px] h-[50px] md:w-[250px] md:h-[90px] text-[20px] md:text-[32px] font-semibold bg-black text-white z-10 md:group-hover:-translate-x-2 md:group-hover:-translate-y-2 md:group-active:translate-x-0 md:group-active:translate-y-0 transition-all uppercase"
        >
            Start game
        </button>
        <div className='hidden md:block absolute w-[150px] h-[50px] md:w-[250px] md:h-[90px] top-[0px] left-[0px] bg-white border-[3px] border-black z-0'></div>
    </div>
  )
}
