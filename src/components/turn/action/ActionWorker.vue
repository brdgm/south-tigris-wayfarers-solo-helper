<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.worker.title')">
    <template #action>
      <div class="action">
        <template v-for="(color,index) of action.workerColors" :key="index">
          <span v-if="index > 0" class="or">/</span>
          <AppIcon type="action" :name="`worker-${color}`" class="icon"/>
        </template>
      </div>
    </template>
    <template #priority>
      <CardPriorityIcon :navigationState="navigationState" :greenYellow="greenYellowWorker" :blueBlack="blueBlackWorker"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.worker.instruction')"/>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import CardPriorityIcon from '@/components/structure/CardPriorityIcon.vue'
import NavigationState from '@/util/NavigationState'
import Color from '@/services/enum/Color'

export default defineComponent({
  name: 'ActionWorker',
  inheritAttrs: false,
  components: {
    ActionBox,
    AppIcon,
    CardPriorityIcon
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
    greenYellowWorker() : boolean {
      return (this.action.workerColors?.includes(Color.GREEN) ?? false)
          || (this.action.workerColors?.includes(Color.YELLOW) ?? false)
    },
    blueBlackWorker() : boolean {
      return (this.action.workerColors?.includes(Color.BLUE) ?? false)
          || (this.action.workerColors?.includes(Color.BLACK) ?? false)
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
.or {
  font-size: 2rem;
}
</style>
