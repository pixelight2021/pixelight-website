<template>
    <div class="pt-8 md:pt-12 pb-3 bg-white">
        <div class="text-center">
            <div v-if="locale == 'zh'">
                <div class="text-h4 leading-[100%]">合作單位</div>
                <div class="text-stl-sm">Our Clients</div>
            </div>
            <div v-if="locale == 'en'">
                <div class="text-h4">Our Clients</div>
            </div>
        </div>

        <div class="relative mt-8 md:mt-16 mx-14 xl:mx-auto xl:max-w-[1080px]" :class="locale == 'zh' ? 'md:mx-[131px]' : 'md:mx-[83px]'">
            <div ref="clientContainer" class="keen-slider min-h-[128px]">
                <div v-for="c in clients" class="keen-slider__slide px-3 flex flex-col justify-center items-center">
                    <Image class="aspect-square h-[48px] md:h-[96px]" :media-id="c.acf.icon" :fallback="false" :full-screen="false" />
                    <div class="mt-[7px] text-ovr  text-center" :class="{ 'md:text-bdy-lg': locale == 'zh' }">{{ c.acf.name[`${locale}`] }}</div>
                </div>
            </div>

            <!-- previous -->
            <button class="absolute -left-7 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-8 rounded-full text-center slider-arrow" @click="clientSlider.prev()">
                <span class="absolute -left-1 -top-1 aspect-square w-10 rounded-full border border-secondary hover:border-theme-yellow"></span>
                <span class="material-symbols-outlined align-middle leading-[32px] font-thin">arrow_back</span>
            </button>

            <!-- next -->
            <button class="absolute -right-7 top-1/2 translate-x-1/2 -translate-y-1/2 aspect-square w-[32px] rounded-full text-center slider-arrow" @click="clientSlider.next()">
                <span class="absolute -left-1 -top-1 aspect-square w-10 rounded-full border border-secondary hover:border-theme-yellow"></span>
                <span class="material-symbols-outlined align-middle leading-[32px] font-thin">arrow_forward</span>
            </button>
        </div>

        <div class="mt-4 mx-auto px-14 md:px-[131px] xl:px-[228px] xl:max-w-[1920px] flex justify-center items-center">
            <span v-if="deviceSize >= DEVICE_SIZE.XL" class="mr-4 xl:mr-8">01</span>
            <div v-for="i in clients.length - getPerView() + 1" class="flex-1 h-px bg-secondary transition-colors" :class="{ 'bg-black': current == i - 1 }"></div>
            <span v-if="deviceSize >= DEVICE_SIZE.XL" class="ml-4 xl:ml-8">{{ clients.length < 10 ? '0' + clients.length : clients.length }}</span>
        </div>
        <div ref="client_slider_hint" class="mt-6 text-secondary text-center text-ovr transition-opacity duration-300">SLIDE TO EXPLORE</div>
    </div>
</template>

<script setup>
import { DEVICE_SIZE } from '~~/composables/device'

import { useKeenSlider } from 'keen-slider/vue.es';
import 'keen-slider/keen-slider.min.css'

const deviceSize = inject('deviceSize')
const { locale } = useI18n()

const current = ref(0)
const [clientContainer, clientSlider] = useKeenSlider({
    slides: {
        origin: 'auto',
        perView: getPerView()
    },
    slideChanged: (s) => {
        client_slider_hint.value.style.opacity = 0;
        current.value = s.track.details.abs
    }
})
const appConfig = useAppConfig()
const clients = appConfig.clients
const client_slider_hint = ref()

function getPerView() {
    if (deviceSize.value < DEVICE_SIZE.MD) return 2
    if (deviceSize.value < DEVICE_SIZE.XL) return 3
    return 4
}

function handleResize() {
    clientSlider.value.options.slides.perView = getPerView()
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.slider-arrow {
    @apply bg-secondary transition-colors
}

.slider-arrow:hover {
    @apply bg-gradient-to-r from-theme-pink to-theme-yellow
}
</style>