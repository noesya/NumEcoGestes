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
        { label: "Partager", onClick: this.onModalClickShare },
        { label: "Annuler", secondary: true, onClick: this.onModalClose }
      ]
    }
  },

  computed: {
    networks () {
      return [
        { name: "facebook", label: "Partager sur Facebook", url: this.facebookUrl, onClick: this.openNetworkModal },
        { name: "twitter", label: "Partager sur Twitter", url: this.twitterUrl, onClick: this.openNetworkWindow },
        { name: "linkedin", label: "Partager sur LinkedIn", url: this.linkedinUrl, onClick: this.openNetworkModal }
      ]
    },

    shareText () {
      return `J'ai un score de ${this.score} points sur NumÉcoGestes ! Téléchargez l'extension !`;
    },

    facebookUrl () {
      return `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.websiteUrl)}`;
    },

    twitterUrl () {
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.websiteUrl)}&text=${encodeURIComponent(this.shareText)}`;
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
      this.modalShareText = this.shareText;
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
        <p class="fr-share__title">Partager mon score</p>
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

    <DsfrModal ref="modal" :opened="openedModal" :actions="modalActions"
      :title="modalNetwork && modalNetwork.label" :origin="$refs.modalOrigin"
      @close="onModalClose()">
      <label class="fr-label" for="modalShareText">Texte de partage</label>
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

</style>