<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.worker.title')">
    <template #action>
      <div class="action">
        <AppIcon type="action" :name="`worker-${workerColor}`" class="icon"/>
      </div>
    </template>
    <template #priority>
      <CardPriority :navigationState="navigationState" :greenYellow="isGreenWorker||isYellowWorker" :blueBlack="isBlueWorker"/>
    </template>
    <template #followUpAction>
      <WorkerFollowUpActions :workerColor="workerColor" @addActions="(actionId,actions) => $emit('addActions', actionId,actions)"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.worker.placeWorker')"/>
      <p v-html="t('rules.action.worker.workerColors')"/>
      <p v-html="t('rules.action.worker.printedActions')"/>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import CardPriority from '@/components/structure/CardPriority.vue'
import NavigationState from '@/util/NavigationState'
import Color from '@/services/enum/Color'
import WorkerFollowUpActions from './followup/WorkerFollowUpActions.vue'

export default defineComponent({
  name: 'ActionWorker',
  inheritAttrs: false,
  components: {
    ActionBox,
    AppIcon,
    CardPriority,
    WorkerFollowUpActions
  },
  emits: {
    addActions: (_actionId: string, _actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
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
    workerColor() : Color {
      return this.action.color ?? Color.GREEN
    },
    isGreenWorker() : boolean {
      return this.workerColor == Color.GREEN
    },
    isYellowWorker() : boolean {
      return this.workerColor == Color.YELLOW
    },
    isBlueWorker() : boolean {
      return this.workerColor == Color.BLUE
    }
  }
})
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.icon {
  height: 4rem;
  margin-left: -1rem;
  margin-top: -0.5rem;
  margin-bottom: -0.5rem;
}
</style>
