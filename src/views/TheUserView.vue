<script setup>
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue"
</script>

<template>
    <TheHeadingNavbar :light="true" :menus="false" :flulid="true" />
    <div>
        <router-view></router-view>
    </div>
</template>

<style scoped></style>