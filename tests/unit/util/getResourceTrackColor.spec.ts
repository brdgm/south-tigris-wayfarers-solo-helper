import Color from '@/services/enum/Color'
import getResourceTrackColor from '@/util/getResourceTrackColor'
import { expect } from 'chai'

describe('util/getResourceTrackColor', () => {
  it('getResourceTrackColor', () => {
    expect(getResourceTrackColor(0)).to.eql([Color.BLACK, Color.BLUE, Color.YELLOW, Color.GREEN])
    expect(getResourceTrackColor(1)).to.eql([Color.BLACK, Color.BLUE, Color.YELLOW, Color.GREEN])
    expect(getResourceTrackColor(2)).to.eql([Color.BLACK, Color.BLUE, Color.YELLOW, Color.GREEN])
    expect(getResourceTrackColor(3)).to.eql([Color.BLUE, Color.YELLOW, Color.GREEN, Color.BLACK])
    expect(getResourceTrackColor(4)).to.eql([Color.BLUE, Color.YELLOW, Color.GREEN, Color.BLACK])
    expect(getResourceTrackColor(5)).to.eql([Color.YELLOW, Color.GREEN, Color.BLACK, Color.BLUE])
    expect(getResourceTrackColor(6)).to.eql([Color.YELLOW, Color.GREEN, Color.BLACK, Color.BLUE])
    expect(getResourceTrackColor(7)).to.eql([Color.GREEN, Color.BLACK, Color.BLUE, Color.YELLOW])
  })
})
