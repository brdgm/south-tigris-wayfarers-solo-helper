<template>
  <h3 class="mt-4 mb-3">{{t('setup.botFocusSelection.title')}}</h3>

  <div class="row" v-for="botFocus of botFocuses" :key="botFocus">
    <div class="col">
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="radio" name="botFocusSelection" :value="botFocus" v-model="state.setup.botFocus">
          {{t(`botFocus.${botFocus}`)}}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import BotFocus from '@/services/enum/BotFocus'

export default defineComponent({
  name: 'BotFocusSelection',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    botFocuses() : BotFocus[] {
      return Object.values(BotFocus)
    }
  }
})
</script>
