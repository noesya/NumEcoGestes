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
    <p>Pages</p>
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

    <div class="fr-grid-row">
      <div class="fr-col">
        <DsfrToggleSwitch v-model="alertNotificationEnabled" label="Alertes de tension réseau" hint="Les alertes de tension sur le réseau concernent des tranches horaires d’une heure." />
        <DsfrToggleSwitch v-model="dailyNotificationEnabled" label="Quotidiennes" hint="Une seule notification par jour." />
      </div>
      <div class="fr-col">
        <p class="fr-mb-1w">Ressources utiles</p>
        <p class="fr-mb-2w"><a href="https://ecoresponsable.numerique.gouv.fr/" target="_blank">Site de la MiNumEco</a></p>
        <p class="fr-mb-2w"><a href="#" target="_blank">Diffuser l'extension</a></p>
        <p class="fr-mb-2w"><a href="https://github.com/noesya/numecogestes" target="_blank">Code source</a></p>
        <p class="fr-mb-2w"><a href="https://www.monecowatt.fr/" target="_blank">MonEcowatt.fr</a></p>
      </div>
      <div class="fr-col">
        <p class="fr-mb-1w">Une extension proposée par</p>
        <p class="fr-logo">République<br>Française</p>
      </div>
    </div>

    <div class="extension fr-mb-2w">
      <p>Extension</p>

      <DsfrButton label="Réinitialiser mon score" :secondary="true" @click="openResetModal()" ref="modalOrigin" />
    </div>

    <p>Les illustrations utilisées sont créditées et libres de droit.</p>

    <DsfrModal ref="modal" :opened="openedModal" :actions="modalActions" :is-alert="isAlert" title="Réinitialiser mon score" :origin="$refs.modalOrigin" @close="onModalClose()">
      <p>Êtes-vous sûr(e) ? Vous allez perdre toute votre progression.</p>
    </DsfrModal>
  </main>
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
  /* flex-direction: row-reverse; */
}

.fr-toggle__label:before {
  display: none;
}
</style>