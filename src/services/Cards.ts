import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import SpecialUpgradeTilePick from './enum/SpecialUpgradeTilePick'
import SchemeCardColor from './enum/SchemeCardColor'
import Expansion from './enum/Expansion'
import Color from './enum/Color'
import Guild from './enum/Guild'

/**
 * Scheme cards
 */
const cards : Card[] = [
  {
    id: 1,
    color: SchemeCardColor.BLUE,
    silverValue: 2,
    actions: [
      { action: Action.WORKER, workerColors: [Color.GREEN] },
      { action: Action.FOCUS }
    ],
    specialUpgradeTilePick: SpecialUpgradeTilePick.TOP_LEFT
  },
  {
    id: 2,
    color: SchemeCardColor.BLUE,
    silverValue: 0,
    actions: [
      { action: Action.WORKER, workerColors: [Color.GREEN,Color.BLUE] },
      { action: Action.INFLUENCE, influenceBonus: [Guild.BLUE,Guild.YELLOW,Guild.BLACK] }
    ],
    specialUpgradeTilePick: SpecialUpgradeTilePick.TOP_MIDDLE,
    comet: true
  },
  {
    id: 3,
    color: SchemeCardColor.BLUE,
    silverValue: 0,
    actions: [
      { action: Action.WORKER, workerColors: [Color.GREEN,Color.YELLOW] },
      { action: Action.UPGRADE_TILE }
    ],
    specialUpgradeTilePick: SpecialUpgradeTilePick.TOP_RIGHT,
    comet: true
  },
  {
    id: 4,
    color: SchemeCardColor.RED,
    silverValue: 1,
    actions: [
      { action: Action.CARD_LAND, influenceCost: [Guild.YELLOW,Guild.YELLOW] },
      { action: Action.INFLUENCE_CARD, influenceBonus: [Guild.YELLOW,Guild.YELLOW] }
    ],
    specialUpgradeTilePick: SpecialUpgradeTilePick.BOTTOM_RIGHT,
    comet: true
  },
  {
    id: 5,
    color: SchemeCardColor.RED,
    silverValue: 2,
    actions: [
      { action: Action.CARD_SPACE, influenceCost: [Guild.BLACK,Guild.BLACK] },
      { action: Action.CARD_TOWNSFOLK, influenceBonus: [Guild.BLACK] }
    ],
    specialUpgradeTilePick: SpecialUpgradeTilePick.BOTTOM_MIDDLE
  },
  {
    id: 6,
    color: SchemeCardColor.RED,
    silverValue: 1,
    actions: [
      { action: Action.CARD_WATER, influenceCost: [Guild.BLUE,Guild.BLUE] },
      { action: Action.UPGRADE_TILE, influenceBonus: [Guild.BLUE] }
    ],
    specialUpgradeTilePick: SpecialUpgradeTilePick.BOTTOM_LEFT,
    comet: true
  },
  {
    id: 7,
    expansion: Expansion.TIDES_OF_TRADE,
    silverValue: 1,
    actions: [
      { action: Action.CARD_INSPIRATION, influenceCost: [Guild.RED,Guild.RED] },
      { action: Action.UPGRADE_TILE_WORKER, influenceBonus: [Guild.RED,Guild.RED,Guild.RED] }
    ],
    drawNextCard: true
  }
]

const cardsMap = new Map<number,Card>()
for (const card of cards) {
  cardsMap.set(card.id, card)
}

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param expansions Expansions
   * @returns Cards
   */
  getAll(expansions: Expansion[]) : Card[] {
    return cards.filter(card => !card.expansion || expansions.includes(card.expansion))
  }

}
