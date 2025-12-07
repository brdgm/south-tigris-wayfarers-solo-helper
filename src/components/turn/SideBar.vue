<template>
  <div class="sidebar">
    <template v-if="turn>0">{{t('sideBar.turn', {turn})}}</template>
    <div class="metric">
      <div class="label"><AppIcon name="resource-tracker" class="icon resourceTracker"/></div>
      <div>{{ botResources.resourceTrack+1 }}</div>
    </div>
    <div class="metric">
      <div class="label"><AppIcon type="action" name="comet" class="icon comet"/></div>
      <div>{{ botResources.cometTrack }}</div>
    </div>
    <div class="metric">
      <div class="label"><AppIcon name="scheme-cards-blue" class="icon cards"/></div>
      <div>{{ cardDeck.discardBlueCount }}</div>
    </div>
    <div class="metric">
      <div class="label"><AppIcon name="scheme-cards-red" class="icon cards"/></div>
      <div>{{ cardDeck.discardRedCount }}</div>
    </div>
    <div class="metric">
      <div class="label">
        <a data-bs-toggle="modal" href="#cardVPModal">
          <AppIcon name="vp" class="icon vp"/>
          <AppIcon name="card-any" class="icon vp ms-1"/>
        </a>
      </div>
      <div>{{ cardVP.total }}</div>
    </div>
    <div class="mt-3">
      <a data-bs-toggle="modal" href="#priorityModal" class="rule">{{t('rules.priority.title')}}</a>
    </div>
  </div>

  <ModalDialog id="cardVPModal" :title="t('sideBar.cardVP.title')">
    <template #body>
      <div>
        {{ botResources.townsfolkCards }} x 
        <AppIcon type="action" name="card-townsfolk" class="icon"/>
        = {{ cardVP.townsfolk }} {{ t('sideBar.cardVP.vp') }}
      </div>
      <div class="mt-1">
        {{ botResources.landCards }} x 
        <AppIcon type="action" name="card-land" class="icon"/>
        = {{ cardVP.land }} {{ t('sideBar.cardVP.vp') }}
      </div>
      <div class="mt-1">
        {{ botResources.waterCards }} x 
        <AppIcon type="action" name="card-water" class="icon"/>
        = {{ cardVP.water }} {{ t('sideBar.cardVP.vp') }}
      </div>
      <div class="mt-1">
        {{ botResources.spaceCards }} x 
        <AppIcon type="action" name="card-space" class="icon"/>
        = {{ cardVP.space }} {{ t('sideBar.cardVP.vp') }}
      </div>
      <div class="mt-1">
        {{ botResources.inspirationCards }} x 
        <AppIcon type="action" name="card-inspiration" class="icon"/>
        = {{ cardVP.inspiration }} {{ t('sideBar.cardVP.vp') }}
      </div>
      <p class="mt-3">{{ t('sideBar.cardVP.endGameScoringHint') }}</p>
    </template>
  </ModalDialog>

  <PriorityModal :navigationState="navigationState"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { BotResources, useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import CardDeck from '@/services/CardDeck'
import AppIcon from '../structure/AppIcon.vue'
import PriorityModal from '../rules/PriorityModal.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import getCardVP, { CardVP } from '@/util/getCardVP'

export default defineComponent({
  name: 'SideBar',
  components: {
    AppIcon,
    PriorityModal,
    ModalDialog
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
    },
    botResources() : BotResources {
      return this.navigationState.botResources
    },
    cardVP() : CardVP {
      return getCardVP(this.botResources)
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
  &.vp {
    height: 1.5rem;
  }
}
</style>
