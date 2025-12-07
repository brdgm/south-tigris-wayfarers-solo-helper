<template>
  <h1>{{t('gameEnd.title')}}</h1>

  <FinalScoring/>

  <FooterButtons endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import FinalScoring from '@/components/scoring/FinalScoring.vue'

export default defineComponent({
  name: 'GameEnd',
  components: {
    FooterButtons,
    FinalScoring
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)

    return { t, state, navigationState }
  }
})
</script>
