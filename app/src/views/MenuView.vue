<script>
export default {
  props: ['receiveAlerts', 'receiveDailyNotification'],
  data () {
    return {
      dailyNotificationEnabled: true,
      alertNotificationEnabled: true,
      openedModal: false,
      modalActions: [
        { label: "Réinitialiser mon score", onClick: this.onModalClickReset },
        { label: "Annuler", secondary: true, onClick: this.onModalClose },
      ]
    }
  },

  watch: {
    dailyNotificationEnabled: function (value) {
      chrome.storage.local.set({ dailyNotification: { enabled: value } });
    },
    alertNotificationEnabled: function (value) {
      chrome.storage.local.set({ alertNotification: { enabled: value } });
    }
  },

  methods: {
    openResetModal () {
      this.openedModal = true;
    },

    onModalClickReset () {
      chrome.storage.local.remove("months").then(function () {
        this.onModalClose();
      }.bind(this));
    },

    onModalClose () {
      this.openedModal = false;
    }
   },

  mounted () {
    chrome.storage.local.get('dailyNotification', function (data) {
      this.dailyNotificationEnabled = data.dailyNotification.enabled;
    }.bind(this));
    chrome.storage.local.get('alertNotification', function (data) {
      this.alertNotificationEnabled = data.alertNotification.enabled;
    }.bind(this));
  }
}
</script>

<template>
  <DsfrBreadcrumb
    :links="[{text: 'Menu'}]"
    />
  <main>
    <div class="fr-grid-row fr-mb-5w">
      <div class="fr-col">
        <router-link to="/" class="fr-btn fr-icon-home-4-line" title="Accueil"></router-link>
        <router-link to="/" class="menu-link">Accueil</router-link>
      </div>
      <div class="fr-col">
        <router-link to="/suivi" class="fr-btn fr-icon-leaf-line" title="Suivi d'activité"></router-link>
        <router-link to="/suivi" class="menu-link">Suivi d'activité</router-link>
      </div>
      <div class="fr-col">
        <router-link to="/ecogestes" class="fr-btn fr-icon-list-unordered" title="Liste d'écogestes"></router-link>
        <router-link to="/ecogestes" class="menu-link">Liste d'écogestes</router-link>
      </div>
    </div>

    <p>Réglages</p>

    <div class="fr-grid-row fr-grid-row--gutters fr-mb-5w">
      <div class="fr-col">
        <div class="fr-toggle fr-toggle--label-left">
          <input type="checkbox" id="alert-notification" v-model="alertNotificationEnabled" class="fr-toggle__input" aria-describedby="alert-notif-hint-text">
          <label class="fr-toggle__label" for="alert-notification">Alertes de tensions</label>
          <p id="alert-notif-hint-text" class="fr-hint-text">Ces alertes surviennent 5 minutes avant une tension <u>orange</u> ou <u>rouge</u> prévue sur le réseau électrique. Une alerte correspond à une tranche horaire d’une heure.</p>
        </div>
      </div>
      <div class="fr-col">
        <div class="fr-toggle fr-toggle--label-left">
          <input type="checkbox" id="daily-notification" v-model="dailyNotificationEnabled" class="fr-toggle__input" aria-describedby="daily-notif-hint-text">
          <label class="fr-toggle__label" for="daily-notification">Alertes quotidiennes</label>
          <p id="daily-notif-hint-text" class="fr-hint-text">Une notification est envoyée chaque jour afin de vous permettre de consulter les écogestes proposés et d’augmenter votre score.</p>
        </div>
      </div>
      <div class="fr-col">
        <div class="fr-mb-1w">
          <DsfrButton label="Supprimer toutes les données" :secondary="true" @click="openResetModal()" ref="modalOrigin" />
        </div>
        <p class="fr-hint-text">En cliquant sur ce bouton, vous supprimerez toutes les données locales de l’extension : votre score, vos badges et votre historique.</p>
      </div>
    </div>
    <div class="fr-grid-row">
      <div class="fr-col">
        <p class="fr-mb-1w">Une extension proposée par</p>
        <div class="fr-grid-row">
          <div class="fr-col">
            <p class="fr-logo">République<br>Française</p>
          </div>
          <div class="fr-col">
            <p>TODO : Logo MiNumEco</p>
          </div>
        </div>
      </div>
      <div class="fr-col">
        <p class="fr-mb-1w">Ressources utiles</p>
        <p class="fr-mb-2w"><a href="https://ecoresponsable.numerique.gouv.fr/publications/numecogestes/" target="_blank">Diffuser l'extension</a></p>
        <p class="fr-mb-2w"><a href="https://github.com/DISIC/numecogestes" target="_blank">Code source</a></p>
        <p class="fr-mb-2w"><a href="https://www.monecowatt.fr/" target="_blank">MonEcowatt.fr</a></p>
      </div>
    </div>
    <div class="fr-grid-row">
      <div class="fr-col">
        <p class="fr-mb-1w">Illustrations des écogestes</p>
        <p class="fr-hint-text fr-mb-2w">Toutes les images utilisées pour illustrer les écogestes sont libres de droit et ont été compressées afin de limiter au maximum le poids de l’extension.</p>
        <p class="fr-hint-text">Photographes : Bernard Hermant, John Smit, Isabella and Zsa Fischer, Christin Hume, rawpixel.com, Chuttersnap, Compare Fibre, Isaac Li Shung Tan.</p>
      </div>
      <div class="fr-col">
        <p class="fr-mb-1w">Conception</p>
        <p class="fr-hint-text">Extension conçue et développée avec Ctrl S et Noesya.</p>
      </div>
    </div>
  </main>

  <div class="reset-modal-container">
    <DsfrModal ref="modal" :opened="openedModal" :actions="modalActions" title="Vous êtes sur le point de réinitialiser votre score d’activité." :origin="$refs.modalOrigin" @close="onModalClose()">
      <p>Si vous continuez, tous les points que vous avez gagnés depuis l'installation de l'extension et les badges associés seront remis à zéro. Vous pourrez quand même gagner des points et des badges en déclarant à nouveau des écogestes.</p>
    </DsfrModal>
  </div>
</template>

<style scoped>
.fr-col a {
  vertical-align: middle;
}

.menu-link {
  font-size: 1.25rem;
  margin-left: 1rem;
}

.fr-toggle {
  padding-top: 0;
}

.fr-toggle label:after {
  top: 0;
}

</style>