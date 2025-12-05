<template>
  <SideBar :navigationState="navigationState"/>
  <h1>
    {{t(`turnBot.title`,{focus:t(`botFocus.${state.setup.botFocus}`)})}}
    <AppIcon v-if="botActions?.isRest" name="rest" class="restIcon"/>
  </h1>

  <template v-if="botActions">
    <template v-if="botActions.isRest">
      <BotAction v-for="(restAction,index) of botActions.restActions" :key="index" :action="restAction" :navigationState="navigationState"/>
    </template>
    <template v-else>
      <BotAction :action="currentAction" :navigationState="navigationState" @addActions="addActions"/>
    </template>
    <BotAction v-for="(additionalAction,index) of additionalActions" :key="index" :action="additionalAction" :navigationState="navigationState"/>
    <BotAction v-if="botActions.benefit" :action="botActions.benefit" :navigationState="navigationState"/>
  </template>

  <BotSilver v-model="botSilver"/>
  <BotAction v-if="additionalResourceTrackBenefit" :action="additionalResourceTrackBenefit" :navigationState="navigationState"/>

  <template v-if="hasMoreActions">
    <button class="btn btn-success btn-lg mt-4 me-2" @click="next()">
      {{t('turnBot.executed')}}
    </button>
    <button class="btn btn-danger btn-lg mt-4 me-2" @click="notPossible()">
      {{t('turnBot.notPossible')}}
    </button>
  </template>
  <template v-else>
    <button class="btn btn-primary btn-lg mt-4 me-2" @click="next()">
      {{t('action.next')}}
    </button>
  </template>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import SideBar from '@/components/turn/SideBar.vue'
import DebugInfo from '@/components/turn/DebugInfo.vue'
import BotSilver from '@/components/turn/BotSilver.vue'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import addResourceTrack from '@/util/addResourceTrack'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'
import BotAction from '@/components/turn/BotAction.vue'
import { CardAction } from '@/services/Card'
import AppIcon from '@/components/structure/AppIcon.vue'
import { ActionChoice } from '@/services/BotActions'
import Action from '@/services/enum/Action'
import addComets from '@/util/addComets'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    BotSilver,
    BotAction,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { turn, actionChoice, action, botActions } = navigationState

    return { t, router, navigationState, state, turn, actionChoice, action, botActions }
  },
  data() {
    return {
      additionalActions: [] as CardAction[],
      botSilver: 0
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/turn/${this.turn-1}/player`
    },
    currentActionChoice() : ActionChoice|undefined {
      return this.botActions?.actionChoices[this.actionChoice]
    },
    currentActions() : CardAction[] {
      return this.currentActionChoice?.actions || []
    },
    currentAction() : CardAction {
      return this.currentActions[this.action]
    },
    hasMoreActions() : boolean {
      return this.currentActions.length > this.action + 1
    },
    additionalActionsSilverBonus() : number {
      return this.additionalActions.reduce((sum, action) => {
        return sum + (action.silverBonus ?? 0)
      }, 0)
    },
    additionalActionsComets() : number {
      return this.additionalActions.filter(action => action.action==Action.COMET).length
    },
    additionalResourceTrackBenefit() : CardAction|undefined {
      return getResourceTrackBenefit(this.navigationState.botResources.resourceTrack, toNumber(this.botSilver)+this.additionalActionsSilverBonus, this.state.setup.botFocus)
    }
  },
  methods: {
    notPossible() : void {
      this.router.push(`/turn/${this.turn}/bot/action/${this.actionChoice}/${this.action+1}`)
    },
    next() : void {
      if (this.actionChoice < (this.botActions?.actionChoices.length ?? 0) - 1) {
        this.router.push(`/turn/${this.turn}/bot/action/${this.actionChoice+1}/0`)
        return
      }
      this.state.storeTurn({
        turn: this.turn,
        player: this.navigationState.player,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          botResources: addComets(addResourceTrack(this.navigationState.botResources, toNumber(this.botSilver)+this.additionalActionsSilverBonus), this.additionalActionsComets)
        }
      })
      this.router.push(`/turn/${this.turn+1}/player`)
    },
    addActions(actions: CardAction[]) {
      this.additionalActions = actions
    }
  }
})
</script>

<style lang="scss" scoped>
.restIcon {
  height: 2.5rem;
  margin-top: -0.5rem;
}
</style>
