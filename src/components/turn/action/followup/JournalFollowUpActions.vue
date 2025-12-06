<template>
  <div class="btn-group flex-wrap mt-1" v-for="(benefitGroup,group) of benefits" :key="group">
    <template v-for="(benefit,index) of benefitGroup" :key="index">
      <input type="checkbox" class="btn-check" :id="`${uid}-benefitActionOption${group}_${index}`" autocomplete="off" v-model="selectedBenefits" :value="benefit" :disabled="isCheckboxDisabled(benefit)">
      <label class="btn btn-outline-secondary" :for="`${uid}-benefitActionOption${group}_${index}`">
        <AppIcon :type="benefit.type" :name="benefit.name" :extension="benefit.extension" :class="['benefit',benefit.class]"/>
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
import Expansion from '@/services/enum/Expansion'
import Color from '@/services/enum/Color'
import { useStateStore } from '@/store/state'
import { nanoid } from 'nanoid'

export default defineComponent({
  name: 'JournalFollowUpActions',
  inheritAttrs: false,
  emits: {
    addActions: (_actionId: string, _actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
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
      ], [
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
        ], [
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
      return this.selectedBenefits.length >= 2 && !this.selectedBenefits.some(item => isEqual(item, benefit))
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
.benefit {
  height: 1.6rem;
  &.last-space {
    height: 3rem;
  }
}
.btn-group > .btn {
  display: flex;
  align-items: center;
}
</style>
