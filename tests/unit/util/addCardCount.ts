import { expect } from 'chai'
import mockBotResources from '../helper/mockBotResources'
import addCardCount from '@/util/addCardCount'
import Action from '@/services/enum/Action'

describe('util/addCardCount', () => {
  it('addCardCount', () => {
    expect(addCardCount(mockBotResources({}), [
      { action: Action.CARD_TOWNSFOLK },
      { action: Action.CARD_TOWNSFOLK },
      { action: Action.CARD_LAND },
      { action: Action.CARD_LAND },
      { action: Action.CARD_LAND },
      { action: Action.CARD_SPACE },
      { action: Action.CARD_INSPIRATION },
      { action: Action.CARD_WATER},
      { action: Action.CARD_WATER },
    ])).to.eql(mockBotResources({
      townsfolkCards: 2,
      landCards: 3,
      waterCards: 2,
      spaceCards: 1,
      inspirationCards: 1
    }))
  })

  it('addCardCount-empty', () => {
    expect(addCardCount(mockBotResources({resourceTrack: 3, cometTrack:2}), [])).to.eql(mockBotResources({resourceTrack: 3, cometTrack:2}))
  })
})
