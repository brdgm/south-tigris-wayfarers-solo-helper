<template>
  <p v-for="(benefit,index) of benefits" :key="index">
    benefit: <b>{{ benefit }}</b>
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Benefit from '@/services/enum/Benefit'

export default defineComponent({
  name: 'BotBenefits',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    benefits: {
      type: Array as PropType<Benefit[]>,
      required: true
    }
  }
})
</script>
