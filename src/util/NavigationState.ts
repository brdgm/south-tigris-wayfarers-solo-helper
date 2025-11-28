import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import CardDeck from '@/services/CardDeck'

export default class NavigationState {

  readonly turn : number
  readonly action : number
  readonly cardDeck: CardDeck

  constructor(route: RouteLocation, state: State) {    
    this.turn = getIntRouteParam(route, 'turn')
    this.action = getIntRouteParam(route, 'action')
    this.cardDeck = CardDeck.new(state.setup.expansions)
  }

}
