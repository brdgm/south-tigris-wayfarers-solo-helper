import { BotResources } from '@/store/state'

export default function mockBotResources(params?: MockBotResourcesParams) : BotResources {  
  return {
    resourceTrack: params?.resourceTrack ?? 0,
    cometTrack: params?.cometTrack ?? 0,
    townsfolkCards: params?.townsfolkCards ?? 0,
    landCards: params?.landCards ?? 0,
    waterCards: params?.waterCards ?? 0,
    spaceCards: params?.spaceCards ?? 0,
    inspirationCards: params?.inspirationCards ?? 0
  }
}

export interface MockBotResourcesParams {
  resourceTrack?: number
  cometTrack?: number
  townsfolkCards?: number
  landCards?: number
  waterCards?: number
  spaceCards?: number
  inspirationCards?: number
}
