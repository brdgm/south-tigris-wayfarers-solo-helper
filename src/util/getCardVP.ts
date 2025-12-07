import { BotResources } from '@/store/state'

/**
 * Get VP for cards collected by AI.
 * @param botResources Bot resources
 * @returns VP
 */
export default function getCardVP(botResources: BotResources) : CardVP {
  const townsfolk = botResources.townsfolkCards
  const land = botResources.landCards * 2
  const water = botResources.waterCards * 2
  const space = botResources.spaceCards * 3
  const inspiration = botResources.inspirationCards * 4
  const total = townsfolk + land + water + space + inspiration
  return {
    townsfolk,
    land,
    water,
    space,
    inspiration,
    total
  }
}

export interface CardVP {
  townsfolk: number
  land: number
  water: number
  space: number
  inspiration: number
  total: number
}
