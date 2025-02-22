<script>
  export default {
    props: ['ecogesteKey', 'ecogeste', 'buttons', 'answered', 'hasNext', 'multiplier', 'credit', 'affectionToggle'],

    data () {
      return {
        showButtons: this.buttons || false,
        showCredit: this.credit || false,
        showAffectionToggle: this.affectionToggle || false,
        ecogesteMetadata: { affected: true },
        ecogesteTitle: this.ecogeste.randomTitle()
      }
    },

    watch: {
      "ecogesteMetadata.affected": function (value) {
        if (typeof this.$parent.onAffectChange !== 'undefined') {
          this.$parent.onAffectChange(this.ecogesteKey, value);
        }
      },
      "ecogeste": function (value) {
        this.ecogesteTitle = value.randomTitle();
      }
    },

    methods: {
      totalPoints() {
        const multiplier = this.multiplier || 1;
        return Math.round(this.ecogeste.points * multiplier);
      },

      humanizedTag() {
        switch (this.ecogeste.tag) {
          case "je-baisse":
            return "Je baisse";
          case "j-eteins":
            return "J'éteins";
          case "je-decale":
            return "Je décale";
          case "j-optimise":
            return "J'optimise";
          case "j-entretiens":
            return "J'entretiens";
        }
      },

      tagIcon() {
        switch (this.ecogeste.tag) {
          case "je-baisse":
            return "ri-arrow-right-down-line";
          case "j-eteins":
            return "ri-shut-down-line";
          case "je-decale":
            return "ri-arrow-right-line";
          case "j-optimise":
            return "ri-dashboard-3-line";
          case "j-entretiens":
            return "ri-first-aid-kit-line";
        }
      },

      imageUrl() {
        return `/assets/images/ecogestes/${this.ecogesteKey}.png`
      }
    },

    mounted () {
      chrome.storage.local.get("unaffectedEcogestes", function (data) {
        const unaffectedEcogestes = Object.values(data.unaffectedEcogestes || {});
        this.ecogesteMetadata = { affected: unaffectedEcogestes.indexOf(this.ecogesteKey) === -1 };
      }.bind(this));
    }
  }
</script>

<template>
  <div v-if="ecogeste">
    <div class="fr-card--recto" v-if="!answered">
      <div class="fr-card fr-card--horizontal" :class="{ 'fr-card--unaffected': !ecogesteMetadata.affected }">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <div class="fr-card__start fr-mb-2w">
              <div class="fr-toggle fr-toggle--label-left affection-toggle" v-if="showAffectionToggle">
                <input type="checkbox" v-model="ecogesteMetadata.affected" :id="`affection-toggle-${ecogesteKey}`" class="fr-toggle__input" aria-describedby="alert-notif-hint-text">
                <label class="fr-toggle__label" :for="`affection-toggle-${ecogesteKey}`">
                  {{ ecogesteMetadata.affected ? "Cet écogeste me concerne" : "Cet écogeste ne me concerne pas" }}
                </label>
              </div>
              <div class="fr-card__metadata">
                <p class="fr-tag">
                  <VIcon class="fr-mr-1v" :name="tagIcon()" :label="humanizedTag()" :scale="0.8" />
                  <span class="fr-text--sm" v-if="!iconOnly">{{ humanizedTag() }}</span>
                </p>
                <p class="fr-badge fr-badge--no-icon" v-if="!ecogeste.hasPicture">
                  {{ totalPoints() }} points
                </p>
              </div>
            </div>
            <h3 class="fr-card__title">{{ ecogesteTitle }}</h3>
            <p class="fr-card__desc fr-text--md">{{ ecogeste.description }}</p>
            <div class="fr-card__end" v-if="!showButtons">
              <p class="fr-hint-text">{{ ecogeste.sources }}</p>
            </div>
            <div class="fr-card__end" v-if="showButtons">
              <ul class="fr-btns-group fr-btns-group--inline-md">
                <li><button class="fr-btn" v-on:click="$parent.answerEcogeste">Je le fais !</button></li>
                <li><button class="fr-btn fr-btn--secondary" v-if="hasNext" v-on:click="$parent.nextEcogeste">Geste suivant</button></li>
                <li><button class="fr-btn fr-btn--tertiary" v-on:click="$parent.unaffectEcogeste">Pas concerné(e)</button></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="fr-card__header" v-if="ecogeste.hasPicture">
          <div class="fr-card__img">
            <p class="fr-badge fr-badge--no-icon">{{ totalPoints() }} points</p>
            <img class="fr-responsive-img" :src="imageUrl()" :alt="ecogeste.randomTitle()" />
            <p v-if="showCredit" class="fr-card__img__credit">{{ ecogeste.credit }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="fr-card--verso" v-if="answered">
      <div class="fr-card">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <button class="fr-btn--close fr-btn" title="Fermer" v-on:click="$parent.nextEcogeste">
              Fermer
            </button>
            <div class="fr-card__start fr-mb-2w">
              <p class="fr-badge fr-badge--no-icon">{{ totalPoints() }} points</p>
            </div>
            <h3 class="fr-card__title">{{ ecogeste.thanks }}</h3>
            <div class="fr-callout fr-card__desc">
              <h3 class="fr-callout__title">{{ ecogesteTitle }}</h3>
              <p class="fr-callout__text fr-mb-2w">{{ ecogeste.collectiveEffort }}</p>
              <p>{{ ecogeste.sources }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fr-card--recto {
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--grey-900-175)
}

.fr-card--unaffected {
  background-color: #F6F6F6;
}

.fr-card__img > .fr-badge {
  position: absolute;
  top: 0;
  left: 0;
  margin: .8rem;
}

.fr-badge {
  background: var(--yellow-tournesol-950-100);
  color: var(--yellow-tournesol-sun-407-moon-922);
}

.fr-card__img__credit {
  background: rgba(255, 255, 255, 0.5);
  bottom: 0;
  font-size: 0.85rem;
  left: 0;
  margin: 0;
  padding: 0 0.25rem;
  position: absolute;
  width: 100%;
}

.fr-card--verso .fr-card {
  background: var(--blue-france-975-75);
}

.fr-card--verso .fr-callout {
  background: var(--blue-france-925-125);
}

.fr-card--verso .fr-card__end a {
  color: var(--blue-france-sun-113-625);
}

.fr-card--verso .fr-btn--close {
  position: absolute;
  top: 1rem;
  right: 2rem;
}

.affection-toggle {
  justify-content: flex-end;
  padding-top: 0;
}
.affection-toggle .fr-toggle__label {
  flex-basis: initial;
  font-size: smaller;
  margin-right: 1rem;
  width: initial;
}

.affection-toggle .fr-toggle__label:after {
  top: 0;
}

.fr-card__metadata {
  display: flex;
  align-items: center;
  gap: 8px;
}

</style>