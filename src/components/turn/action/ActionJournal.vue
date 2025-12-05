<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.journal.title')" :modalSizeLg="true">
    <template #action>
      <div class="action">
        <AppIcon type="action" :name="action.action" class="icon"/>
        <AppIcon v-if="navigationState.botActions" type="journal-direction" :name="navigationState.botActions?.colorMajority" class="icon direction"/>
        <AppIcon name="journal-additional-step-priority" class="icon additional-step-priority"/>
      </div>
    </template>
    <template #followUpAction>
      <div class="btn-group flex-wrap mt-1" v-for="(benefitGroup,group) of benefits" :key="group">
        <template v-for="(benefit,index) of benefitGroup" :key="index">
          <input type="checkbox" class="btn-check" :id="`${uid}-benefitActionOption${group}_${index}`" autocomplete="off" v-model="selectedBenefits" :value="benefit" :disabled="isCheckboxDisabled(benefit)">
          <label class="btn btn-outline-secondary" :for="`${uid}-benefitActionOption${group}_${index}`">
            <AppIcon :type="benefit.type" :name="benefit.name" :extension="benefit.extension" :class="['benefit',benefit.class]"/>
          </label>
        </template>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.journal.moveJournalTrack')"/>
      <p v-html="t('rules.action.journal.lastColumn')"/>
      <AppIcon name="journal-additional-step-priority" class="icon additional-step-priority float-start"/>
      <p v-html="t('rules.action.journal.additionalStepPriority')"/>
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
import Action from '@/services/enum/Action'
import Guild from '@/services/enum/Guild'
import { isEqual } from 'lodash'
import Expansion from '@/services/enum/Expansion'
import Color from '@/services/enum/Color'
import { useStateStore } from '@/store/state'
import { nanoid } from 'nanoid'

export default defineComponent({
  name: 'ActionJournal',
  inheritAttrs: false,
  emits: {
    addActions: (_actionId: string, _actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const uid = nanoid()
    return { t, state, uid }
  },
  data() {
    return {
      selectedBenefits: [] as JournalBenefit[]
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
    hasMoonSagePromoTilesExpansion() {
      return this.state.setup.expansions.includes(Expansion.MOONSAGA_PROMO_TILES)
    },
    benefits() : JournalBenefit[][] {
      const benefits : JournalBenefit[][] = []
      benefits.push([
        { type:'journal-track', name:'silver-2', extension:'webp', actions: [{action:Action.SILVER, silverBonus:2}] },
        { type:'journal-track', name:'provision-silver', extension:'webp', actions: [{action:Action.SILVER, silverBonus:2}] },
        { type:'journal-track', name:'provision-2', extension:'webp', actions: [{action:Action.SILVER, silverBonus:2}] },
        { type:'journal-track', name:'townsfolk-card', actions: [{action:Action.CARD_TOWNSFOLK}] },
        { type:'journal-track', name:'upgrade-tile-green', actions: [{action:Action.UPGRADE_TILE,color:Color.GREEN}] }
      ])
      benefits.push([
        { type:'journal-track', name:'influence-yellow-2', actions: [{action:Action.INFLUENCE,influenceBonus:[Guild.YELLOW,Guild.YELLOW]}] },
        { type:'journal-track', name:'influence-blue-2', actions: [{action:Action.INFLUENCE,influenceBonus:[Guild.BLUE,Guild.BLUE]}] },
        { type:'journal-track', name:'influence-blue-yellow', actions: [{action:Action.INFLUENCE,influenceBonus:[Guild.BLUE,Guild.YELLOW]}] },
        { type:'journal-track', name:'influence-card-2', actions: [{action:Action.INFLUENCE_CARD,count:2}] },
        { type:'action', name:'get-worker', actions: [{action:Action.GET_WORKER}] }
      ])
      if (this.hasMoonSagePromoTilesExpansion) {
        benefits.push([
          { type:'journal-track', name:'upgrade-tile-yellow', extension:'webp', actions: [{action:Action.UPGRADE_TILE,color:Color.YELLOW}] },
          { type:'journal-track', name:'upgrade-tile-blue', extension:'webp', actions: [{action:Action.UPGRADE_TILE,color:Color.BLUE}] },
          { type:'action', name:'upgrade-tile-black', extension:'webp', actions: [{action:Action.UPGRADE_TILE,color:Color.BLACK}] },
          { type:'action', name:'upgrade-tile-worker', actions: [{action:Action.UPGRADE_TILE_WORKER}] },
        ])
        benefits.push([
          { type:'journal-track', name:'influence-black', actions: [{action:Action.INFLUENCE,influenceBonus:[Guild.BLACK]}] },
          { type:'journal-track', name:'influence-red', actions: [{action:Action.INFLUENCE,influenceBonus:[Guild.RED]}] },
          { type:'journal-track', name:'move-influence-2', extension:'webp', actions: [{action:Action.INFLUENCE,influenceBonus:[Guild.RED]}] },
          { type:'journal-track', name:'capture-worker', extension:'webp', actions: [{action:Action.GET_WORKER}] }
        ])
      }
      benefits.push([
        { type:'action', name:'upgrade-tile-special', actions: [{action:Action.UPGRADE_TILE_SPECIAL}] },
        { type:'journal-track', name:'inspiration-card-dice', actions: [{action:Action.CARD_INSPIRATION},{action:Action.UPGRADE_TILE}] },
        { type:'journal-track', name:'last-space-black-influence', class:'last-space', actions: [{action:Action.UPGRADE_TILE_SPECIAL,influenceBonus:[Guild.BLACK,Guild.BLACK]}] },
        { type:'journal-track', name:'last-space-yellow-influence', class:'last-space', actions: [{action:Action.UPGRADE_TILE_SPECIAL,influenceBonus:[Guild.YELLOW,Guild.YELLOW]}] },
        { type:'journal-track', name:'last-space-blue-influence', class:'last-space', actions: [{action:Action.UPGRADE_TILE_SPECIAL,influenceBonus:[Guild.BLUE,Guild.BLUE]}] }
      ])
      return benefits
    }
  },
  methods: {
    isCheckboxDisabled(benefit: JournalBenefit) : boolean {
      return this.selectedBenefits.length >= 2 && !this.selectedBenefits.find(item => isEqual(item, benefit))
    }
  },
  watch: {
    selectedBenefits(newValue: JournalBenefit[]) {
      this.$emit('addActions', this.uid, newValue.flatMap(benefit => benefit.actions))
    }
  }
})

interface JournalBenefit {
  type: string
  name: string
  extension?: string
  class?: string
  actions: CardAction[]
  expansion?: Expansion
}
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
  &.direction {
    height: 2rem;
    margin-left: -0.5rem;
  }
  &.additional-step-priority {
    height: 5rem;
    margin-left: 1rem;
  }
}
.modal {
  .icon.additional-step-priority {
    height: 10rem;
    margin: 0.5rem;
  }
}
.benefit {
  height: 1.6rem;
  &.last-space {
    height: 3rem;
  }
}
</style>
