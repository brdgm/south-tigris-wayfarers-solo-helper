import Cards from '@/services/Cards'
import Expansion from '@/services/enum/Expansion'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get(1)

    expect(card).not.undefined
    expect(card?.id).to.eq(1)
  })

  it('getAll', () => {
    expect(Cards.getAll([]).length).to.eq(6)
    expect(Cards.getAll([Expansion.TIDES_OF_TRADE]).length).to.eq(7)
  })
})
