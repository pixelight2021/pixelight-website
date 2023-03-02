<template>
    <Three :editor="editor" />

    <div v-if="editor.viewType == VIEW_TYPE.OVERVIEW">
        <div v-if="isEnter" v-for="p, idx in PAGE" :id="p" class="fixed -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full anchor cursor-pointer" :class="isClick[idx] ? 'w-[140px] md:w-[240px] xl:w-[280px]' : 'w-6 md:w-14 xl:w-20 border border-black'" @click="handleAnchorClick(p)">
            <span v-if="!isClick[idx]" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 aspect-square w-[3px] md:w-[6px] xl:w-[9px] bg-black"></span>
            <PageRing v-if="isClick[idx]" />
            <div v-if="isClick[idx]" class="rounded-full overflow-hidden m-4">
                <img :src="`image/${p}.jpg`" class="w-full" />
            </div>
        </div>
    </div>

    <div class="absolute w-full h-full px-page-padding-sm z-10 flex justify-center items-center" :class="{ 'pointer-events-none': isEnter }" @click="handleEnter">
        <div class="max-w-[1474px] text-h4 md:text-h3 xl:text-h2 text-center transition-opacity" :class="isEnter ? 'opacity-0' : 'opacity-full'">
            PIXELIGHT is a Design Team Founded in 2020. We Focus on Creating Interactive Experiences and Digital Art.
            <br>
            <span class="text-bdy-sm md:text-bdy-lg xl:text-h6 text-secondary-dark">
                CLICK TO EXPLORE MORE
            </span>
        </div>
    </div>

    <div v-if="isEnter" class="fixed top-0 w-full h-full z-10 flex flex-col justify-center items-center" :class="{ 'pointer-events-none': editor.viewType != VIEW_TYPE.ROADVIEW }">
        <div class="flex justify-between" :class="editor.viewType == VIEW_TYPE.ROADVIEW ? 'opacity-100' : 'opacity-0'">
            <button v-if="deviceSize < DEVICE_SIZE.MD" class="relative self-start top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-8 rounded-full bg-secondary text-center" @click="handleRoadViewArrowClick(-1)">
                <span class="absolute -left-1 -top-1 aspect-square w-10 rounded-full border border-secondary"></span>
                <span class="material-symbols-outlined align-middle leading-[32px] font-thin">arrow_back</span>
            </button>
            <div class="relative transition-opacity anchor cursor-pointer" :class="editor.viewType == VIEW_TYPE.ROADVIEW ? 'w-[140px] md:w-[240px] xl:w-[280px]' : 'w-0 h-0'" @click="handleEnterPage(editor.page)">
                <PageRing />
                <div class="rounded-full overflow-hidden m-4">
                    <img :src="`image/${editor.page}.jpg`" class="w-full" />
                </div>
            </div>
            <button v-if="deviceSize < DEVICE_SIZE.MD" class="relative self-start top-1/2 translate-x-1/2 -translate-y-1/2 aspect-square w-8 rounded-full bg-secondary text-center" @click="handleRoadViewArrowClick(1)">
                <span class="absolute -left-1 -top-1 aspect-square w-10 rounded-full border border-secondary"></span>
                <span class="material-symbols-outlined align-middle leading-[32px] font-thin">arrow_forward</span>
            </button>
        </div>

        <div class="flex">
            <button v-if="editor.viewType == VIEW_TYPE.ROADVIEW && deviceSize >= DEVICE_SIZE.MD" class="relative self-start top-[80px] xl:top-[120px] -translate-x-1/2 -translate-y-1/2 aspect-square w-12 rounded-full bg-secondary text-center xl:scale-150" @click="handleRoadViewArrowClick(-1)">
                <span class="absolute -left-1 -top-1 aspect-square w-14 rounded-full border border-secondary"></span>
                <span class="material-symbols-outlined align-middle xl:text-h5 font-thin">arrow_back</span>
            </button>

            <div id="title" class="mt-8 mx-12 mb-48 h-[64px] md:h-[96px] xl:h-[160px] leading-[64px] md:leading-[96px] xl:leading-[160px] text-h1 md:text-[96px] xl:text-[160px] text-center font-semibold uppercase overflow-hidden">
                <div v-for="character in title" class="inline-block">{{ character }}</div>
            </div>

            <button v-if="editor.viewType == VIEW_TYPE.ROADVIEW && deviceSize >= DEVICE_SIZE.MD" class="relative self-start top-[80px] xl:top-[120px] translate-x-1/2 -translate-y-1/2 aspect-square w-12 rounded-full bg-secondary text-center xl:scale-150" @click="handleRoadViewArrowClick(1)">
                <span class="absolute -left-1 -top-1 aspect-square w-14 rounded-full border border-secondary"></span>
                <span class="material-symbols-outlined align-middle xl:text-h5 font-thin">arrow_forward</span>
            </button>
        </div>
    </div>



    <div class="absolute bottom-0 w-full px-page-padding-sm md:px-page-padding-md z-10 transition-opacity flex flex-col lg:flex-row" :class="isEnter ? 'opacity-full' : 'hidden opacity-0'">
        <div class="lg:mr-16 text-bdy-sm xl:text-h6 lg:font-medium">
            View Types
            <div class="mt-2 flex text-xs xl:text-sm">
                <button class="mr-6 inline-block px-2 py-1 rounded-full border border-secondary-dark text-secondary-dark" :class="{ 'bg-black border-none text-[#fff]': editor.viewType == VIEW_TYPE.OVERVIEW }" @click="handleViewTypeClick(VIEW_TYPE.OVERVIEW)">OVERVIEW</button>
                <button class="mr-6 inline-block px-2 py-1 rounded-full border border-secondary-dark text-secondary-dark" :class="{ 'bg-black border-none text-[#fff]': editor.viewType == VIEW_TYPE.ROADVIEW }" @click="handleViewTypeClick(VIEW_TYPE.ROADVIEW)">ROADVIEW</button>
            </div>
        </div>

        <div class="flex-1 mt-5 lg:mt-0 text-bdy-sm xl:text-h6 lg:font-medium">
            Visualization Editors
            <div class="mt-2 flex flex-col lg:grid lg:grid-cols-3 lg:gap-x-8 ">
                <div class="py-1 grid grid-cols-input gap-x-2 items-center text-xs xl:text-sm">
                    <span>Hue</span>
                    <input v-model="editor.hue" type="range" class="shader-input" step="0.01" min="-0.5" max="0.5" />
                </div>
                <div class="py-1 grid grid-cols-input gap-[10px] items-center text-xs xl:text-sm">
                    <span>Speed</span>
                    <input v-model="editor.speed" type="range" class="shader-input" step="0.01" min="0.0" max="3.0" />
                </div>
                <div class="py-1 grid grid-cols-input gap-[10px] items-center text-xs xl:text-sm">
                    <span>Dimmer</span>
                    <input v-model="editor.dimmer" type="range" class="shader-input" step="0.01" min="0.0" max="1.0" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DEVICE_SIZE } from '~~/composables/device'

