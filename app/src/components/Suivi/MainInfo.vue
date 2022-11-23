<script>
import calendar from '../../data/calendar'

export default {
  data () {
    return {
      day: "",
      date: "1 janv.",
      hours: "00",
      minutes: "00",
      score: 0,
      websiteUrl: "https://ecoresponsable.numerique.gouv.fr/publications/numecogestes/",
      modalNetwork: null,
      modalShareText: '',
      openedModal: false,
      modalActions: [
        { label: "Partager", onClick: this.onModalClickShare, icon: "ri-share-box-line", iconRight: true },
        { label: "Annuler", secondary: true, onClick: this.onModalClose }
      ]
    }
  },

  computed: {
    networks () {
      return [
        { name: "facebook", icon: "facebook-circle-fill", label: "Partager sur Facebook", url: this.facebookUrl, onClick: this.openNetworkModal },
        { name: "twitter", icon: "twitter-fill", label: "Partager sur Twitter", url: this.twitterUrl, onClick: this.openNetworkWindow },
        { name: "linkedin", icon: "linkedin-box-fill", label: "Partager sur LinkedIn", url: this.linkedinUrl, onClick: this.openNetworkModal }
      ]
    },

    facebookUrl () {
      return `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.websiteUrl)}`;
    },

    twitterUrl () {
      const shareText = `Agir pour réduire sa consommation énergétique c'est simple avec #NumEcoGestes de la @Mi_NumEco_Gouv. Ce mois-ci j'ai cumulé ${this.score} points, et toi ?`;
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.websiteUrl)}&text=${encodeURIComponent(shareText)}`;
    },

    linkedinUrl () {
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.websiteUrl)}`;
    }
  },

  methods: {
    updateData () {
      const date = new Date()
      const monthDataKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}`
      this.day = calendar.dayNames[date.getDay()]
      this.date = `${date.getDate()} ${calendar.monthShortNames[date.getMonth()]}`
      this.hours = date.getHours().toString().padStart(2, 0)
      this.minutes = date.getMinutes().toString().padStart(2, 0)
      chrome.storage.local.get("months", function (data) {
        const monthsData = data.months || {},
          monthData = monthsData[monthDataKey] || { score: 0 }
        this.score = monthData.score
      }.bind(this))
    },

    openNetworkModal (network) {
      this.modalNetwork = network;
      this.modalShareText = `Agir pour réduire sa consommation énergétique c'est simple avec #NumEcoGestes. Ce mois-ci j'ai cumulé ${this.score} points, et toi ?`;
      this.openedModal = true;
    },

    onModalClickShare() {
      this.openNetworkWindow(this.modalNetwork);
    },

    onModalClose() {
      this.openedModal = false;
    },

    openNetworkWindow (network) {
      window.open(network.url, network.label, 'toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450')
    },

    copyModalShareText () {
      document.querySelector("textarea#modalShareText").select();
      document.execCommand('copy');
    }
  },

  mounted() {
    this.window = window;
    this.updateData();
    setInterval(this.updateData.bind(this), 1000);
  }
}
</script>

<template>
  <div class="fr-grid-row main-infos">
    <div class="score">
      <p class="main-infos__label fr-mb-0 fr-text--sm">Mon score</p>
      <p class="main-infos__value">{{ score }}</p>
    </div>
    <div class="actions">
      <div class="fr-share">
        <p class="fr-share__title">Éclairez vos amis !</p>
        <ul class="fr-btns-group">
          <li v-for="network in networks">
            <a  :class="`fr-btn fr-btn--${network.name}`" :title="`${network.label} - nouvelle fenêtre`" :href="network.url"
                target="_blank" rel="noopener noreferrer"
                @click.prevent="network.onClick(network)">
              {{ network.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <DsfrModal ref="modal" :opened="openedModal" :actions="modalActions" :origin="$refs.modalOrigin"
      @close="onModalClose()">
      <h1 class="fr-modal__title">
        <span :class="`fr-fi-${modalNetwork && modalNetwork.icon} fr-fi--lg`"></span>
        {{ modalNetwork && modalNetwork.label }}
      </h1>
      <label class="fr-label" for="modalShareText">Vous pouvez copier-coller ce texte pour partager votre score</label>
      <textarea id="modalShareText" class="fr-input fr-mb-2w" v-model="modalShareText"></textarea>
      <DsfrButton label="Copier" :tertiary="true" @click="copyModalShareText()" icon="ri-clipboard-line" />
    </DsfrModal>
  </div>
</template>

<style scoped>
.main-infos__value {
  font-size: 3rem;
  line-height: 3.5rem;
  margin-bottom: 0;
}
.main-infos {
  justify-content: start
}

.actions {
  margin-left: auto;
}

.fr-share .fr-btn--facebook::before {
  -webkit-mask-image: url("../../icons/logo/facebook-circle-fill.svg");
  mask-image: url("../../icons/logo/facebook-circle-fill.svg");
}

.fr-share .fr-btn--twitter::before {
  -webkit-mask-image: url("../../icons/logo/twitter-fill.svg");
  mask-image: url("../../icons/logo/twitter-fill.svg");
}

.fr-share .fr-btn--linkedin::before {
  -webkit-mask-image: url("../../icons/logo/linkedin-box-fill.svg");
  mask-image: url("../../icons/logo/linkedin-box-fill.svg");
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .fr-share .fr-btn--facebook::before {
    background-image: url("../../icons/logo/facebook-circle-fill.svg");
  }

  .fr-share .fr-btn--twitter::before {
    background-image: url("../../icons/logo/twitter-fill.svg");
  }

  .fr-share .fr-btn--linkedin::before {
    background-image: url("../../icons/logo/linkedin-box-fill.svg");
  }
}
</style>