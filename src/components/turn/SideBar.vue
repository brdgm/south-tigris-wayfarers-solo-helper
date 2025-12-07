<template>
  <div class="sidebar">
    <template v-if="turn>0">{{t('sideBar.turn', {turn})}}</template>
    <div class="metric">
      <div class="label"><AppIcon name="resource-tracker" class="icon resourceTracker"/></div>
      <div>{{ navigationState.botResources.resourceTrack+1 }}</div>
    </div>
    <div class="metric">
      <div class="label"><AppIcon type="action" name="comet" class="icon comet"/></div>
      <div>{{ navigationState.botResources.cometTrack }}</div>
    </div>
    <div class="metric">
      <div class="label"><AppIcon name="scheme-cards-blue" class="icon cards"/></div>
      <div>{{ cardDeck.discardBlueCount }}</div>
    </div>
    <div class="metric">
      <div class="label"><AppIcon name="scheme-cards-red" class="icon cards"/></div>
      <div>{{ cardDeck.discardRedCount }}</div>
    </div>
    <div class="mt-3">
      <a data-bs-toggle="modal" href="#priorityModal" class="rule">{{t('rules.priority.title')}}</a>
    </div>
  </div>

  <PriorityModal :navigationState="navigationState"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import CardDeck from '@/services/CardDeck'
import AppIcon from '../structure/AppIcon.vue'
import PriorityModal from '../rules/PriorityModal.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    AppIcon,
    PriorityModal
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    turn() : number {
      return this.navigationState.turn
    },
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 145px;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: -12px;
  padding: 15px 10px 15px 15px;
  background-color: #ddd;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 120px;
  }
}
.metric {
  display: flex;
  width: 60px;
  justify-content: space-between;
  margin-top: 10px;
  .label {
    display: flex;
    width: 40px;
    align-items: center;
    justify-content: center;
  }
}
.icon {
  height: 1.75rem;
  &.resourceTracker {
    height: 1.5rem;
  }
  &.comet {
    height: 2.5rem;
    margin: -0.5rem;
  }
  &.cards {
    margin-top: -0.25rem;
  }
}
</style>
