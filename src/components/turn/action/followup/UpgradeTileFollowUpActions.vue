<template>
  <div class="btn-group flex-wrap">
    <template v-for="(action,index) of benefitActions" :key="index">
      <input type="checkbox" class="btn-check" :id="`${uid}-benefitActionOption${index}`" autocomplete="off" v-model="selectedBenefitActions" :value="action" :disabled="isCheckboxDisabled(action)">
      <label class="btn btn-outline-secondary" :for="`${uid}-benefitActionOption${index}`">
        <AppIcon type="action" :name="action.action" class="benefit"/>
      </label>
    </template>
  </div>
  <div class="btn-group flex-wrap mt-1">
    <template v-for="(action,index) of benefitActionsInfluence" :key="index">
      <input type="checkbox" class="btn-check" :id="`${uid}-benefitActionInfluenceOption${index}`" autocomplete="off" v-model="selectedBenefitActions" :value="action" :disabled="isCheckboxDisabled(action)">
      <label class="btn btn-outline-secondary" :for="`${uid}-benefitActionInfluenceOption${index}`">
        <div class="influence" v-if="action.influenceBonus">
          <AppIcon type="influence" :name="action.influenceBonus[0]" class="benefit"/>
          <AppIcon name="multiple" class="multiple"/>
        </div>
      </label>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import AppIcon from '@/components/structure/AppIcon.vue'
import Action from '@/services/enum/Action'
import Guild from '@/services/enum/Guild'
import { isEqual } from 'lodash'
import { nanoid } from 'nanoid'

export default defineComponent({
  name: 'UpgradeTileFollowUpActions',
  inheritAttrs: false,
  emits: {
    addActions: (_actionId: string, _actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const uid = nanoid()
    return { t, uid }
  },
  data() {
    return {
      selectedBenefitActions: [] as CardAction[]
    }
  },
  computed: {
    benefitActions() : CardAction[] {
      return [
        { action: Action.CARD_LAND },
        { action: Action.CARD_WATER },
        { action: Action.CARD_SPACE },
        { action: Action.CARD_TOWNSFOLK },
        { action: Action.CARD_INSPIRATION },
        { action: Action.INFLUENCE_CARD },
        { action: Action.COMET }
      ]
    },
    benefitActionsInfluence() : CardAction[] {
      return [
        { action: Action.INFLUENCE, influenceBonus: [Guild.YELLOW] },
        { action: Action.INFLUENCE, influenceBonus: [Guild.BLUE] },
        { action: Action.INFLUENCE, influenceBonus: [Guild.BLACK] },
        { action: Action.INFLUENCE, influenceBonus: [Guild.ANY] }
      ]
    }
  },
  methods: {
    isCheckboxDisabled(action: CardAction) : boolean {
      return this.selectedBenefitActions.length >= 2 && !this.selectedBenefitActions.some(item => isEqual(item, action))
    }
  },
  watch: {
    selectedBenefitActions(newValue: CardAction[]) {
      this.$emit('addActions', this.uid, newValue)
    }
  }
})
</script>

<style lang="scss" scoped>
.benefit {
  height: 1.6rem;
}
.influence {
  white-space: nowrap;
  .multiple {
    height: 0.9rem;
    margin-top: 0.4rem;
    margin-left: -0.5rem;
  }
}
</style>
