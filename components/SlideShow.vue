<template>
    <ul ref="container" class="keen-slider">
        <li v-for="id in images" class="keen-slider__slide rounded-[10px] min-w-[234px] max-w-[234px] md:min-w-[216px] md:max-w-[216px] xl:min-w-[316px] xl:max-w-[316px]">
            <Image class="w-full h-full" :media-id="id" />
        </li>

        <button class="absolute left-9 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-8 rounded-full bg-[#D3D3D3] text-center"
            @click="slider.prev()">
            <span
                class="absolute -left-1 -top-1 aspect-square w-10 rounded-full border border-[#D3D3D3]"></span>
            <span class="material-symbols-outlined text-white align-middle leading-[32px]">west</span>
        </button>

        <button class="absolute right-9 top-1/2 translate-x-1/2 -translate-y-1/2 aspect-square w-[32px] rounded-full bg-[#D3D3D3] text-center"
            @click="slider.next()">
            <span
            class="absolute -left-1 -top-1 aspect-square w-10 rounded-full border border-[#D3D3D3]"></span>
            <span class="material-symbols-outlined text-white align-middle leading-[32px]">east</span>
        </button>
    </ul>
</template>

<script setup>
import { useKeenSlider } from 'keen-slider/vue.es'
import 'keen-slider/keen-slider.min.css'

const props = defineProps(['images', 'origin'])
const [container, slider] = useKeenSlider({
    loop: true,
    slides: {
        origin: props.origin || 0,
        perView: 'auto',
        spacing: 30
    }
})

</script>