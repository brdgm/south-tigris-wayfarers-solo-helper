<template>
  <div class="icons">
    <AppIcon v-if="greenYellow" type="card-priority-green-yellow" :name="iconName" class="icon" :class="{ 'upgrade-tile-left': upgradeTile }"/>
    <AppIcon v-if="blueBlack" type="card-priority-blue-black" :name="iconName" class="icon" :class="{ 'upgrade-tile-right': upgradeTile }"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'CardPriority',
  components: {
    AppIcon
  },
  props: {
    greenYellow: {
      type: Boolean,
      required: false
    },
    blueBlack: {
      type: Boolean,
      required: false
    },
    upgradeTile: {
      type: Boolean,
      required: false
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    silverValueSum() : number {
      const silverValueSum = this.navigationState.botActions?.silverValueSum ?? this.navigationState.cardDeck.silverValueSum
      if (this.upgradeTile && silverValueSum == 4) {
        return 3
      }
      return silverValueSum
    },
    iconName() : string {
      if (this.silverValueSum == 0) {
        return '1'
      }
      else {
        return `${this.silverValueSum}`
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.icons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.icon {
  height: 2rem;
  &.upgrade-tile-left {
    clip-path: inset(0 0 0 25%);
    margin-left: -0.5rem;
  }
  &.upgrade-tile-right {
    clip-path: inset(0 25% 0 0);
    margin-right: -0.5rem;
  }
}
</style>
