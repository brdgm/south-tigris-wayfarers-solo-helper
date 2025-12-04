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
  count?: number  // used only for influence card
  color?: Color  // used for worker color (after resolving) and upgrade tile color
  workerColors?: Color[]
  influenceCost?: Guild[]
  influenceBonus?: Guild[]
  silverBonus?: number
}
