<script setup>
import { RouterView } from "vue-router";
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue"
import TheBottomBar from "@/components/layout/TheBottomBar.vue"
</script>

<template>
  <TheHeadingNavbar/>
  <router-view></router-view>
  <TheBottomBar/>
</template>

<style scoped>

</style>