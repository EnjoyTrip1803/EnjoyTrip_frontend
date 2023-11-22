<script setup>
// defineProps({
//     card: Object
// })

import { ref } from 'vue';

const props = defineProps({
    card: Object
})

const onPlan = () => {
    // 클릭시 계획 페이지로 이동하기(param으로 sidoCode 넘기기)
}
console.log(props.card)
</script>

<template>
    <div class="card">
        <img class="card-img-top" :src="props.card.image" alt="Card image">
        <div class="card-body">
            <h4 class="card-title">{{ props.card.title }}</h4>
            <p class="card-text">{{ props.card.info }}</p>
            <button class="btn btn-primary" @click="onPlan">계획하기</button>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 100%;
    margin: 10px;
}

.img-wrapper {
    position: relative;
    width: 500px;
    height: 500px;
}

.card>img {}
</style>
