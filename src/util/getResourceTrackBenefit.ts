import BotFocus from '@/services/enum/BotFocus'
import ResourceTrackBenefit from '@/services/enum/ResourceTrackBenefit'

/**
 * Get benefit form resource track when moving from pos. 4 to 5.
 * @param resourceTrack Resource track position
 * @returns Resource track benefit
 */
export default function getResourceTrackBenefit(botFocus : BotFocus) : ResourceTrackBenefit {
  switch (botFocus) {
    case BotFocus.TOWNSFOLK:
      return ResourceTrackBenefit.TOWNSFOLK_CARD
    case BotFocus.UPGRADE:
      return ResourceTrackBenefit.INFLUENCE_YELLOW
    case BotFocus.SPACE:
      return ResourceTrackBenefit.COMET
    case BotFocus.JOURNAL:
      return ResourceTrackBenefit.INFLUENCE_BLACK
    default:
      throw new Error(`Invalid bot focus: ${botFocus}`)
  }
}
