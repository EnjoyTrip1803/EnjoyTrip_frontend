<script setup>
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue"
</script>

<template>
    <TheHeadingNavbar :light="true" :menus="false" :flulid="true" />
    <div class="min-vh-100">
        <router-view></router-view>
    </div>
</template>

<style scoped></style>