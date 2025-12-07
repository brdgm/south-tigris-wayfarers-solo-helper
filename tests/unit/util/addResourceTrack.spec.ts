import addResourceTrack from '@/util/addResourceTrack'
import { expect } from 'chai'
import mockBotResources from '../helper/mockBotResources'

describe('util/addResourceTrack', () => {
  it('addResourceTrack', () => {
    expect(addResourceTrack(mockBotResources({resourceTrack: 4, cometTrack: 1}), 1))
      .to.eql(mockBotResources({resourceTrack: 5, cometTrack: 1}))
    expect(addResourceTrack(mockBotResources({resourceTrack: 4}), 5))
      .to.eql(mockBotResources({resourceTrack: 1}))
  })
})
