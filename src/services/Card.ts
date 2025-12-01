import Action from './enum/Action'
import SchemeCardColor from './enum/SchemeCardColor'
import Expansion from './enum/Expansion'
import SpecialUpgradeTilePick from './enum/SpecialUpgradeTilePick'
import Color from './enum/Color'
import Guild from './enum/Guild'

export default interface Card {
  id: number
  expansion?: Expansion
  color?: SchemeCardColor
  silverValue: number
  actions: CardAction[]
  specialUpgradeTilePick?: SpecialUpgradeTilePick
  comet?: boolean
  drawNextCard?: boolean
}

export interface CardAction {
  action: Action
  workerColors?: Color[]
  influenceCost?: Guild[]
  influenceBonus?: Guild[]
}
