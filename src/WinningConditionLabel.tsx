import { WinCondition } from "./types"

interface WinningConditionLabelProps {
    winCondition: WinCondition
}

export const WinningConditionLabel = ({winCondition}: WinningConditionLabelProps) => {
  return (
    <div className="mt-2 mb-4 text-[15px] md:text-[24px]">
        <span>Total score must be less than or equal to
        <span> 00:</span>
        <span>{("0" + Math.floor((winCondition / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((winCondition / 10) % 100)).slice(-2)} </span>
            to win</span>
    </div>
  )
}
