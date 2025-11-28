<template>
  <h1>{{t('setup.title')}}</h1>

  <BotFocusSelection/>
  <ExpansionsSetup/>

  <button class="btn btn-primary btn-lg mt-4" @click="setupGame()">
    {{t('setupBot.title')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRouter } from 'vue-router'
import ExpansionsSetup from '@/components/setup/ExpansionsSetup.vue'
import BotFocusSelection from '@/components/setup/BotFocusSelection.vue'

export default defineComponent({
  name: 'SetupApp',
  components: {
    FooterButtons,
    BotFocusSelection,
    ExpansionsSetup
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()

    return { t, state, router }
  },
  methods: {
    setupGame() : void {
      this.router.push('/setupBot')
    }
  }
})
</script>
