<template>
  <div class="icons">
    <AppIcon v-if="greenYellow" type="card-priority-green-yellow" :name="iconName" class="icon"/>
    <AppIcon v-if="blueBlack" type="card-priority-blue-black" :name="iconName" class="icon"/>
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
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    silverValueSum() : number {
      return this.navigationState.cardDeck.silverValueSum
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
}
</style>
