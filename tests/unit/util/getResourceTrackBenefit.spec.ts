import Benefit from '@/services/enum/Benefit'
import BotFocus from '@/services/enum/BotFocus'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import { expect } from 'chai'

describe('util/getResourceTrackBenefit', () => {
  it('getResourceTrackBenefit', () => {
    expect(getResourceTrackBenefit(4,1,BotFocus.TOWNSFOLK)).to.eq(Benefit.TOWNSFOLK_CARD)
    expect(getResourceTrackBenefit(4,1,BotFocus.UPGRADE)).to.eq(Benefit.INFLUENCE_YELLOW)
    expect(getResourceTrackBenefit(4,1,BotFocus.SPACE)).to.eq(Benefit.COMET)
    expect(getResourceTrackBenefit(4,1,BotFocus.JOURNAL)).to.eq(Benefit.INFLUENCE_BLACK)
    expect(getResourceTrackBenefit(3,1,BotFocus.TOWNSFOLK)).to.undefined
  })

  it('getResourceTrackBenefit-wrap-over', () => {
    expect(getResourceTrackBenefit(6,7,BotFocus.TOWNSFOLK)).to.eq(Benefit.TOWNSFOLK_CARD)
  })
})
