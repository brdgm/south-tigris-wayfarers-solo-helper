<template>
  <div class="actionItem">
    <component :is="componentName" :action="action" :navigationState="navigationState"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionWorker from './action/ActionWorker.vue'
import ActionCardLand from './action/ActionCardLand.vue'
import ActionCardWater from './action/ActionCardWater.vue'
import ActionCardSpace from './action/ActionCardSpace.vue'
import ActionCardTownsfolk from './action/ActionCardTownsfolk.vue'
import ActionCardInspiration from './action/ActionCardInspiration.vue'
import ActionUpgradeTile from './action/ActionUpgradeTile.vue'
import ActionUpgradeTileWorker from './action/ActionUpgradeTileWorker.vue'
import ActionInfluence from './action/ActionInfluence.vue'
import ActionInfluenceCard from './action/ActionInfluenceCard.vue'
import ActionJournal from './action/ActionJournal.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'BotAction',
  components: {
    ActionWorker,
    ActionCardLand,
    ActionCardWater,
    ActionCardSpace,
    ActionCardTownsfolk,
    ActionCardInspiration,
    ActionUpgradeTile,
    ActionUpgradeTileWorker,
    ActionInfluence,
    ActionInfluenceCard,
    ActionJournal
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    componentName() : string {
      return `action-${this.action.action}`
    }
  }
})
</script>

<style lang="scss" scoped>
.actionItem {
  margin-top: 15px;
  max-width: 32rem;
  padding-right: 10rem;
  @media (max-width: 600px) {
    padding-right: 8rem;
  }
}
</style>
