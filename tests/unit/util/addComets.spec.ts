import addComets from '@/util/addComets'
import { expect } from 'chai'
import mockBotResources from '../helper/mockBotResources'

describe('util/addComets', () => {
  it('addComets', () => {
    expect(addComets(mockBotResources({resourceTrack: 4, cometTrack: 2}), 3))
     .to.eql(mockBotResources({resourceTrack: 4, cometTrack: 5}))
  })
})
