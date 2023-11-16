<script setup>
import { ref } from 'vue';
import { useMenuStore } from "@/stores/menu";
import { storeToRefs } from "pinia";

const { menuList } = storeToRefs(useMenuStore());
const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};
</script>

<template>
    <nav class="navbar navbar-expand-sm bg-light navbar-light shadow">
        <div class="container">
            <router-link :to="{ name: 'main' }" class="navbar-brand">EnjoyTrip</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link :to="{ name: 'attraction' }" class="nav-link">여행</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'board' }" class="nav-link">게시판</router-link>
                    </li>
                </ul>

                <div id="login_confirm_off" style="display: block;">
                    <ul class="navbar-nav me-2" v-for="menu in menuList" :key="menu.name">
                        <li class="nav-item" v-if="menu.show">
                            <router-link :to="{ name: menu.routeName }" class="nav-link">{{ menu.name }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>