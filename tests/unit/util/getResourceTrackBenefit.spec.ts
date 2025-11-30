import Benefit from '@/services/enum/Benefit'
import BotFocus from '@/services/enum/BotFocus'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import { expect } from 'chai'

describe('util/getResourceTrackBenefit', () => {
  it('getResourceTrackBenefit', () => {
    expect(getResourceTrackBenefit(BotFocus.TOWNSFOLK)).to.eq(Benefit.TOWNSFOLK_CARD)
    expect(getResourceTrackBenefit(BotFocus.UPGRADE)).to.eq(Benefit.INFLUENCE_YELLOW)
    expect(getResourceTrackBenefit(BotFocus.SPACE)).to.eq(Benefit.COMET)
    expect(getResourceTrackBenefit(BotFocus.JOURNAL)).to.eq(Benefit.INFLUENCE_BLACK)
  })
})
