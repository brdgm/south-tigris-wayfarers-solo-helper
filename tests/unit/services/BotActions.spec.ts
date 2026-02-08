import BotActions from '@/services/BotActions'
import CardDeck from '@/services/CardDeck'
import Action from '@/services/enum/Action'
import BotFocus from '@/services/enum/BotFocus'
import Color from '@/services/enum/Color'
import Guild from '@/services/enum/Guild'
import { expect } from 'chai'
import mockBotResources from '../helper/mockBotResources'

describe('services/BotActions', () => {
  it('card-1', () => {
    const deck = CardDeck.fromPersistence({pile: [1,7,2,5,6,3], discard: [4]})
    const underTest = BotActions.drawCard(deck, mockBotResources({resourceTrack: 0, cometTrack: 0}), BotFocus.JOURNAL)

    expect(underTest.actions).to.eql([
      { action: Action.WORKER, color: Color.GREEN },
      { action: Action.JOURNAL }
    ])
    expect(underTest.restActions).to.eql([])
    expect(underTest.benefit).to.undefined
    expect(underTest.newBotResources).to.eql(mockBotResources({resourceTrack: 2, cometTrack: 0}))
    expect(underTest.isRest).to.be.false
    expect(underTest.botHasAnotherTurn).to.be.false
  })

  it('card-7-botHasAnotherTurn', () => {
    const deck = CardDeck.fromPersistence({pile: [7,2,5,6,3], discard: [1,4]})
    const underTest = BotActions.drawCard(deck, mockBotResources({resourceTrack: 0, cometTrack: 2}), BotFocus.JOURNAL)

    expect(underTest.actions).to.eql([
      { action: Action.CARD_INSPIRATION, influenceCost: [Guild.RED,Guild.RED] },
      { action: Action.UPGRADE_TILE_WORKER, influenceBonus: [Guild.RED,Guild.RED,Guild.RED] }
    ])
    expect(underTest.restActions).to.eql([])
    expect(underTest.benefit).to.undefined
    expect(underTest.newBotResources).to.eql(mockBotResources({resourceTrack: 1, cometTrack: 2}))
    expect(underTest.isRest).to.be.false
    expect(underTest.botHasAnotherTurn).to.be.true
  })

  it('card-5-resourceTrackBenefit', () => {
    const deck = CardDeck.fromPersistence({pile: [5,6,3], discard: []})
    const underTest = BotActions.drawCard(deck, mockBotResources({resourceTrack: 3, cometTrack: 0}), BotFocus.JOURNAL)

    expect(underTest.actions).to.eql([
      { action: Action.CARD_SPACE, influenceCost: [Guild.BLACK,Guild.BLACK] },
      { action: Action.CARD_TOWNSFOLK, influenceBonus: [Guild.BLACK] }
    ])
    expect(underTest.restActions).to.eql([])
    expect(underTest.benefit).to.eql({ action: Action.INFLUENCE, influenceBonus: [Guild.BLACK] })
    expect(underTest.newBotResources).to.eql(mockBotResources({resourceTrack: 5, cometTrack: 0}))
    expect(underTest.isRest).to.be.false
    expect(underTest.botHasAnotherTurn).to.be.false
  })

  it('card-1-wrap-over', () => {
    const deck = CardDeck.fromPersistence({pile: [1,7,2,5,6,3], discard: [4]})
    const underTest = BotActions.drawCard(deck, mockBotResources({resourceTrack: 6, cometTrack: 0}), BotFocus.JOURNAL)

    expect(underTest.actions).to.eql([
      { action: Action.WORKER, color: Color.GREEN },
      { action: Action.JOURNAL }
    ])
    expect(underTest.restActions).to.eql([])
    expect(underTest.benefit).to.undefined
    expect(underTest.newBotResources).to.eql(mockBotResources({resourceTrack: 0, cometTrack: 0}))
    expect(underTest.isRest).to.be.false
    expect(underTest.botHasAnotherTurn).to.be.false
  })

  it('rest', () => {
    const deck = CardDeck.fromPersistence({pile: [4,6], discard: [2,5,1,3]})
    const underTest = BotActions.drawCard(deck, mockBotResources({resourceTrack: 6, cometTrack: 2}), BotFocus.JOURNAL)

    expect(underTest.actions).to.eql([])
    expect(underTest.restActions).to.eql([
      { action: Action.INFLUENCE_CARD },
      { action: Action.JOURNAL }
    ])
    expect(underTest.benefit).to.eql({ action: Action.COMET })
    expect(underTest.newBotResources).to.eql(mockBotResources({resourceTrack: 6, cometTrack: 3}))
    expect(underTest.isRest).to.be.true
    expect(underTest.botHasAnotherTurn).to.be.false
  })
})
