<template>
  <h3 class="mt-4 mb-3">{{t('setup.botFocusSelection.title')}}</h3>

  <div class="row g-3">
    <div class="col-6 col-sm-4 col-md-3 col-lg-2" v-for="botFocus of botFocuses" :key="botFocus">
      <input type="radio" 
             class="btn-check" 
             name="botFocusSelection" 
             :id="`botFocus-${botFocus}`"
             :value="botFocus" 
             v-model="state.setup.botFocus"
             autocomplete="off">
      <label class="focus-card" :for="`botFocus-${botFocus}`">
        <div class="focus-card-icon">
          <AppIcon type="bot-focus" :name="botFocus" extension="svg" class="icon"/>
        </div>
        <div class="focus-card-text">
          {{t(`botFocus.${botFocus}`)}}
        </div>
      </label>
    </div>
  </div>

  <p class="mt-3" v-html="t('setup.botFocusSelection.feelDifferent')"></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import BotFocus from '@/services/enum/BotFocus'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'BotFocusSelection',
  components: {
    AppIcon
  },
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

<style lang="scss" scoped>
.focus-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 2px solid #dee2e6;
  border-radius: 0.5rem;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  min-height: 120px;
  max-width: 200px;
  margin: 0 auto;
  &:hover {
    border-color: #0d6efd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
}

.btn-check:checked + .focus-card {
  background-color: #e7f1ff;
  border-color: #0d6efd;
  border-width: 3px;
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
}

.focus-card-icon {
  margin-bottom: 0.75rem;
  .icon {
    filter: drop-shadow(2px 2px 2px #888);
    height: 3rem;
    width: auto;
  }
}

.focus-card-text {
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;
  color: #333;
}

.btn-check:checked + .focus-card .focus-card-text {
  color: #0d6efd;
  font-weight: 600;
}
</style>