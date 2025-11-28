import BotFocus from '@/services/enum/BotFocus'
import Expansion from '@/services/enum/Expansion'
import { State, Turn } from '@/store/state'

export default function mockState(params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      botFocus: params?.botFocus ?? BotFocus.TOWNSFOLK,
      expansions: params?.expansions ?? []
    },
    turns: params?.turns ?? []
  }
}

export interface MockStateParams {
  botFocus?: BotFocus
  expansions?: Expansion[]
  turns?: Turn[]
}
