<template>
  <div class="actionBox" :class="{'instruction': hasInstruction}" @click="showInstructions">
    <div class="actionWrapper">
      <div class="cost" v-if="action.influenceCost">
        <AppIcon v-for="(guild,index) of action.influenceCost" :key="index" type="influence-cost" :name="guild" class="icon"/>
        <AppIcon name="multiple" class="multiple"/>
        <AppIcon name="arrow" class="arrow"/>
      </div>
      <slot name="action"></slot>
      <div class="bonus" v-if="action.influenceBonus">
        <AppIcon v-for="(guild,index) of action.influenceBonus" :key="index" type="influence" :name="guild" class="icon"/>
        <AppIcon name="multiple" class="multiple"/>
      </div>
      <div class="bonus" v-if="action.silverBonus">
        <AppIcon v-for="index of action.silverBonus" :key="index" name="resource-track-advancement" class="icon resourceTrackAdvancement"/>
      </div>
    </div>
    <div class="priority" v-if="hasPriority">
      <slot name="priority"></slot>
    </div>
  </div>
  <div v-if="hasFollowUpAction" class="actionBox followUp col">
    <slot name="followUpAction"></slot>
  </div>

  <ModalDialog :id="modalId" :title="instructionTitle" :scrollable="true" :size-lg="modalSizeLg">
    <template #body>
      <slot name="instruction"></slot>
      <p v-if="action.influenceCost" v-html="t('rules.action.general.spendInfluencePossible')"/>
      <template v-if="action.influenceBonus">
        <hr/>
        <p v-html="t('rules.action.general.gainInfluence')"/>
      </template>
      <template v-if="action.silverBonus">
        <hr/>
        <p v-html="t('rules.action.general.silverBonus')"/>
      </template>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import showModal from '@brdgm/brdgm-commons/src/util/modal/showModal'
import AppIcon from '../structure/AppIcon.vue'
import { CardAction } from '@/services/Card'
import { nanoid } from 'nanoid'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ActionBox',
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const modalId = `modal-${nanoid()}`
    return { t, modalId }
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    },
    instructionTitle: {
      type: String,
      required: true
    },
    modalSizeLg: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    hasPriority() : boolean {
      return this.$slots.priority !== undefined
    },
    hasFollowUpAction() : boolean {
      return this.$slots.followUpAction !== undefined
    },
    hasInstruction() : boolean {
      return this.$slots.instruction !== undefined
    }
  },
  methods: {
    showInstructions() {
      if (this.hasInstruction) {
        showModal(this.modalId)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.actionBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #d7bea3;
  border: 2px solid #ba9673;
  border-radius: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  min-height: 7rem;
  z-index: 20;
  &.instruction {
    cursor: pointer;
    background-image: url('@/assets/icons/help-semi-transparent.webp');
    background-repeat: no-repeat;
    background-position: right 5px top 5px;
    background-size: 1.25rem;
  }
  &.followUp {
    margin-top: -15px;
    padding-top: 25px;
    border-style: none;
    background-color: #caac8c;
    min-height: 0;
    z-index: 10;
  }
  .actionWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .cost, .bonus {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    .icon {
      height: 2.75rem;
      &.resourceTrackAdvancement {
        height: 2rem;
      }
    }
    .icon + .icon {
      margin-left: -1rem;
    }
    .icon.resourceTrackAdvancement + .icon.resourceTrackAdvancement {
      margin-left: -2.25rem;
    }
    .multiple {
      height: 1.5rem;
      margin-top: 0.7rem;
      margin-left: -1.1rem;
    }
    .arrow {
      height: 1.5rem;
      margin-left: 0.5rem;
      margin-right: -0.25rem;
    }
  }
  .priority {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    gap: 0.5rem;
  }
}
.modal hr:first-child {
  display: none;
}
</style>
