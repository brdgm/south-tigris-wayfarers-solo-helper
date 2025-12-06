import Action from '@/services/enum/Action'
import BotFocus from '@/services/enum/BotFocus'

/**
 * Get the action to execute for the bot focus action.
 * @param botFocus Bot Focus
 * @returns Focus action
 */
export default function getBotFocusAction(botFocus : BotFocus) : Action {
  switch (botFocus) {
    case BotFocus.TOWNSFOLK:
      return Action.CARD_TOWNSFOLK
    case BotFocus.UPGRADE:
      return Action.UPGRADE_TILE
    case BotFocus.SPACE:
      return Action.CARD_SPACE
    case BotFocus.JOURNAL:
      return Action.JOURNAL
    default:
      throw new Error(`Invalid bot focus: ${botFocus}`)
  }
}
