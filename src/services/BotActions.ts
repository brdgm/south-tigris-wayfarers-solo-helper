import { BotResources } from '@/store/state'
import CardDeck from './CardDeck'
import Card, { CardAction } from './Card'
import BotFocus from './enum/BotFocus'
import Action from './enum/Action'
import Benefit from './enum/Benefit'
import getBotFocusAction from '@/util/getBotFocusAction'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'

/**
 * Bot actions derived from scheme card deck.
 */
export default class BotActions {

  public readonly actions : ActionChoice[]
  public readonly benefits : Benefit[]
  public readonly newBotResources : BotResources

  private constructor(actions : ActionChoice[], benefits : Benefit[], newBotResources : BotResources) {
    this.actions = actions
    this.benefits = benefits
    this.newBotResources = newBotResources
  }

  public static drawCard(cardDeck : CardDeck, botResources : BotResources, botFocus : BotFocus) : BotActions {
    const cards : Card[] = []
    const benefits : Benefit[] = []

    // draw card
    let lastCard = cardDeck.draw()
    cards.push(lastCard)

    // draw another card as actual card if the card was from the tides of trade expansion
    if (lastCard.drawNextCard) {
      lastCard = cardDeck.draw()
      cards.push(lastCard)
    }

    // derive actions from card(s), replacing focus actions with actual actions
    const actions : ActionChoice[] = cards.map(card => ({ actions: card.actions.map(action => mapAction(action, botFocus)) }))

    // resource track advancements
    const advanceSteps = lastCard.silverValue
    const oldResourceTrack = botResources.resourceTrack
    let newResourceTrack = oldResourceTrack + advanceSteps

    // benefits from resource track and drawn card
    const resourceTrackBenefit = getResourceTrackBenefit(oldResourceTrack, advanceSteps, botFocus)
    if (resourceTrackBenefit) {
      benefits.push(resourceTrackBenefit)
    }
    const newCometTrack = botResources.cometTrack
        + benefits.filter(benefit => benefit == Benefit.COMET).length
    
    if (newResourceTrack > 7) {
      newResourceTrack -= 8
    }

    return new BotActions(actions, benefits, {
      resourceTrack: newResourceTrack,
      cometTrack: newCometTrack
    })
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
