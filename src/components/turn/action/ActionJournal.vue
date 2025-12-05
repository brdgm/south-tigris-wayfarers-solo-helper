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
      <JournalFollowUpActions @addActions="(actionId,actions) => $emit('addActions', actionId,actions)"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.journal.moveJournalTrack')"/>
      <p v-html="t('rules.action.journal.lastColumn')"/>
      <AppIcon name="journal-additional-step-priority" class="icon additional-step-priority float-start"/>
      <p v-html="t('rules.action.journal.additionalStepPriority')"/>
      <p v-html="t('rules.action.journal.benefits')"/>
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
import JournalFollowUpActions from './followup/JournalFollowUpActions.vue'

export default defineComponent({
  name: 'ActionJournal',
  inheritAttrs: false,
  emits: {
    addActions: (_actionId: string, _actions: CardAction[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    JournalFollowUpActions
  },
  setup() {
    const { t } = useI18n()
    return { t }
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
</style>
