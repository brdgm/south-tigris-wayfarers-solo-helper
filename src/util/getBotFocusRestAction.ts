import Action from '@/services/enum/Action'
import BotFocus from '@/services/enum/BotFocus'

/**
 * Get the bot focus-dependant action to execute when resting.
 * @param botFocus Bot Focus
 * @returns Rest action
 */
export default function getBotFocusRestAction(botFocus : BotFocus) : Action {
  switch (botFocus) {
    case BotFocus.TOWNSFOLK:
      return Action.CARD_TOWNSFOLK
    case BotFocus.UPGRADE:
      return Action.UPGRADE_TILE
    case BotFocus.SPACE:
      return Action.CARD_SPACE
    case BotFocus.JOURNAL:
      return Action.INFLUENCE_CARD
    default:
      throw new Error(`Invalid bot focus: ${botFocus}`)
  }
}
