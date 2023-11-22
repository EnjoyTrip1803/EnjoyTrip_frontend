<script setup>
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue"
</script>

<template>
  <TheHeadingNavbar :light="true" />
  <div class="container text-center mt-3 min-vh-100">
    <div class="alert alert-info" role="alert">자유롭게 글쓰는 공간</div>
    <router-view></router-view>
  </div>
</template>

<style>
mark.sky {
  background: linear-gradient(to top, #54fff9 20%, transparent 30%);
}
</style>
