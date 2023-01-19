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
