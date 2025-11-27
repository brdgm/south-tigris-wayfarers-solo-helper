import BotFocus from '@/services/enum/BotFocus'
import Expansion from '@/services/enum/Expansion'
import { Round, State } from '@/store/state'

export default function mockState(params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      botFocus: params?.botFocus ?? BotFocus.TOWNSFOLK,
      expansions: params?.expansions ?? []
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  botFocus?: BotFocus
  expansions?: Expansion[]
  rounds?: Round[]
}
