<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.influenceCard.title')">
    <template #action>
      <div class="action">
        <AppIcon v-for="index of actionCount" :key="index" type="action" :name="action.action" class="icon"/>
      </div>
    </template>
    <template #priority>
      <ColorPriority :navigationState="navigationState"/>
      <CardPriority :navigationState="navigationState" :greenYellow="true" :blueBlack="true"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.influenceCard.instruction')"/>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'
import ColorPriority from '@/components/structure/ColorPriority.vue'
import CardPriority from '@/components/structure/CardPriority.vue'

export default defineComponent({
  name: 'ActionInfluenceCard',
  inheritAttrs: false,
  emits: {
    addActions: (_actionId: string, _actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    ColorPriority,
    CardPriority
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
    actionCount() : number {
      return this.action.count ?? 1
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
  height: 3rem;
}
</style>
