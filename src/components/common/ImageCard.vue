<script setup>
// defineProps({
//     card: Object
// })

import { ref } from 'vue';

const cards = ref([
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8sgzRZllAB6iub5Cf8B9Z0OTaLLneSb3vtw&usqp=CAU",
        title: "여행지명",
        info: "정보"
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8sgzRZllAB6iub5Cf8B9Z0OTaLLneSb3vtw&usqp=CAU",
        title: "여행지명",
        info: "정보"
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8sgzRZllAB6iub5Cf8B9Z0OTaLLneSb3vtw&usqp=CAU",
        title: "여행지명",
        info: "정보"
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8sgzRZllAB6iub5Cf8B9Z0OTaLLneSb3vtw&usqp=CAU",
        title: "여행지명",
        info: "정보"
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8sgzRZllAB6iub5Cf8B9Z0OTaLLneSb3vtw&usqp=CAU",
        title: "여행지명",
        info: "정보"
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8sgzRZllAB6iub5Cf8B9Z0OTaLLneSb3vtw&usqp=CAU",
        title: "여행지명",
        info: "정보"
    },
])
</script>

<template>
    <div class="continer">
        <div class="row row-cols-3 m-5">
            <div class="card" style="width: 18rem;" v>
                <img class="card-img-top" src="..." alt="Card image cap">
                <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                        card's content.</p>
                </div>
            </div>
            <div class="card col" v-for="card in cards">
                <img class="card-img-top" :src="`${card.image}`" alt="Card image">
                <div class="card-body">
                    <h4 class="card-title">{{ card.title }}</h4>
                    <p class="card-text">{{ card.info }}</p>
                    <a href="#" class="btn btn-primary">자세히</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* .card {
    width: 100%;
    margin: 10px;
}

.img-wrapper {
    position: relative;
    width: 500px;
    height: 500px;
} */

.card>img {}
</style>