import addResourceTrack from '@/util/addResourceTrack'
import { expect } from 'chai'

describe('util/addResourceTrack', () => {
  it('addResourceTrack', () => {
    expect(addResourceTrack({resourceTrack: 4, cometTrack: 0}, 1)).to.eql({resourceTrack: 5, cometTrack: 0})
    expect(addResourceTrack({resourceTrack: 4, cometTrack: 0}, 5)).to.eql({resourceTrack: 1, cometTrack: 0})
  })
})
