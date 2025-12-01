import Benefit from '@/services/enum/Benefit'
import BotFocus from '@/services/enum/BotFocus'

/**
 * Get benefit form resource track when moving from pos. 4 to 5.
 * @param resourceTrack Current resource track position
 * @param resourceTrackAdd Steps to add to resource track
 * @param botFocus Bot focus
 * @returns Resource track benefit or undefined if the position does not match
 */
export default function getResourceTrackBenefit(resourceTrack: number, resourceTrackAdd: number, botFocus : BotFocus) : Benefit|undefined {
  const newResourceTrack = (resourceTrack + resourceTrackAdd) % 8
  let oldResourceTrack = resourceTrack
  if (resourceTrack + resourceTrackAdd > 7) {
    oldResourceTrack = 0
  }
  if (oldResourceTrack < 5 && newResourceTrack >= 5) {
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
  else {
    return undefined
  }
}
