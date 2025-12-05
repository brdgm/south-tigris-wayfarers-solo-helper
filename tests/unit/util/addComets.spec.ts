import addComets from '@/util/addComets'
import { expect } from 'chai'

describe('util/addComets', () => {
  it('addComets', () => {
    expect(addComets({resourceTrack: 4, cometTrack: 2}, 3)).to.eql({resourceTrack: 4, cometTrack: 5})
  })
})
