import { expect } from 'chai'
import mockBotResources from '../helper/mockBotResources'
import getCardVP from '@/util/getCardVP'

describe('util/getCardVP', () => {
  it('getCardVP', () => {
    expect(getCardVP(mockBotResources({
      townsfolkCards: 3,
      landCards: 2,
      waterCards: 4,
      spaceCards: 1,
      inspirationCards: 5
    }))).to.eql({
      townsfolk: 3,
      land: 4,
      water: 8,
      space: 3,
      inspiration: 20,
      total: 38
    })
  })
})
