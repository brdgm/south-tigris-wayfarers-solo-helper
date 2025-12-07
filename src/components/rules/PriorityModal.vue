<template>
  <ModalDialog id="priorityModal" :size-lg="true" :scrollable="true" :title="t('rules.priority.title')">
    <template #body>
      <p>{{ t('rules.priority.intro') }}</p>
      <h6>{{ t('rules.priority.positionPriority.title') }}</h6>
      <div class="iconBox">
        <CardPriority :navigationState="navigationState" :greenYellow="true" :blueBlack="true"/>
      </div>
      <p>{{ t('rules.priority.positionPriority.description') }}</p>
      <h6>{{ t('rules.priority.colourPriority.title') }}</h6>
      <div class="iconBox">
        <ColorPriority :navigationState="navigationState"/>
      </div>
      <p>{{ t('rules.priority.colourPriority.description') }}</p>
      <h6>{{ t('rules.priority.inspirationCardPriority.title') }}</h6>
      <div class="iconBox">
        <CardInspirationPriority :navigationState="navigationState"/>
      </div>
      <p>{{ t('rules.priority.inspirationCardPriority.description') }}</p>
      <h6>{{ t('rules.priority.specialUpgradeTilePriority.title') }}</h6>
      <div class="iconBox">
        <SpecialUpgradeTilePickIcon :navigationState="navigationState" class="icon"/>
      </div>
      <p>{{ t('rules.priority.specialUpgradeTilePriority.description') }}</p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import CardPriority from '../structure/CardPriority.vue'
import NavigationState from '@/util/NavigationState'
import ColorPriority from '../structure/ColorPriority.vue'
import CardInspirationPriority from '../structure/CardInspirationPriority.vue'
import SpecialUpgradeTilePickIcon from '../structure/SpecialUpgradeTilePickIcon.vue'

export default defineComponent({
  name: 'PriorityModal',
  components: {
    ModalDialog,
    CardPriority,
    ColorPriority,
    CardInspirationPriority,
    SpecialUpgradeTilePickIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.iconBox {
  background-color: #d7bea3;
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 0.25rem;
  width: fit-content;
  .icon {
    height: 2rem;
  }
}
</style>
