<template>
  <div class="tableWrapper">
    <table>
      <tbody>
        <tr>
          <th scope="col">
            <h5>{{t('gameEnd.scoring.title')}}</h5>
          </th>
          <th scope="col">
            <span class="fw-bold">{{t('turnPlayer.title')}}</span>
          </th>
          <th scope="col">
            <span class="fw-bold">{{t('turnBot.title')}}</span>
          </th>
        </tr>
        <tr>
          <th scope="row">
            <a data-bs-toggle="modal" href="#cardVPModal" v-html="t('sideBar.cardVP.title')"></a>
          </th>
          <td>
          </td>
          <td>
            {{ cardVP.total }}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.primaryLandWaterTags')"></span>
          </th>
          <td>
            <NumberInput v-model="playerPrimaryLandWaterTagsVP"/>
          </td>
          <td>
          </td>
        </tr>
        <tr v-if="hasTidesOfTimeExpansion">
          <th scope="row">
            <span v-html="t('gameEnd.scoring.secondaryLandWaterTags')"></span>
          </th>
          <td>
            <NumberInput v-model="playerSecondaryLandWaterTagsVP"/>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.spaceInspirationCards')"></span>
          </th>
          <td>
            <NumberInput v-model="playerSpaceInspirationCardsVP"/>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.upgradeTiles')"></span>
          </th>
          <td>
            <NumberInput v-model="playerUpgradeTilesVP"/>
          </td>
          <td>
            <NumberInput v-model="botUpgradeTilesVP"/>
          </td>
        </tr>
        <tr v-if="hasTidesOfTimeExpansion">
          <th scope="row">
            <span v-html="t('gameEnd.scoring.caravanSquare')"></span>
          </th>
          <td>
            <NumberInput v-model="playerCaravanSquareVP"/>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.guildMajorities')"></span>
          </th>
          <td>
            <NumberInput v-model="playerGuildMajoritiesVP"/>
          </td>
          <td>
            <NumberInput v-model="botGuildMajoritiesVP"/>
          </td>
        </tr>
        <tr v-if="hasTidesOfTimeExpansion">
          <th scope="row">
            <span v-html="t('gameEnd.scoring.fullHourglass')"></span>
          </th>
          <td>
            <NumberInput v-model="playerFullHourglassVP"/>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <th scope="row" class="fw-bold">
            {{t('gameEnd.scoring.totalVP')}}
          </th>
          <td class="fw-bold">
            {{playerTotalVP}}
          </td>
          <td class="fw-bold">
            {{botTotalVP}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { useStateStore } from '@/store/state'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'
import NavigationState from '@/util/NavigationState'
import { useRoute } from 'vue-router'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'
import Expansion from '@/services/enum/Expansion'
import getCardVP, { CardVP } from '@/util/getCardVP'

export default defineComponent({
  name: 'FinalScoring',
  components: {
    NumberInput
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)

    const playerPrimaryLandWaterTagsVP = ref(undefined as number|undefined)
    const playerSpaceInspirationCardsVP = ref(undefined as number|undefined)
    const playerUpgradeTilesVP = ref(undefined as number|undefined)
    const playerGuildMajoritiesVP = ref(undefined as number|undefined)
    const playerSecondaryLandWaterTagsVP = ref(undefined as number|undefined)
    const playerCaravanSquareVP = ref(undefined as number|undefined)
    const playerFullHourglassVP = ref(undefined as number|undefined)

    const botTownsfolkCardCount = ref(undefined as number|undefined)
    const botWaterLandCardCount = ref(undefined as number|undefined)
    const botSpaceCardCount = ref(undefined as number|undefined)
    const botInspirationCardsCount = ref(undefined as number|undefined)
    const botUpgradeTilesVP = ref(undefined as number|undefined)
    const botGuildMajoritiesVP = ref(undefined as number|undefined)

    return { t, state, navigationState, 
      playerPrimaryLandWaterTagsVP,
      playerSpaceInspirationCardsVP,
      playerUpgradeTilesVP,
      playerGuildMajoritiesVP,
      playerSecondaryLandWaterTagsVP,
      playerCaravanSquareVP,
      playerFullHourglassVP,
      botTownsfolkCardCount,
      botWaterLandCardCount,
      botSpaceCardCount,
      botInspirationCardsCount,
      botUpgradeTilesVP,
      botGuildMajoritiesVP
    }
  },
  data() {
    return {
      coins: [] as number[]
    }
  },
  computed: {
    cardVP() : CardVP {
      return getCardVP(this.navigationState.botResources)
    },
    playerTotalVP(): number {
      return toNumber(this.playerPrimaryLandWaterTagsVP)
        + toNumber(this.playerSpaceInspirationCardsVP)
        + toNumber(this.playerUpgradeTilesVP)
        + toNumber(this.playerGuildMajoritiesVP)
        + toNumber(this.playerSecondaryLandWaterTagsVP)
        + toNumber(this.playerCaravanSquareVP)
        + toNumber(this.playerFullHourglassVP)
    },
    botTotalVP(): number {
      return this.cardVP.total
        + toNumber(this.botUpgradeTilesVP)
        + toNumber(this.botGuildMajoritiesVP)
    },
    hasTidesOfTimeExpansion(): boolean {
      return this.state.setup.expansions.includes(Expansion.TIDES_OF_TRADE)
    }
  }
})
</script>

<style lang="scss" scoped>
.tableWrapper {
  overflow-x: auto;
}
th, td {
  text-align: center;
  padding: 0.5rem;
  font-weight: normal;
  min-width: 5rem;
}
th:nth-child(1) {
  text-align: start;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  vertical-align: middle;
}
input {
  width: 5rem;
}
</style>
