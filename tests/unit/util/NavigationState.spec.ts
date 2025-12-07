import { expect } from 'chai'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import mockTurn from '../helper/mockTurn'
import mockCardDeck from '../helper/mockCardDeck'
import { RouteParams } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import Player from '@/services/enum/Player'
import mockBotPersistence from '../helper/mockBotPersistence'
import BotFocus from '@/services/enum/BotFocus'

const state = mockState({botFocus:BotFocus.TOWNSFOLK,
  initialCardDeck:mockCardDeck({pile:[1,2,3,4]}).toPersistence(),
  turns:[
    mockTurn({turn:1, player:Player.PLAYER, botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[1,2,3,4]})})}),
    mockTurn({turn:2, player:Player.BOT, botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[2,3,4],discard:[1]}), resourceTrack:2, cometTrack:1})}),
    mockTurn({turn:3, player:Player.PLAYER, botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[2,3,4],discard:[1]}), resourceTrack:2, cometTrack:1})}),
    mockTurn({turn:4, player:Player.BOT, botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[3,4],discard:[2,1]}), resourceTrack:2, cometTrack:1})}),
  ]})

describe('util/NavigationState', () => {
  it('turn-1', () => {
    const underTest = navigationState('TurnPlayer', {turn:'1'})
    expect(underTest.turn).to.equal(1)
    expect(underTest.cardDeck.currentCard?.id).to.undefined
    expect(underTest.botResources.resourceTrack).to.eq(0)
    expect(underTest.botResources.cometTrack).to.eq(0)
  })

  it('turn-2', () => {
    const underTest = navigationState('TurnBot', {turn:'2'})
    expect(underTest.turn).to.equal(2)
    expect(underTest.cardDeck.currentCard?.id).to.eq(1)
    expect(underTest.botResources.resourceTrack).to.eq(2)
    expect(underTest.botResources.cometTrack).to.eq(0)
  })

  it('turn-3', () => {
    const underTest = navigationState('TurnPlayer', {turn:'3'})
    expect(underTest.turn).to.equal(3)
    expect(underTest.cardDeck.currentCard?.id).to.eq(1)
    expect(underTest.botResources.resourceTrack).to.eq(2)
    expect(underTest.botResources.cometTrack).to.eq(1)
  })

  it('turn-4', () => {
    const underTest = navigationState('TurnBot', {turn:'4'})
    expect(underTest.turn).to.equal(4)
    expect(underTest.cardDeck.currentCard?.id).to.eq(2)
    expect(underTest.botResources.resourceTrack).to.eq(2)
    expect(underTest.botResources.cometTrack).to.eq(1)
  })
})

function navigationState(routeName:string, params:RouteParams) : NavigationState {
  return new NavigationState(mockRouteLocation({name:routeName, params}), state)
}
