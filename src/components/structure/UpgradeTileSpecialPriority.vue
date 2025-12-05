<template>
  <AppIcon type="special-upgrade-tile-pick" :name="specialUpgradeTilePick" class="icon"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'
import SpecialUpgradeTilePick from '@/services/enum/SpecialUpgradeTilePick'

export default defineComponent({
  name: 'UpgradeTileSpecialPriority',
  components: {
    AppIcon
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    specialUpgradeTilePick() : SpecialUpgradeTilePick {
      return this.navigationState.cardDeck.currentCard?.specialUpgradeTilePick ?? SpecialUpgradeTilePick.BOTTOM_LEFT
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 2rem;
}
</style>
