import { BotResources } from '@/store/state'
import CardDeck from './CardDeck'
import Card, { CardAction } from './Card'
import BotFocus from './enum/BotFocus'
import Action from './enum/Action'
import Benefit from './enum/Benefit'
import getBotFocusAction from '@/util/getBotFocusAction'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import getBotFocusRestAction from '@/util/getBotFocusRestAction'

/**
 * Bot actions derived from scheme card deck.
 */
export default class BotActions {

  public readonly actionChoices : ActionChoice[]
  public readonly restActions : CardAction[]
  public readonly benefit? : Benefit
  public readonly newBotResources : BotResources
  public readonly isRest : boolean

  private constructor(actionChoices : ActionChoice[], restActions : CardAction[], benefit : Benefit|undefined, newBotResources : BotResources) {
    this.actionChoices = actionChoices
    this.restActions = restActions
    this.benefit = benefit
    this.newBotResources = newBotResources
    this.isRest = restActions.length > 0
  }

  public static drawCard(cardDeck : CardDeck, botResources : BotResources, botFocus : BotFocus) : BotActions {

    if (cardDeck.isRest) {
      // resting
      let benefit : Benefit|undefined = undefined
      if (cardDeck.currentCard?.comet) {
        benefit = Benefit.COMET
      }
      cardDeck.shuffle()
      const restActions = [
        { action: getBotFocusRestAction(botFocus) },
        { action: Action.JOURNAL }
      ]
      return new BotActions([], restActions, benefit, {
        resourceTrack: botResources.resourceTrack,
        cometTrack: getNewCometTrack(botResources, benefit)
      })
    }
    else {
      // draw card
      const cards : Card[] = []
      let lastCard = cardDeck.draw()
      cards.push(lastCard)

      // draw another card as actual card if the card was from the tides of trade expansion
      if (lastCard.drawNextCard) {
        lastCard = cardDeck.draw()
        cards.push(lastCard)
      }

      // derive actions from card(s), replacing focus actions with actual actions
      const actionChoices = cards.map(card => ({ actions: card.actions.map(action => mapAction(action, botFocus)) }))

      // resource track advancements
      const advanceSteps = lastCard.silverValue
      const oldResourceTrack = botResources.resourceTrack
      let newResourceTrack = oldResourceTrack + advanceSteps

      // benefits from resource track and drawn card
      let benefit : Benefit|undefined = undefined
      const resourceTrackBenefit = getResourceTrackBenefit(oldResourceTrack, advanceSteps, botFocus)
      if (resourceTrackBenefit) {
        benefit = resourceTrackBenefit
      }
      
      if (newResourceTrack > 7) {
        newResourceTrack -= 8
      }

      return new BotActions(actionChoices, [], benefit, {
        resourceTrack: newResourceTrack,
        cometTrack: getNewCometTrack(botResources, benefit)
      })
    }
  }

}

export interface ActionChoice {
  actions: CardAction[]
}

function mapAction(action : CardAction, botFocus : BotFocus) : CardAction {
  if (action.action == Action.FOCUS) {
    return { action: getBotFocusAction(botFocus) }
  }
  return action
}

function getNewCometTrack(botResources: BotResources, benefit?: Benefit) : number {
  return botResources.cometTrack + (benefit == Benefit.COMET ? 1 : 0)
}
