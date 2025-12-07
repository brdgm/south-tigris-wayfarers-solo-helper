import { CardAction } from '@/services/Card'
import Action from '@/services/enum/Action'
import BotFocus from '@/services/enum/BotFocus'
import Guild from '@/services/enum/Guild'

/**
 * Get benefit form resource track when moving from pos. 4 to 5.
 * @param resourceTrack Current resource track position
 * @param resourceTrackAdd Steps to add to resource track
 * @param botFocus Bot focus
 * @returns Resource track benefit or undefined if the position does not match
 */
export default function getResourceTrackBenefit(resourceTrack: number, resourceTrackAdd: number, botFocus : BotFocus) : CardAction|undefined {
  const oldReachedCount = getBenefitReachedCount(resourceTrack)
  const newReachedCount = getBenefitReachedCount(resourceTrack + resourceTrackAdd)
  if (newReachedCount > oldReachedCount) {
    switch (botFocus) {
      case BotFocus.TOWNSFOLK:
        return { action: Action.CARD_TOWNSFOLK }
      case BotFocus.UPGRADE:
        return { action: Action.INFLUENCE, influenceBonus: [Guild.YELLOW] }
      case BotFocus.SPACE:
        return { action: Action.COMET }
      case BotFocus.JOURNAL:
        return { action: Action.INFLUENCE, influenceBonus: [Guild.BLACK] }
      default:
        throw new Error(`Invalid bot focus: ${botFocus}`)
    }
  }
  else {
    return undefined
  }
}

function getBenefitReachedCount(resourceTrack: number) : number {
  const wrapOverCount = Math.floor(resourceTrack / 8)
  const reached = (resourceTrack % 8) >= 5
  return wrapOverCount + (reached ? 1 : 0)
}
