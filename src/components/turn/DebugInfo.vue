<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <b>currentCard</b>: {{navigationState.currentCard}}<br/>
      <template v-if="currentCardDrawNext">
        <b>currentCard</b>: {{currentCardDrawNext}}<br/>
      </template>
      <b>cardDeck</b>: {{cardDeck.toPersistence()}}<br/>
      <b>botResources</b>: {{navigationState.botResources}}<br/>
    </p>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import CardDeck from '@/services/CardDeck'
import Card from '@/services/Card'

export default defineComponent({
  name: 'DebugInfo',
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
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck
    },
    currentCardDrawNext() : Card|undefined {
      return this.cardDeck.discard.slice(0, 2).find(card => card.drawNextCard)
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
</style>
