import { CardAction } from '@/services/Card'
import Action from '@/services/enum/Action'
import { BotResources } from '@/store/state'

/**
 * Count cards gained by bot and update card counts.
 * @param botResources Bot resources
 * @param actions Card actions
 * @returns New bot resources
 */
export default function addCardCount(botResources: BotResources, actions: CardAction[]) : BotResources {
  let { townsfolkCards, landCards, waterCards, spaceCards, inspirationCards } = botResources
  townsfolkCards += countCards(actions, Action.CARD_TOWNSFOLK)
  landCards += countCards(actions, Action.CARD_LAND)
  waterCards += countCards(actions, Action.CARD_WATER)
  spaceCards += countCards(actions, Action.CARD_SPACE)
  inspirationCards += countCards(actions, Action.CARD_INSPIRATION)
  return {
    resourceTrack: botResources.resourceTrack,
    cometTrack: botResources.cometTrack,
    townsfolkCards,
    landCards,
    waterCards,
    spaceCards,
    inspirationCards
  }
}

function countCards(actions: CardAction[], actionType: Action) : number {
  return actions.filter(action => action.action == actionType).length
}
