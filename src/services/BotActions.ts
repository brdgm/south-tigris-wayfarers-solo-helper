import { BotResources } from '@/store/state'
import CardDeck from './CardDeck'
import { CardAction } from './Card'
import BotFocus from './enum/BotFocus'
import Action from './enum/Action'
import getBotFocusAction from '@/util/getBotFocusAction'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import getBotFocusRestAction from '@/util/getBotFocusRestAction'
import SchemeCardColor from './enum/SchemeCardColor'
import { cloneDeep } from 'lodash'
import addComets from '@/util/addComets'
import addResourceTrack from '@/util/addResourceTrack'

/**
 * Bot actions derived from scheme card deck.
 */
export default class BotActions {

  public readonly actions : CardAction[]
  public readonly restActions : CardAction[]
  public readonly benefit? : CardAction
  public readonly newBotResources : BotResources
  public readonly colorMajority : SchemeCardColor
  public readonly silverValueSum : number
  public readonly botHasAnotherTurn : boolean
  public readonly isRest : boolean

  private constructor(actions : CardAction[], restActions : CardAction[], benefit : CardAction|undefined,
      newBotResources : BotResources, colorMajority : SchemeCardColor, silverValueSum : number, botHasAnotherTurn : boolean) {
    this.actions = actions
    this.restActions = restActions
    this.benefit = benefit
    this.newBotResources = newBotResources
    this.colorMajority = colorMajority
    this.silverValueSum = silverValueSum
    this.botHasAnotherTurn = botHasAnotherTurn
    this.isRest = restActions.length > 0
  }

  public static drawCard(cardDeck : CardDeck, botResources : BotResources, botFocus : BotFocus) : BotActions {

    if (cardDeck.isRest) {
      // resting
      let benefit : CardAction|undefined = undefined
      if (cardDeck.currentCard?.comet) {
        benefit = { action: Action.COMET }
      }
      const colorMajority = cardDeck.colorMajority
      const silverValueSum = cardDeck.silverValueSum
      cardDeck.shuffle()
      const restActions = [
        { action: getBotFocusRestAction(botFocus) },
        { action: Action.JOURNAL }
      ]
      const newBotResources = addComets(botResources, benefit?.action == Action.COMET ? 1 : 0)
      return new BotActions([], restActions, benefit, newBotResources, colorMajority, silverValueSum, false)
    }
    else {
      // draw card
      const card = cardDeck.draw()

      // derive actions from card(s)
      const actions : CardAction[] = []
      for (const action of card.actions) {
        actions.push(...mapActions(action, botFocus))
      }

      // resource track advancements
      const resourceTrackAdvanceSteps = card.silverValue
      const oldResourceTrack = botResources.resourceTrack

      // benefits from resource track and drawn card
      let benefit : CardAction|undefined = undefined
      const resourceTrackBenefit = getResourceTrackBenefit(oldResourceTrack, resourceTrackAdvanceSteps, botFocus)
      if (resourceTrackBenefit) {
        benefit = resourceTrackBenefit
      }
      
      const newBotResources = addResourceTrack(addComets(botResources, benefit?.action == Action.COMET ? 1 : 0), resourceTrackAdvanceSteps)
      const botHasAnotherTurn = card.drawNextCard ?? false
      return new BotActions(actions, [], benefit, newBotResources, cardDeck.colorMajority, cardDeck.silverValueSum, botHasAnotherTurn)
    }
  }

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
      delete workerAction.workerColors
      workerAction.color = color
      return workerAction
    })
  }
  return [action]
}
