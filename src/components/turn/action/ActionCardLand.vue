<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.cardLand.title')">
    <template #action>
      <div class="action">
        <AppIcon v-if="action.drawPile" type="action" name="card-land-pile" extension="webp" class="icon"/>
        <AppIcon v-else type="action" name="card-land" class="icon"/>
      </div>
    </template>
    <template #priority>
      <CardPriorityIcon v-if="!action.drawPile" :navigationState="navigationState" :greenYellow="true"/>
    </template>
    <template #instruction>
      <p v-if="action.drawPile" v-html="t('rules.action.cardLand.drawPile')"/>
      <p v-else v-html="t('rules.action.cardLand.gainCard')"/>
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
import CardPriorityIcon from '@/components/structure/CardPriorityIcon.vue'

export default defineComponent({
  name: 'ActionCardLand',
  inheritAttrs: false,
  emits: {
    addActions: (_actionId: string, _actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
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
