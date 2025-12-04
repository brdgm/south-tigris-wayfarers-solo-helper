import { BotResources } from '@/store/state'
import CardDeck from './CardDeck'
import Card, { CardAction } from './Card'
import BotFocus from './enum/BotFocus'
import Action from './enum/Action'
import getBotFocusAction from '@/util/getBotFocusAction'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import getBotFocusRestAction from '@/util/getBotFocusRestAction'
import SchemeCardColor from './enum/SchemeCardColor'
import { cloneDeep } from 'lodash'

/**
 * Bot actions derived from scheme card deck.
 */
export default class BotActions {

  public readonly actionChoices : ActionChoice[]
  public readonly restActions : CardAction[]
  public readonly benefit? : CardAction
  public readonly newBotResources : BotResources
  public readonly isRest : boolean
  public readonly colorMajority : SchemeCardColor

  private constructor(actionChoices : ActionChoice[], restActions : CardAction[], benefit : CardAction|undefined,
      newBotResources : BotResources, colorMajority : SchemeCardColor) {
    this.actionChoices = actionChoices
    this.restActions = restActions
    this.benefit = benefit
    this.newBotResources = newBotResources
    this.isRest = restActions.length > 0
    this.colorMajority = colorMajority
  }

  public static drawCard(cardDeck : CardDeck, botResources : BotResources, botFocus : BotFocus) : BotActions {

    if (cardDeck.isRest) {
      // resting
      let benefit : CardAction|undefined = undefined
      if (cardDeck.currentCard?.comet) {
        benefit = { action: Action.COMET }
      }
      const colorMajority = cardDeck.colorMajority
      cardDeck.shuffle()
      const restActions = [
        { action: getBotFocusRestAction(botFocus) },
        { action: Action.JOURNAL }
      ]
      return new BotActions([], restActions, benefit, {
        resourceTrack: botResources.resourceTrack,
        cometTrack: getNewCometTrack(botResources, benefit)
      }, colorMajority)
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

      // derive actions from card(s)
      const actionChoices : ActionChoice[] = cards.map(card => {
        const actions : CardAction[] = []
        for (const action of card.actions) {
          actions.push(...mapActions(action, botFocus))
        }
        return { actions }
      })

      // resource track advancements
      const advanceSteps = lastCard.silverValue
      const oldResourceTrack = botResources.resourceTrack
      let newResourceTrack = oldResourceTrack + advanceSteps

      // benefits from resource track and drawn card
      let benefit : CardAction|undefined = undefined
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
      }, cardDeck.colorMajority)
    }
  }

}

export interface ActionChoice {
  actions: CardAction[]
}

function mapActions(action : CardAction, botFocus : BotFocus) : CardAction[] {
  if (action.action == Action.FOCUS) {
    // replace focus action with actual action depending on bot focus
    return [{ action: getBotFocusAction(botFocus) }]
  }
  if (action.action == Action.WORKER && action.workerColors) {
    // replace alternative worker colors with individual actions
    return action.workerColors.map(color => {
      const workerAction = cloneDeep(action)
      workerAction.workerColors = [color]
      return workerAction
    })
  }
  return [action]
}

function getNewCometTrack(botResources: BotResources, benefit?: CardAction) : number {
  return botResources.cometTrack + (benefit?.action == Action.COMET ? 1 : 0)
}
