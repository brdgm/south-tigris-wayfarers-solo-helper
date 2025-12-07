import { BotResources } from '@/store/state'

/**
 * Add comets to comet track.
 * @param botResources Bot resources
 * @param value Progress steps
 * @returns New bot resources
 */
export default function addComets(botResources: BotResources, value: number) : BotResources {
  const { townsfolkCards, landCards, waterCards, spaceCards, inspirationCards } = botResources
  return {
    resourceTrack: botResources.resourceTrack,
    cometTrack: botResources.cometTrack + value,
    townsfolkCards,
    landCards,
    waterCards,
    spaceCards,
    inspirationCards
  }
}
