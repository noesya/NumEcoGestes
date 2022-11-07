<script>
export default {
  data () {
    return {
      delayInSeconds: 0
    }
  },

  methods: {
    sendDelayedNotification () {
      chrome.runtime.sendMessage('', {
        type: 'ecogestes-debug-notification',
        delayInSeconds: this.delayInSeconds
      });
    }
  }
}
</script>

<template>
  <h2 class="fr-mt-2w fr-mb-1v">Débogage</h2>
  <label class="fr-label" for="delay-input">Délai (en secondes)</label>
  <input class="fr-input fr-mb-2w" type="number" min="0" step="1" value="0" v-model="delayInSeconds">
  <button class="fr-btn" type="button" v-on:click="sendDelayedNotification">Notification</button>
</template>