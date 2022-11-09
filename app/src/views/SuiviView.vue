<script setup>
import MainInfo from '../components/Suivi/MainInfo.vue'
import Progress from '../components/Suivi/Progress.vue'
import History from '../components/Suivi/History.vue'
</script>

<template>
  <DsfrBreadcrumb :links="[{ text: 'Menu', to: '/menu' }, { text: 'Suivi d\'activité' }]" />
  <main>
    <MainInfo />
    <Progress />
    <History />
  </main>
</template>
