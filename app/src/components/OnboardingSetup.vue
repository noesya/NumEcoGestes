<script>
export default {
  methods: {
    sendTestNotification () {
      chrome.notifications.create(null, {
        title: "NumÉcoGestes",
        message: "Notification de test",
        iconUrl: '/icon.png',
        type: 'basic'
      });
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

    <button type="button" class="fr-btn fr-mb-4w" v-on:click="sendTestNotification()">Envoyer une notification de test</button>

    <p>Si vous l'avez reçue, <a href="#" @click.prevent="onboard">cliquez ici</a>, sinon, vérifiez que les notifications sont activées au niveau de votre système.</p>
  </main>
</template>
