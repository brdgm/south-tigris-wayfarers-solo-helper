<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.worker.title')">
    <template #action>
      <div class="action">
        <template v-for="(color,index) of action.workerColors" :key="index">
          <span v-if="index > 0" class="or">/</span>
          <AppIcon type="action" :name="`worker-${color}`" class="icon"/>
        </template>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.worker.instruction')"/>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'ActionWorker',
  inheritAttrs: false,
  components: {
    ActionBox,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.icon {
  height: 4rem;
  margin-left: -1rem;
  margin-top: -0.5rem;
  margin-bottom: -0.5rem;
}
.or {
  font-size: 2rem;
}
</style>
