import BotActions from '@/services/BotActions'
import CardDeck from '@/services/CardDeck'
import Action from '@/services/enum/Action'
import Benefit from '@/services/enum/Benefit'
import BotFocus from '@/services/enum/BotFocus'
import { expect } from 'chai'

describe('services/BotActions', () => {
  it('card-1', () => {
    const deck = CardDeck.fromPersistence({pile: [1,7,2,5,6,3], discard: [4]})
    const underTest = BotActions.drawCard(deck, {resourceTrack: 0, cometTrack: 0}, BotFocus.JOURNAL)

    expect(underTest.actions).to.eql([
      { actions: [Action.WORKER_GREEN, Action.JOURNAL] }
    ])
    expect(underTest.benefits).to.eql([])
    expect(underTest.newBotResources).to.eql({resourceTrack: 2, cometTrack: 0})
  })

  it('card-7-2', () => {
    const deck = CardDeck.fromPersistence({pile: [7,2,5,6,3], discard: [1,4]})
    const underTest = BotActions.drawCard(deck, {resourceTrack: 0, cometTrack: 2}, BotFocus.JOURNAL)

    expect(underTest.actions).to.eql([
      { actions: [Action.CARD_INSPIRATION_SPEND_INFLUENCE_RED, Action.WORKER_UPGRADE_TILE_PLACE_INFLUENCE_RED] },
      { actions: [Action.WORKER_GREEN_OR_BLUE, Action.PLACE_INFLUENCE_BLUE_GREEN_BLACK] }
    ])
    expect(underTest.benefits).to.eql([Benefit.COMET])
    expect(underTest.newBotResources).to.eql({resourceTrack: 0, cometTrack: 3})
  })

  it('card-5-resourceTrackBenefit', () => {
    const deck = CardDeck.fromPersistence({pile: [5,6,3], discard: []})
    const underTest = BotActions.drawCard(deck, {resourceTrack: 3, cometTrack: 0}, BotFocus.JOURNAL)

    expect(underTest.actions).to.eql([
      { actions: [Action.CARD_SPACE_SPEND_INFLUENCE_BLACK, Action.PLACE_INFLUENCE_BLACK_TOWNSFOLK_CARD] }
    ])
    expect(underTest.benefits).to.eql([Benefit.INFLUENCE_BLACK])
    expect(underTest.newBotResources).to.eql({resourceTrack: 5, cometTrack: 0})
  })

  it('card-1-wrap-over', () => {
    const deck = CardDeck.fromPersistence({pile: [1,7,2,5,6,3], discard: [4]})
    const underTest = BotActions.drawCard(deck, {resourceTrack: 6, cometTrack: 0}, BotFocus.JOURNAL)

    expect(underTest.actions).to.eql([
      { actions: [Action.WORKER_GREEN, Action.JOURNAL] }
    ])
    expect(underTest.benefits).to.eql([])
    expect(underTest.newBotResources).to.eql({resourceTrack: 0, cometTrack: 0})
  })
})