import { gsap, Power2 } from 'gsap'

import PageRing from '@/assets/svg/pageRing.svg'

import { PAGE, VIEW_TYPE } from '~~/composables/editor'

const router = useRouter()
const { locale } = useI18n()
const deviceSize = inject('deviceSize')

const isEnter = ref(false)
function handleEnter() {
    isEnter.value = true
}

const title = ref()
const isClick = ref(new Array(3).fill(false))
/* default Visualization Editors value */
const editor = ref({
    page: null,
    viewType: VIEW_TYPE.OVERVIEW,
    hue: 0,
    speed: 0.3,
    dimmer: 1
})

function handleEnterPage(page) {
    if (page == PAGE[2]) { //contact
        router.push(`/${locale.value}/about`)
        setTimeout(() => { window.scrollTo(0, document.querySelector('footer').offsetTop) }, 0)
        return
    }

    router.push(`/${locale.value}/${page}`)
}

function handleAnchorClick(page) {
    if (editor.value.page == page) {
        handleEnterPage(page)
        return
    }

    const idx = PAGE.indexOf(page)
    isClick.value = isClick.value.map((v, i) => i == idx)
    editor.value.page = page
    title.value = Array.from(page)

    setTimeout(() => {
        const characters = Array.from(document.querySelector('#title').children)
        for (let i = 0; i < characters.length; i++) {
            gsap.from(characters[i], { duration: 0.35, delay: 0.03 * i, ease: Power2.easeOut, y: 160 })
        }
    }, 0)
}

function handleViewTypeClick(viewType) {
    editor.value.viewType = viewType

    if (viewType != VIEW_TYPE.ROADVIEW || editor.value.page) return
    handleAnchorClick(PAGE[0])
}

function handleRoadViewArrowClick(dir) {
    let idx = (PAGE.indexOf(editor.value.page) + dir) % PAGE.length
    idx = idx >= 0 ? idx : PAGE.length - 1
    handleAnchorClick(PAGE[idx])
}
</script>

<style>
.anchor {
    transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1), height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.shader-input {
    -webkit-appearance: none;
    min-width: none;
    top: 12px;
    height: 1px;
    background: black;
}

.shader-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    aspect-ratio: 1/1;
    width: 12px;
    border-radius: 50%;
    border: 1px solid black;
    background: white;
}



.child {
    height: 100%;
    background-color: red;
}
</style>