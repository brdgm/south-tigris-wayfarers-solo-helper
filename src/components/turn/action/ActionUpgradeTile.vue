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
      <CardPriority :navigationState="navigationState" :greenYellow="true" :blueBlack="true" :upgradeTile="!isGreenUpgradeTile"/>
    </template>
    <template #followUpAction>
      <UpgradeTileFollowUpActions @addActions="(actionId,actions) => $emit('addActions', actionId,actions)"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.upgradeTile.gainTile')"/>
      <p v-html="t('rules.action.upgradeTile.placeBoard')"/>
      <p v-html="t('rules.action.upgradeTile.benefits')"/>
      <p v-html="t('rules.action.upgradeTile.moreTiles')"/>
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
import UpgradeTileFollowUpActions from './followup/UpgradeTileFollowUpActions.vue'
import Color from '@/services/enum/Color'

export default defineComponent({
  name: 'ActionUpgradeTile',
  inheritAttrs: false,
  emits: {
    addActions: (_actionId: string, _actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    ColorPriority,
    CardPriority,
    UpgradeTileFollowUpActions
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
    isGreenUpgradeTile() : boolean {
      return this.action.color == Color.GREEN
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
