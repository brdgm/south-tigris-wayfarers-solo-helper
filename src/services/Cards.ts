import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import SpecialUpgradeTilePick from './enum/SpecialUpgradeTilePick'
import SchemeCardColor from './enum/SchemeCardColor'
import Expansion from './enum/Expansion'

/**
 * Scheme cards
 */
const cards : Card[] = [
  {
    id: 1,
    color: SchemeCardColor.BLUE,
    silverValue: 2,
    actions: [
      Action.WORKER_GREEN,
      Action.FOCUS
    ],
    specialUpgradeTilePick: SpecialUpgradeTilePick.TOP_LEFT,
  },
  {
    id: 2,
    color: SchemeCardColor.BLUE,
    silverValue: 0,
    actions: [
      Action.WORKER_GREEN_OR_BLUE,
      Action.PLACE_INFLUENCE_BLUE_GREEN_BLACK,
    ],
    specialUpgradeTilePick: SpecialUpgradeTilePick.TOP_MIDDLE,
    comet: true
  },
  {
    id: 3,
    color: SchemeCardColor.BLUE,
    silverValue: 0,
    actions: [
      Action.WORKER_GREEN_OR_YELLOW,
      Action.UPGRADE_TILE
    ],
    specialUpgradeTilePick: SpecialUpgradeTilePick.TOP_RIGHT,
    comet: true
  },
  {
    id: 4,
    color: SchemeCardColor.RED,
    silverValue: 1,
    actions: [
      Action.CARD_LAND_SPEND_INFLUENCE_YELLOW,
      Action.PLACE_INFLUENCE_YELLOW_INFLUENCE_CARD
    ],
    specialUpgradeTilePick: SpecialUpgradeTilePick.BOTTOM_RIGHT,
    comet: true
  },
  {
    id: 5,
    color: SchemeCardColor.RED,
    silverValue: 2,
    actions: [
      Action.CARD_SPACE_SPEND_INFLUENCE_BLACK,
      Action.PLACE_INFLUENCE_BLACK_TOWNSFOLK_CARD
    ],
    specialUpgradeTilePick: SpecialUpgradeTilePick.BOTTOM_MIDDLE
  },
  {
    id: 6,
    color: SchemeCardColor.RED,
    silverValue: 1,
    actions: [
      Action.CARD_WATER_SPEND_INFLUENCE_BLUE,
      Action.PLACE_INFLUENCE_BLUE_UPGRADE_TILE
    ],
    specialUpgradeTilePick: SpecialUpgradeTilePick.BOTTOM_LEFT,
    comet: true
  },
  {
    id: 7,
    expansion: Expansion.TIDES_OF_TRADE,
    silverValue: 1,
    actions: [
      Action.CARD_INSPIRATION_SPEND_INFLUENCE_RED,
      Action.WORKER_UPGRADE_TILE_PLACE_INFLUENCE_RED
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
