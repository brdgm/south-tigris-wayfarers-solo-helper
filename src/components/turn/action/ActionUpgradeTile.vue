<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.upgradeTile.title')">
    <template #action>
      <div class="action">
        <AppIcon v-if="action.color" type="action" :name="`upgrade-tile-${action.color}`" extension="webp" class="icon"/>
        <AppIcon v-else type="action" name="upgrade-tile" class="icon"/>
      </div>
    </template>
    <template #priority>
      <ColorPriority :navigationState="navigationState"/>
      <CardPriorityIcon :navigationState="navigationState" :greenYellow="true" :blueBlack="true"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.upgradeTile.instruction')"/>
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
import CardPriorityIcon from '@/components/structure/CardPriorityIcon.vue'

export default defineComponent({
  name: 'ActionUpgradeTile',
  inheritAttrs: false,
  emits: {
    addActions: (_actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    ColorPriority,
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
