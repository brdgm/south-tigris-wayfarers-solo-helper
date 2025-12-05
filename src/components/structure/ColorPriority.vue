<template>
  <div class="colors">
    <div v-for="color of colors" :key="color" class="color" :class="{[color]:true}"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationState from '@/util/NavigationState'
import Color from '@/services/enum/Color'
import getResourceTrackColor from '@/util/getResourceTrackColor'

export default defineComponent({
  name: 'ColorPriority',
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    hideBlack: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    colors() : Color[] {
      return getResourceTrackColor(this.navigationState.botResources.resourceTrack)
        .filter(color => !(this.hideBlack && color === Color.BLACK))
    }
  }
})
</script>

<style lang="scss" scoped>
.colors {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.color {
  height: 1.5rem;
  width: 1.5rem;
  border: 1.5px solid #fff;
  &.black {
    background-color: #000;
  }
  &.blue {
    background-color: #00adee;
  }
  &.yellow {
    background-color: #e9c002;
  }
  &.green {
    background-color: green;
  }
}
</style>
