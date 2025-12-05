<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.worker.title')">
    <template #action>
      <div class="action">
        <AppIcon type="action" :name="`worker-${workerColor}`" class="icon"/>
      </div>
    </template>
    <template #priority>
      <CardPriorityIcon :navigationState="navigationState" :greenYellow="isGreenWorker||isYellowWorker" :blueBlack="isBlueWorker"/>
    </template>
    <template #followUpAction>
      <div class="btn-group flex-wrap">
        <template v-for="index of 4" :key="index">
          <input type="radio" class="btn-check" name="workerSpaceSelection" :id="`${uid}-workerSpaceSelectionOption${index}`" autocomplete="off" v-model="workerSpace" :value="index">
          <label class="btn btn-outline-secondary" :for="`${uid}-workerSpaceSelectionOption${index}`">
            <AppIcon type="worker-action" :name="`${workerColor}-${index}`" extension="webp" class="workerAction"/>
          </label>
        </template>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.worker.placeWorker')"/>
      <p v-html="t('rules.action.worker.workerColors')"/>
      <p v-html="t('rules.action.worker.printedActions')"/>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import CardPriorityIcon from '@/components/structure/CardPriorityIcon.vue'
import NavigationState from '@/util/NavigationState'
import Color from '@/services/enum/Color'
import Action from '@/services/enum/Action'
import Guild from '@/services/enum/Guild'
import { nanoid } from 'nanoid'

export default defineComponent({
  name: 'ActionWorker',
  inheritAttrs: false,
  components: {
    ActionBox,
    AppIcon,
    CardPriorityIcon
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
    workerColor() : Color {
      return this.action.color ?? Color.GREEN
    },
    isGreenWorker() : boolean {
      return this.workerColor == Color.GREEN
    },
    isYellowWorker() : boolean {
      return this.workerColor == Color.YELLOW
    },
    isBlueWorker() : boolean {
      return this.workerColor == Color.BLUE
    }
  },
  watch: {
    workerSpace(newValue: number|undefined) {
      let actions : CardAction[] = []
      if (newValue) {
        if (this.isGreenWorker) {
          actions = getGreenWorkerActions(newValue)
        } else if (this.isYellowWorker) {
          actions = getYellowWorkerActions(newValue)
        } else if (this.isBlueWorker) {
          actions = getBlueWorkerActions(newValue)
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
.workerAction {
  height: 1.4rem;
}
.button-group.flex-wrap {
  white-space: normal;
}
</style>
