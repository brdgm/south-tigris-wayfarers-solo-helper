<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.upgradeTile.title')">
    <template #action>
      <div class="action">
        <AppIcon v-if="action.color" type="action" :name="`upgrade-tile-${action.color}`" extension="webp" class="icon"/>
        <AppIcon v-else type="action" name="upgrade-tile" class="icon"/>
      </div>
    </template>
    <template #priority>
      <ColorPriority :navigationState="navigationState"/>
      <CardPriorityIcon :navigationState="navigationState" :greenYellow="true" :blueBlack="true"/>
    </template>
    <template #followUpAction>
      <div class="btn-group flex-wrap">
        <template v-for="(action,index) of benefitActions" :key="index">
          <input type="checkbox" class="btn-check" :id="`benefitActionOption${index}`" autocomplete="off" v-model="selectedBenefitActions" :value="action" :disabled="isCheckboxDisabled(action)">
          <label class="btn btn-outline-secondary" :for="`benefitActionOption${index}`">
            <AppIcon type="action" :name="action.action" class="benefit"/>
          </label>
        </template>
      </div>
      <div class="btn-group flex-wrap mt-1">
        <template v-for="(action,index) of benefitActionsInfluence" :key="index">
          <input type="checkbox" class="btn-check" :id="`benefitActionInfluenceOption${index}`" autocomplete="off" v-model="selectedBenefitActions" :value="action" :disabled="isCheckboxDisabled(action)">
          <label class="btn btn-outline-secondary" :for="`benefitActionInfluenceOption${index}`">
            <div class="influence" v-if="action.influenceBonus">
              <AppIcon type="influence" :name="action.influenceBonus[0]" class="benefit"/>
              <AppIcon name="multiple" class="multiple"/>
            </div>
          </label>
        </template>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.upgradeTile.gainTile')"/>
      <p v-html="t('rules.action.upgradeTile.placeBoard')"/>
      <p v-html="t('rules.action.upgradeTile.benefits')"/>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'
import ColorPriority from '@/components/structure/ColorPriority.vue'
import CardPriorityIcon from '@/components/structure/CardPriorityIcon.vue'
import Action from '@/services/enum/Action'
import Guild from '@/services/enum/Guild'
import { eq, isEqual } from 'lodash'

export default defineComponent({
  name: 'ActionUpgradeTile',
  inheritAttrs: false,
  emits: {
    addActions: (_actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    ColorPriority,
    CardPriorityIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      selectedBenefitActions: [] as CardAction[]
    }
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
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
      return this.selectedBenefitActions.length >= 2 && !this.selectedBenefitActions.find(item => isEqual(item, action))
    }
  },
  watch: {
    selectedBenefitActions(newValue: number|undefined) {
      this.$emit('addActions', this.selectedBenefitActions)
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
  height: 3rem;
}
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
