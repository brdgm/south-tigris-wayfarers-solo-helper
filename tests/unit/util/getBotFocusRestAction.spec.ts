import Action from '@/services/enum/Action'
import BotFocus from '@/services/enum/BotFocus'
import getBotFocusRestAction from '@/util/getBotFocusRestAction'
import { expect } from 'chai'

describe('util/getBotFocusRestAction', () => {
  it('getBotFocusRestAction', () => {
    expect(getBotFocusRestAction(BotFocus.TOWNSFOLK)).to.eq(Action.CARD_TOWNSFOLK)
    expect(getBotFocusRestAction(BotFocus.UPGRADE)).to.eq(Action.UPGRADE_TILE)
    expect(getBotFocusRestAction(BotFocus.SPACE)).to.eq(Action.CARD_SPACE)
    expect(getBotFocusRestAction(BotFocus.JOURNAL)).to.eq(Action.INFLUENCE_CARD)
  })
})
