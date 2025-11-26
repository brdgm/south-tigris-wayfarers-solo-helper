import Action from './enum/Action'
import CardColor from './enum/CardColor'
import Expansion from './enum/Expansion'
import SpecialUpgradeTilePick from './enum/SpecialUpgradeTilePick'

export default interface Card {
  id: number
  expansion?: Expansion
  cardColor?: CardColor
  silverValue: number
  actions: Action[]
  specialUpgradeTilePick?: SpecialUpgradeTilePick
  comet?: boolean
  drawNextCard?: boolean
}
