import Action from '@/services/enum/Action'
import BotFocus from '@/services/enum/BotFocus'
import getBotFocusAction from '@/util/getBotFocusAction'
import { expect } from 'chai'

describe('util/getBotFocusAction', () => {
  it('getBotFocusAction', () => {
    expect(getBotFocusAction(BotFocus.TOWNSFOLK)).to.eq(Action.CARD_TOWNSFOLK)
    expect(getBotFocusAction(BotFocus.UPGRADE)).to.eq(Action.UPGRADE_TILE)
    expect(getBotFocusAction(BotFocus.SPACE)).to.eq(Action.CARD_SPACE)
    expect(getBotFocusAction(BotFocus.JOURNAL)).to.eq(Action.JOURNAL)
  })
})
