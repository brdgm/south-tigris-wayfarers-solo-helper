import { BotPersistence, BotResources, State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import CardDeck from '@/services/CardDeck'
import Player from '@/services/enum/Player'
import BotActions from '@/services/BotActions'
import Card from '@/services/Card'

export default class NavigationState {

  readonly turn : number
  readonly player : Player
  readonly actionChoice : number
  readonly action : number
  readonly cardDeck: CardDeck
  readonly botActions? : BotActions
  readonly currentCard? : Card
  readonly botResources : BotResources

  constructor(route: RouteLocation, state: State) {    
    this.turn = getIntRouteParam(route, 'turn')
    this.player = (route.name == 'TurnBot') ? Player.BOT : Player.PLAYER
    this.actionChoice = getIntRouteParam(route, 'actionChoice')
    this.action = getIntRouteParam(route, 'action')

    const lastTurn = (route.name == 'GameEnd')
    const botPersistence = getBotPersistence(state, this.turn, lastTurn)
    this.cardDeck = CardDeck.fromPersistence(botPersistence.cardDeck)

    if (this.player == Player.BOT) {
      console.log('draw card ' + route.name?.toString())
      let currentCard
      if (this.cardDeck.isRest) {
        currentCard = this.cardDeck.currentCard
      }
      this.botActions = BotActions.drawCard(this.cardDeck, botPersistence.botResources, state.setup.botFocus)
      if (!this.botActions.isRest) {
        currentCard = this.cardDeck.currentCard
      }
      this.currentCard = currentCard
      this.botResources = this.botActions.newBotResources
    }
    else {
      this.botResources = botPersistence.botResources
    }
  }

}

function getBotPersistence(state: State, turn: number, lastTurn: boolean) : BotPersistence {
  return getLastBotPersistence(state, turn, lastTurn)
    ?? {
      cardDeck: state.setup.initialCardDeck ?? CardDeck.new(state.setup.expansions).toPersistence(),
      botResources: {
        resourceTrack: 0,
        cometTrack: 0
      }
    }
}

function getLastBotPersistence(state: State, turn: number, lastTurn: boolean) : BotPersistence | undefined {
  return state.turns
      .toSorted((item1,item2) => item1.turn - item2.turn)
      .findLast(item => (item.turn < turn) || lastTurn)?.botPersistence
}
