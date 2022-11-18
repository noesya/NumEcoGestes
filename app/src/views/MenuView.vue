<script>
export default {
  props: ['receiveAlerts', 'receiveDailyNotification'],
  data () {
    return {
      dailyNotificationEnabled: true,
      alertNotificationEnabled: true,
      openedModal: false,
      modalActions: [
        { label: "Valider", onClick: this.onModalClickReset },
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

    <div class="fr-grid-row fr-grid-row--gutters fr-mb-5w">
      <div class="fr-col">
        <div class="fr-toggle fr-toggle--label-left">
          <input type="checkbox" id="alert-notification" v-model="alertNotificationEnabled" class="fr-toggle__input" aria-describedby="alert-notif-hint-text">
          <label class="fr-toggle__label" for="alert-notification">Alertes de tensions oranges et rouges</label>
          <p id="alert-notif-hint-text" class="fr-hint-text">Ces alertes surviennent 5 minutes avant une tension orange ou rouge prévue sur le réseau électrique. Une alerte correspond à une tranche horaire d’une heure.</p>
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
        <DsfrButton label="Réinitialiser mon score" @click="openResetModal()" ref="modalOrigin" />
      </div>
    </div>
    <div class="fr-grid-row">
      <div class="fr-col">
        <p class="fr-mb-1w">Une extension proposée par</p>
        <p class="fr-logo">République<br>Française</p>
      </div>
      <div class="fr-col">
        <p class="fr-mb-1w">Ressources utiles</p>
        <p class="fr-mb-2w"><a href="https://ecoresponsable.numerique.gouv.fr/" target="_blank">Diffuser l'extension</a></p>
        <p class="fr-mb-2w"><a href="https://github.com/noesya/numecogestes" target="_blank">Code source</a></p>
        <p class="fr-mb-2w"><a href="https://www.monecowatt.fr/" target="_blank">MonEcowatt.fr</a></p>
      </div>
      <div class="fr-col">
        <p class="fr-mb-1w">Illustrations des écogestes</p>
        <p class="fr-hint-text">Toutes les images utilisées pour illustrer les écogestes sont libres de droit et ont été compressées afin de limiter au maximum le poids de l’extension.</p>
      </div>
    </div>
  </main>

  <DsfrModal ref="modal" :opened="openedModal" :actions="modalActions" :is-alert="isAlert" title="Réinitialiser mon score" :origin="$refs.modalOrigin" @close="onModalClose()">
    <p>Êtes-vous sûr(e) ? Vous allez perdre toute votre progression.</p>
  </DsfrModal>
</template>

<style scoped>
.fr-col a {
  vertical-align: middle;
}

.menu-link {
  font-size: 1.25rem;
  margin-left: 1rem;
}

</style>