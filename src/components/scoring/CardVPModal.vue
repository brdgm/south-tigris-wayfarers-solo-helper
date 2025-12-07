<template>
  <ModalDialog id="cardVPModal" :title="t('cardVP.title')">
    <template #body>
      <div>
        {{ botResources.townsfolkCards }} x 
        <AppIcon type="action" name="card-townsfolk" class="icon"/>
        = {{ cardVP.townsfolk }} {{ t('cardVP.vp') }}
      </div>
      <div class="mt-1">
        {{ botResources.landCards }} x 
        <AppIcon type="action" name="card-land" class="icon"/>
        = {{ cardVP.land }} {{ t('cardVP.vp') }}
      </div>
      <div class="mt-1">
        {{ botResources.waterCards }} x 
        <AppIcon type="action" name="card-water" class="icon"/>
        = {{ cardVP.water }} {{ t('cardVP.vp') }}
      </div>
      <div class="mt-1">
        {{ botResources.spaceCards }} x 
        <AppIcon type="action" name="card-space" class="icon"/>
        = {{ cardVP.space }} {{ t('cardVP.vp') }}
      </div>
      <div class="mt-1">
        {{ botResources.inspirationCards }} x 
        <AppIcon type="action" name="card-inspiration" class="icon"/>
        = {{ cardVP.inspiration }} {{ t('cardVP.vp') }}
      </div>
      <p v-if="!endGame" class="mt-3">{{ t('cardVP.endGameScoringHint') }}</p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { BotResources } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import AppIcon from '../structure/AppIcon.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import getCardVP, { CardVP } from '@/util/getCardVP'

export default defineComponent({
  name: 'CardVPModal',
  components: {
    AppIcon,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    endGame: {
      type: Boolean,
      default: false
    }
  },
  computed: {
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
.icon {
  height: 1.75rem;
}
</style>
