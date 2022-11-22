<script>
export default {
  data () {
    return {
      notificationSent: false
    }
  },

  methods: {
    sendTestNotification () {
      chrome.notifications.create(null, {
        title: "NumÉcoGestes",
        message: "Ceci est un exemple de notification.",
        iconUrl: '/icon.png',
        type: 'basic'
      });
      this.notificationSent = true;
    },

    onboard() {
      chrome.storage.local.set({ onboarding: { success: true } }, function  () {
        this.$parent.onboarded = true;
      }.bind(this));
    }
  }
}
</script>

<template>
  <DsfrBreadcrumb :links="[{ text: 'Bienvenue dans NumÉcoGestes' }]" />

  <main>
    <h1>Bienvenue dans NumÉcoGestes</h1>

    <p>NumÉcoGestes est un outil, extension de navigateur, proposée par la MiNumEco, permettant de savoir quand et quoi faire en cas de pic de consommation d’énergie.</p>

    <p>Cet outil envoie des notifications pour vous rappeler d'effectuer vos écogestes et vous alerter lors de périodes de forte consommation. Cliquez sur le bouton ci-dessous pour tester l'envoi de notification.</p>

    <button type="button" class="fr-btn fr-mb-4w" v-on:click="sendTestNotification">Recevoir une notification</button>

    <div v-if="notificationSent">
      <p>Elle sera affichée à l’écran. Si vous ne la voyez pas, vérifiez que les notifications sont activées au niveau de votre système.</p>

      <button type="button" class="fr-btn" @click.prevent="onboard">Je l'ai bien reçue !</button>
    </div>
  </main>
</template>
