<script>
export default {
  methods: {
    sendTestNotification () {
      chrome.notifications.create(null, {
        title: "NumÉcoGestes",
        message: "Ceci est un exemple de notification.",
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
  <DsfrBreadcrumb :links="[{ text: 'Information' }]" />

  <main>
    <h1>Bienvenue sur l’extension NumÉcoGestes !</h1>

    <h2>Étape 1</h2>

    <p>Cet outil proposé par la MiNumEco vous permet de savoir comment contribuer à réduire la consommation électrique en cas de tension sur le réseau. Elle vous accompagne également au quotidien dans l’adoption des écogestes.</p>
    <p>Pour vous informer, l’extension vous envoie des notifications en cas d’alerte de tension ainsi qu’une notification quotidienne hors alerte. Vous pouvez vérifier que les notifications fonctionnent en cliquant ci-dessous. Celles-ci seront désactivables dans les réglages de l’extension.</p>

    <button type="button" class="fr-btn fr-mb-4w" v-on:click="sendTestNotification">Recevoir une notification</button>

    <h2>Étape 2</h2>

    <p>Si vous l’avez reçue, vous pouvez commencer à utiliser l’extension et à collecter des points (explication ci-dessous). Sinon, vérifiez que les notifications sont activées sur votre navigateur ou votre système d’exploitation.</p>

    <h2>Score et badges mensuels</h2>

    <p>Grâce à cette extension, vous collectez des points chaque fois que vous effectuez un écogeste. En fonction de votre score, vous pouvez débloquer des badges qui témoignent de vos efforts quotidiens.</p>
    <p>A chaque 1er du mois, le score est remis à zéro. Le score et les badges du mois en cours sont visibles sur la page d’accueil, et vous pouvez également consulter votre historique dans la page Activité qui sauvegarde votre score et les badges obtenus chaque mois. </p>

    <button type="button" class="fr-btn fr-btn--secondary" @click.prevent="onboard">Commencer à utiliser l’extension</button>
  </main>
</template>
