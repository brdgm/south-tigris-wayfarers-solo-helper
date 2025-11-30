import Color from '@/services/enum/Color'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

/**
 * Get color priorities from current resource track position.
 * @param resourceTrack Resource track position
 * @returns Color priority
 */
export default function getResourceTrackColor(resourceTrack : number) : Color[] {
  switch (resourceTrack) {
    case 0:
    case 1:
    case 2:
      return getColorsStartingWith(Color.BLACK)
    case 3:
    case 4:
      return getColorsStartingWith(Color.BLUE)
    case 5:
    case 6:
      return getColorsStartingWith(Color.YELLOW)
    case 7:
      return getColorsStartingWith(Color.GREEN)
    default:
      throw new Error(`Invalid resource track position: ${resourceTrack}`)
  }
}

function getColorsStartingWith(color: Color): Color[] {
  const colorsInOrder = getAllEnumValues(Color)
  const startIndex = colorsInOrder.indexOf(color)
  return [...colorsInOrder.slice(startIndex), ...colorsInOrder.slice(0, startIndex)]
}
