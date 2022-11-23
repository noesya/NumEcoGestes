<script>
export default {
  props: ['score'],

  data () {
    return {
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
    networks() {
      return [
        { name: "facebook", icon: "facebook-circle-fill", label: "Partager sur Facebook", url: this.facebookUrl, onClick: this.openNetworkModal },
        { name: "twitter", icon: "twitter-fill", label: "Partager sur Twitter", url: this.twitterUrl, onClick: this.openNetworkWindow },
        { name: "linkedin", icon: "linkedin-box-fill", label: "Partager sur LinkedIn", url: this.linkedinUrl, onClick: this.openNetworkModal }
      ]
    },

    facebookUrl() {
      return `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.websiteUrl)}`;
    },

    twitterUrl() {
      const shareText = `Agir pour réduire sa consommation énergétique c'est simple avec #NumEcoGestes de la @Mi_NumEco_Gouv. Ce mois-ci j'ai cumulé ${this.score} points, et toi ?`;
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.websiteUrl)}&text=${encodeURIComponent(shareText)}`;
    },

    linkedinUrl() {
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.websiteUrl)}`;
    }
  },

  methods: {
    openNetworkModal(network) {
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

    openNetworkWindow(network) {
      window.open(network.url, network.label, 'toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450')
    },

    copyModalShareText() {
      document.querySelector("textarea#modalShareText").select();
      document.execCommand('copy');
    }
  }
}
</script>

<template>
  <div class="fr-share">
    <p class="fr-share__title fr-mr-3v fr-mb-0">Éclairez vos amis !</p>
    <ul class="fr-btns-group">
      <li v-for="network in networks">
        <a  :class="`fr-btn fr-btn--${network.name} fr-m-0 fr-mr-2v`" :title="`${network.label} - nouvelle fenêtre`" :href="network.url"
            target="_blank" rel="noopener noreferrer"
            @click.prevent="network.onClick(network)">
          {{ network.label }}
        </a>
      </li>
    </ul>
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
</template>

<style scoped>
.fr-share {
  flex-direction: row;
  align-items: center;
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

@media all and (-ms-high-contrast: none),
(-ms-high-contrast: active) {
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