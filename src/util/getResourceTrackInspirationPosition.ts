/**
 * Get inspiration card priorities from current resource track position.
 * @param resourceTrack Resource track position
 * @returns Inspiration card priority (0 = 1st card on top ... 3 = lowest card on bottom)
 */
export default function getResourceTrackInspirationPosition(resourceTrack : number) : number[] {
  switch (resourceTrack) {
    case 0:
    case 1:
    case 2:
      return getPositionStartingWith(1)
    case 3:
    case 7:
      return getPositionStartingWith(2)
    case 4:
    case 5:
    case 6:
      return getPositionStartingWith(3)
    default:
      throw new Error(`Invalid resource track position: ${resourceTrack}`)
  }
}

function getPositionStartingWith(position: number): number[] {
  const possiblePositions = [1,2,3]
  const startIndex = possiblePositions.indexOf(position)
  return [...possiblePositions.slice(startIndex), ...possiblePositions.slice(0, startIndex)]
}
