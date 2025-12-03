import Action from '@/services/enum/Action'
import BotFocus from '@/services/enum/BotFocus'
import Guild from '@/services/enum/Guild'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import { expect } from 'chai'

describe('util/getResourceTrackBenefit', () => {
  it('getResourceTrackBenefit', () => {
    expect(getResourceTrackBenefit(4,1,BotFocus.TOWNSFOLK)).to.eql({ action: Action.CARD_TOWNSFOLK })
    expect(getResourceTrackBenefit(4,1,BotFocus.UPGRADE)).to.eql({ action: Action.INFLUENCE, influenceBonus: [Guild.YELLOW] })
    expect(getResourceTrackBenefit(4,1,BotFocus.SPACE)).to.eql({ action: Action.COMET })
    expect(getResourceTrackBenefit(4,1,BotFocus.JOURNAL)).to.eql({ action: Action.INFLUENCE, influenceBonus: [Guild.BLACK] })
    expect(getResourceTrackBenefit(3,1,BotFocus.TOWNSFOLK)).to.undefined
  })

  it('getResourceTrackBenefit-wrap-over', () => {
    expect(getResourceTrackBenefit(6,7,BotFocus.TOWNSFOLK)).to.eql({ action: Action.CARD_TOWNSFOLK })
  })
})
