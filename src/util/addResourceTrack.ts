import { BotResources } from '@/store/state'

/**
 * Add silver/provisions to resource track.
 * @param botResources Bot resources
 * @param value Progress steps
 * @returns New bot resources
 */
export default function addResourceTrack(botResources: BotResources, value: number) : BotResources {
  const { townsfolkCards, landCards, waterCards, spaceCards, inspirationCards } = botResources
  return {
    resourceTrack: (botResources.resourceTrack + value) % 8,
    cometTrack: botResources.cometTrack,
    townsfolkCards,
    landCards,
    waterCards,
    spaceCards,
    inspirationCards
  }
}
