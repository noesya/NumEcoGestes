<script>
  export default {
    props: ['ecogesteKey', 'ecogeste', 'buttons', 'answered'],

    data () {
      return {
        showButtons: this.buttons || false
      }
    },

    methods: {
      humanizedTag() {
        switch (this.ecogeste.tag) {
          case "je-baisse":
            return "Je baisse";
          case "j-eteins":
            return "J'éteins";
          case "je-decale":
            return "Je décale";
        }
      },

      portraitImageUrl() {
        return `/assets/images/ecogestes/portrait/${this.ecogesteKey}.png`
      }
    }
  }
</script>

<template>
  <div v-if="ecogeste">
    <div class="fr-card--recto" v-if="!answered">
      <div class="fr-card fr-card--horizontal fr-card--horizontal-half">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <div class="fr-card__start fr-mb-2w">
              <p class="fr-tag">{{ humanizedTag() }}</p>
            </div>
            <h3 class="fr-card__title">{{ ecogeste.title }}</h3>
            <p class="fr-card__desc">{{ ecogeste.description }}</p>
            <div class="fr-card__end" v-if="showButtons">
              <ul class="fr-btns-group fr-btns-group--inline-md">
                <li><button class="fr-btn" v-on:click="$parent.answerEcogeste">Je le fais !</button></li>
                <li><button class="fr-btn fr-btn--secondary" v-on:click="$parent.nextEcogeste">Geste suivant</button></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="fr-card__header">
          <div class="fr-card__img">
            <p class="fr-badge fr-badge--no-icon">{{ ecogeste.points }} points</p>
            <img class="fr-responsive-img" :src="portraitImageUrl()" :alt="ecogeste.title" />
            <p class="fr-card__img__credit">{{ ecogeste.credit }}</p>
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
              <p class="fr-badge fr-badge--no-icon">{{ ecogeste.points }} points</p>
            </div>
            <h3 class="fr-card__title">{{ ecogeste.thanks }}</h3>
            <div class="fr-callout fr-card__desc">
              <h3 class="fr-callout__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libro et.</h3>
              <p class="fr-callout__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio
                mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. aptent taciti sociosqu ad
                litora torquent nostra. Class aptent taciti sociosqu ad.
              </p>
            </div>
            <div class="fr-card__end">
              <p><a href="#" target="_blank" rel="noopener">Lien vers la source</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>