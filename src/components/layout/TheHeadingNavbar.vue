<script setup>
import { useMenuStore } from "@/stores/menu";
import { storeToRefs } from "pinia";

const { menuList } = storeToRefs(useMenuStore());
const props = defineProps({
    transparent: {
        type: Boolean,
        default: false
    },
    light: {
        type: Boolean,
        default: false
    }
});

function getArrowColor() {
    if (props.transparent) {
        return DownArrWhite;
    } else {
        return ArrDark;
    }
}

const getTextColor = () => {
    let color;
    if (props.transparent) {
        color = "text-light";
    } else {
        color = "text-dark";
    }
    return color;
};

const handleScroll = (e) => { 
    if (e.target.scrollTop !== 0) {
        props.transparent = false;
        props.light = true;
    }
}
</script>

<template>
    <nav 
        class="navbar navbar-expand-lg sticky-top"  
        :class="{
            'z-index-3 w-100 shadow-none navbar-transparent ': props.transparent,
            'z-index-3 w-100 navbar-light bg-white ': props.light,
        }"
        v-on:scroll="handleScroll"
    >
        <div class="container">
            <router-link 
                :to="{ name: 'main' }" class="navbar-brand fw-bold" 
                :class="props.transparent ? 'text-white' : 'font-weight-bolder ms-sm-3'"
            >
                EnjoyTrip
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="d-flex" id="collapsibleNavbar">
                <ul class="navbar-nav mb-2 me-lg-0" v-for="menu in menuList" :key="menu.name">
                    <li class="nav-item" v-if="menu.show">
                        <router-link :to="{ name: menu.routeName }" class="nav-link" :class="getTextColor()" >{{ menu.name }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .navbar-brand {
        font-size: 22px;
    }

    .nav-link{
        font-size: 17px;
    }
</style>