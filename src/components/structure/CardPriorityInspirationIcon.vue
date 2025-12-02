<template>
  <div class="icons">
    <AppIcon v-for="pos of positions" :key="pos" type="card-priority-inspiration" :name="`${pos}`" extension="webp" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'
import getResourceTrackInspirationPosition from '@/util/getResourceTrackInspirationPosition'

export default defineComponent({
  name: 'CardPriorityInspirationIcon',
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
    positions() : number[] {
      return getResourceTrackInspirationPosition(this.navigationState.botResources.resourceTrack)
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
  height: 3.5rem;
}
</style>
