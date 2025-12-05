<template>
  <h1>{{t('setupBot.title')}}</h1>

  <div class="instructions mt-4">
    <p v-html="t('setupBot.instructions.intro')"></p>
    <ol>
      <li>
        <span v-html="t('setupBot.instructions.aiBoard', { focus: t(`botFocus.${state.setup.botFocus}`) })"></span><br/>
        <AppIcon type="bot-focus" :name="state.setup.botFocus" class="icon bot-focus"/>
      </li>
      <li v-html="t('setupBot.instructions.noDice')"></li>
      <li v-html="t('setupBot.instructions.playerMarker')"></li>
      <li v-html="t('setupBot.instructions.workers')"></li>
      <li v-html="t('setupBot.instructions.secondPlayer')"></li>
    </ol>
    <p v-html="t('setupBot.instructions.noSchemeCards')"></p>
  </div>

  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col alert alert-primary">
        <h4>{{t('setupBot.ruleChanges.title')}}</h4>
        <ul>
          <li v-html="t('setupBot.ruleChanges.influenceLimits')"></li>
          <li v-html="t('setupBot.ruleChanges.costs')"></li>
          <li v-html="t('setupBot.ruleChanges.icons')"></li>
          <li v-html="t('setupBot.ruleChanges.influenceCard.title')"></li>
          <ul>
            <li v-html="t('setupBot.ruleChanges.influenceCard.letThem')"></li>
            <li v-html="t('setupBot.ruleChanges.influenceCard.denyThem')"></li>
          </ul>
        </ul>
      </div>
    </div>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setup" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/structure/AppIcon.vue'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()

    return { t, state, router }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      this.state.setup.initialCardDeck = CardDeck.new(this.state.setup.expansions).toPersistence()
      this.router.push('/turn/1/player')
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  ol > li {
    margin-top: 0.5rem;
  }
}

.icon {
  filter: drop-shadow(2px 2px 2px #888);
  height: 2.5rem;
  width: auto;
}
</style>
