import BotFocus from '@/services/enum/BotFocus'
import ResourceTrackBenefit from '@/services/enum/ResourceTrackBenefit'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import { expect } from 'chai'

describe('util/getResourceTrackBenefit', () => {
  it('getResourceTrackBenefit', () => {
    expect(getResourceTrackBenefit(BotFocus.TOWNSFOLK)).to.eq(ResourceTrackBenefit.TOWNSFOLK_CARD)
    expect(getResourceTrackBenefit(BotFocus.UPGRADE)).to.eq(ResourceTrackBenefit.INFLUENCE_YELLOW)
    expect(getResourceTrackBenefit(BotFocus.SPACE)).to.eq(ResourceTrackBenefit.COMET)
    expect(getResourceTrackBenefit(BotFocus.JOURNAL)).to.eq(ResourceTrackBenefit.INFLUENCE_BLACK)
  })
})
