<script setup>
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue"
</script>

<template>
    <div class="masthead">
        <TheHeadingNavbar :transparent="true"/>
        <div class="color-overlay d-flex justify-content-center align-items-center">
            <h1>Put It All Down For A While</h1>
        </div>
    </div>
</template>

<style scoped>
    .masthead {
        background-image: url('@/assets/img/banners/driving.png');
        height: 100vh;
        min-height: 400px;
        background-size: cover;
        position: relative;
        color: white;
        text-shadow: 2px 2px 2px rgba(0,0,0,.2);
    }

    h1{
        color:white;
    }

    .color-overlay{
        position: absolute;
        width: 100%;
        height:100%;
    }
</style>