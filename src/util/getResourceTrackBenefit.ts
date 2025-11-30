import Benefit from '@/services/enum/Benefit'
import BotFocus from '@/services/enum/BotFocus'

/**
 * Get benefit form resource track when moving from pos. 4 to 5.
 * @param botFocus Bot focus
 * @returns Resource track benefit
 */
export default function getResourceTrackBenefit(botFocus : BotFocus) : Benefit {
  switch (botFocus) {
    case BotFocus.TOWNSFOLK:
      return Benefit.TOWNSFOLK_CARD
    case BotFocus.UPGRADE:
      return Benefit.INFLUENCE_YELLOW
    case BotFocus.SPACE:
      return Benefit.COMET
    case BotFocus.JOURNAL:
      return Benefit.INFLUENCE_BLACK
    default:
      throw new Error(`Invalid bot focus: ${botFocus}`)
  }
}
