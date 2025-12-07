import CardDeck from '@/services/CardDeck'
import { BotPersistence } from '@/store/state'
import mockCardDeck from './mockCardDeck'
import mockBotResources from './mockBotResources'

export default function mockBotPersistence(params?: MockBotPersistenceParams) : BotPersistence {  
  return {
    cardDeck: (params?.cardDeck ?? mockCardDeck()).toPersistence(),
    botResources: mockBotResources({
      resourceTrack: params?.resourceTrack,
      cometTrack: params?.cometTrack,
      townsfolkCards: params?.townsfolkCards,
      landCards: params?.landCards,
      waterCards: params?.waterCards,
      spaceCards: params?.spaceCards,
      inspirationCards: params?.inspirationCards
    })
  }
}

export interface MockBotPersistenceParams {
  cardDeck?: CardDeck
  resourceTrack?: number
  cometTrack?: number
  townsfolkCards?: number
  landCards?: number
  waterCards?: number
  spaceCards?: number
  inspirationCards?: number
}
