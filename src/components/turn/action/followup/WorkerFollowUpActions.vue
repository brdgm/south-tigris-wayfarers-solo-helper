<template>
  <div class="btn-group flex-wrap">
    <template v-for="index of 4" :key="index">
      <input type="radio" class="btn-check" name="workerSpaceSelection" :id="`${uid}-workerSpaceSelectionOption${index}`" autocomplete="off" v-model="workerSpace" :value="index">
      <label class="btn btn-outline-secondary" :for="`${uid}-workerSpaceSelectionOption${index}`">
        <AppIcon type="worker-action" :name="`${workerColor}-${index}`" extension="webp" class="workerAction"/>
      </label>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import AppIcon from '@/components/structure/AppIcon.vue'
import Color from '@/services/enum/Color'
import Action from '@/services/enum/Action'
import Guild from '@/services/enum/Guild'
import { nanoid } from 'nanoid'

export default defineComponent({
  name: 'WorkerFollowUpActions',
  inheritAttrs: false,
  components: {
    AppIcon
  },
  emits: {
    addActions: (_actionId: string, _actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    const uid = nanoid()
    return { t, uid }
  },
  data() {
    return {
      workerSpace: undefined as number|undefined
    }
  },
  props: {
    workerColor: {
      type: String as PropType<Color>,
      required: true
    }
  },
  watch: {
    workerSpace(newValue: number|undefined) {
      let actions : CardAction[] = []
      if (newValue) {
        switch (this.workerColor) {
          case Color.GREEN:
            actions = getGreenWorkerActions(newValue)
            break
          case Color.YELLOW:
            actions = getYellowWorkerActions(newValue)
            break
          case Color.BLUE:
            actions = getBlueWorkerActions(newValue)
            break
        }
      }
      this.$emit('addActions', this.uid, actions)
    }
  }
})

function getGreenWorkerActions(workerSpace: number) : CardAction[] {
  switch (workerSpace) {
    case 1:
      return [{ action: Action.JOURNAL, silverBonus: 1 }]
    case 2:
      return [{ action: Action.UPGRADE_TILE, color: Color.GREEN }]
    case 3:
      return [{ action: Action.INFLUENCE, influenceBonus: [Guild.BLUE,Guild.YELLOW,Guild.BLACK] }]
    case 4:
      return [{ action: Action.CARD_SPACE }]
    default:
      return []
  }
}

function getYellowWorkerActions(workerSpace: number) : CardAction[] {
  switch (workerSpace) {
    case 1:
      return [{ action: Action.CARD_LAND, drawPile: true }]
    case 2:
      return [{ action: Action.UPGRADE_TILE, color: Color.YELLOW }]
    case 3:
      return [{ action: Action.INFLUENCE, influenceBonus: [Guild.YELLOW], silverBonus: 2 }]
    case 4:
      return [{ action: Action.CARD_TOWNSFOLK },{ action:Action.INFLUENCE_CARD }]
    default:
      return []
  }
}

function getBlueWorkerActions(workerSpace: number) : CardAction[] {
  switch (workerSpace) {
    case 1:
      return [{ action: Action.GET_WORKER },{ action: Action.INFLUENCE_CARD, count: 2 }]
    case 2:
      return [{ action: Action.INFLUENCE, influenceBonus: [Guild.BLUE], silverBonus: 2 }]
    case 3:
      return [{ action: Action.UPGRADE_TILE, color: Color.BLUE }]
    case 4:
      return [{ action: Action.CARD_WATER, drawPile: true }]
    default:
      return []
  }
}
</script>

<style lang="scss" scoped>
.workerAction {
  height: 1.4rem;
}
.button-group.flex-wrap {
  white-space: normal;
}
</style>
