<template>
  <h1>{{t('setupBot.title')}}</h1>

  <div class="instructions mt-4">
    <p>Setup the game for a 2-player game, with the following changes for the AI:</p>
    <ol>
      <li>
        <span>On the backside of the player boards you find the AI sides. Find the board with the "Space AI" focus with this symbol:</span><br/>
        <AppIcon type="bot-focus" :name="state.setup.botFocus" class="icon bot-focus"/>
      </li>
      <li>The AI is not using any Dice.</li>
      <li>Place the Player Marker of their colour on the starting space of the Journal Track.</li>
      <li>They start with 1 Yellow Worker and 1 Blue Worker.</li>
      <li>The AI will always be the 2nd player. They do not gain any Provisions or Silver, but do start the game with <b>1 Influence in the Yellow Guild and 1 in Blue</b>. Place their remaining Influence into their supply.</li>
    </ol>
    <p>You do not need the scheme cards cards - the card deck, the AI resource track and the comet track is manged by this application.</p>
  </div>

  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col alert alert-primary">
        <h4>{{t('setupBot.ruleChanges.title')}}</h4>
        <ul>
          <li><b>Influence Limits</b>: Unlike human players, the AI is not limited by the Influence in their supply. If they run out, use Influence of an unused colour. This is still considered to be their Influence.</li>
          <li>The AI <b>ignores all costs</b> <i>(other than those on their Scheme Cards)</i>, and ignores all requirements on the Journal Track. They still gain all rewards from the Journal Track. In the final column, they gain a Pink Upgrade, not an Inspiration Card.</li>
          <li>The AI <b>ignores all icons on all Cards and Upgrade Tiles</b> they acquire. This includes Comets, Influence, free Upgrades, etc - everything! However, they do still gain Victory Points from acquired Upgrade Tiles.</li>
          <li>The AI <b>resolves all icons on the Resource Track</b> just as a player would. Along the top of the AI Board are shown some key changes to certain icons. If they would ever gain the effect on the left, they instead resolve that shown on the right.</li>
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
