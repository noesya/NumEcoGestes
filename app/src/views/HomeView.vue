<script setup>
  import MainInfo from '../components/Home/MainInfo.vue'
  import Daysplit from '../components/Home/Daysplit.vue'
  import Ecogeste from '../components/Home/Ecogeste.vue'
  import Debug from '../components/Home/Debug.vue'
</script>

<template>
  <DsfrBreadcrumb
    :links="[{text: 'Menu', to: '/menu'}, {text: 'Accueil météo'}]"
    />
  <main>
    <MainInfo />
    <Daysplit />
    <Ecogeste />
    <Debug />
  </main>
</template>
