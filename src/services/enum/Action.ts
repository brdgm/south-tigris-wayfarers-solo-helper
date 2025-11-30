/**
 * Action
 */
enum Action {
  WORKER_GREEN = 'worker-green',
  WORKER_GREEN_OR_YELLOW = 'worker-green-or-yellow',
  WORKER_GREEN_OR_BLUE = 'worker-green-or-blue',
  FOCUS = 'focus',
  PLACE_INFLUENCE_BLUE_GREEN_BLACK = 'gain-influence-blue-green-black',
  UPGRADE_TILE = 'upgrade-tile',
  CARD_LAND_SPEND_INFLUENCE_YELLOW = 'card-land-spend-influence-yellow',
  CARD_SPACE_SPEND_INFLUENCE_BLACK = 'card-space-spend-influence-black',
  CARD_WATER_SPEND_INFLUENCE_BLUE = 'card-water-spend-influence-blue',
  PLACE_INFLUENCE_YELLOW_INFLUENCE_CARD = 'place-influence-yellow-influence-card',
  PLACE_INFLUENCE_BLACK_TOWNSFOLK_CARD = 'place-influence-black-townsfolk-card',
  PLACE_INFLUENCE_BLUE_UPGRADE_TILE = 'place-influence-blue-upgrade-tile',
  CARD_INSPIRATION_SPEND_INFLUENCE_RED = 'place-influence-red-inspiration-card',
  WORKER_UPGRADE_TILE_PLACE_INFLUENCE_RED = 'worker-upgrade-tile-place-influence-red',
  JOURNAL = 'journal',
  CARD_SPACE = 'card-space',
  CARD_TOWNSFOLK = 'card-townsfolk'
}
export default Action
