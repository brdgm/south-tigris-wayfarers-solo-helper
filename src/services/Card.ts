import Action from './enum/Action'
import SchemeCardColor from './enum/SchemeCardColor'
import Expansion from './enum/Expansion'
import SpecialUpgradeTilePick from './enum/SpecialUpgradeTilePick'

export default interface Card {
  id: number
  expansion?: Expansion
  cardColor?: SchemeCardColor
  silverValue: number
  actions: Action[]
  specialUpgradeTilePick?: SpecialUpgradeTilePick
  comet?: boolean
  drawNextCard?: boolean
}
