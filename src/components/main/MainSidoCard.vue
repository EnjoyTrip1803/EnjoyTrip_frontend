<script setup>
import { ref } from 'vue';
import ImageCard from "@/components/common/ImageCard.vue";
import { listArea } from "@/api/attraction";


const sidoList = ref(null);

const getSidoList = () => {
    listArea(
        0,
        ({ data }) => {
            let sidos = [];
            data.forEach((sido) => {
                sidos.push({ title: sido.sidoName, sidoCode: sido.sidoCode, image: sido.sidoImg, info: '정보...' });
            });
            sidoList.value = sidos;
        },
        (err) => {
            console.log(err);
        }
    );
};
getSidoList();
</script>

<template>
    <div class="row" id="card-wrapper">
        <div v-for="sido in sidoList" class="col-sm-5 col-xl-3 ">
            <ImageCard :card="sido" />
        </div>
    </div>
</template>

<style scoped>
#card-wrapper {
    margin: auto 10%;
}
</style>