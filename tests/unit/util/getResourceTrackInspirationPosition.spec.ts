import getResourceTrackInspirationPosition from '@/util/getResourceTrackInspirationPosition'
import { expect } from 'chai'

describe('util/getResourceTrackInspirationPosition', () => {
  it('getResourceTrackInspirationPosition', () => {
    expect(getResourceTrackInspirationPosition(0)).to.eql([1, 2, 3])
    expect(getResourceTrackInspirationPosition(1)).to.eql([1, 2, 3])
    expect(getResourceTrackInspirationPosition(2)).to.eql([1, 2, 3])
    expect(getResourceTrackInspirationPosition(3)).to.eql([2, 3, 1])
    expect(getResourceTrackInspirationPosition(4)).to.eql([3, 1, 2])
    expect(getResourceTrackInspirationPosition(5)).to.eql([3, 1, 2])
    expect(getResourceTrackInspirationPosition(6)).to.eql([3, 1, 2])
    expect(getResourceTrackInspirationPosition(7)).to.eql([2, 3, 1])
  })
})
