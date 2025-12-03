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
  const newResourceTrack = (resourceTrack + resourceTrackAdd) % 8
  let oldResourceTrack = resourceTrack
  if (resourceTrack + resourceTrackAdd > 7) {
    oldResourceTrack = 0
  }
  if (oldResourceTrack < 5 && newResourceTrack >= 5) {
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
