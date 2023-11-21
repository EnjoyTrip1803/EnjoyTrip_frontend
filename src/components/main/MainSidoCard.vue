<script setup>
import { ref } from 'vue';
import ImageCard from "../components/common/ImageCard.vue";

const list = ref([1, 2, 3, 4, 5, 6])
</script>

<template>
   <div class="row" id="card-wrapper">
        <div v-for="i in list" class="col-sm-5 col-xl-3 ">
            <ImageCard card="card"/>
        </div>
   </div>
</template>

<style scoped>
#card-wrapper {
    margin: auto 10%;
}
</style>