<template>
    <div class="z-10 text-center">
            <h4 class="text-[34px]">
                Pixelight is a Design Team Founded in 2020. We Focus on Creating Interactive Experiences and Digital Art.
            </h4>
            <div class="flex justify-center items-center mt-4">
                <span class="material-symbols-outlined mr-3">360</span>
                ROTATE TO EXPLORE
            </div>
        </div>
    <ClientOnly>
        <Three />
    </ClientOnly>
</template>

<script setup>
import Three from '../components/Three.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&family=Noto+Sans+TC:wght@300;400;500&display=swap');

html {
    height: 100%;
}

body {
    font-family: 'Montserrat', 'Noto Sans TC', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #F5F5F5;
    height: 100%;
    margin: 0px;
}

#__nuxt {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0px 24px;
}
</style>