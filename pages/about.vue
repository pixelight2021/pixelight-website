<template>
    <Logo class="fill-white mx-auto mt-20 w-[60%] min-w-[214px] max-w-[632px]" />

    <div class="mx-auto mt-8 max-w-[480px] text-h5 md:text-h4 md:text-h2 text-center">"Let Us Creating Interactive Experiences Together."</div>

    <div class="relative h-20">
        <div class="absolute left-1/4 bottom-0 -translate-x-1/2 translate-y-1/2 aspect-square w-10 rounded-full border border-black">
            <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 aspect-square w-[6px] bg-black "></span>
        </div>
        <span class="absolute left-1/4 right-0 bottom-0 translate-y-1/2 h-px bg-gradient-to-r from-black to-theme-yellow "></span>
    </div>

    <div v-if="deviceSize < DEVICE_SIZE.MD">
        <div class="mt-20">
            <div v-if="locale == 'zh'" class="relative mx-auto w-[250px]">
                <Concept_zh class="w-full" />
                <div class="absolute top-[70px] right-0 text-bdy-sm">反<br />射</div>
                <div class="absolute top-[158px] left-[61px] text-bdy-sm">穿<br />透</div>
                <div class="absolute top-[240px] right-0 text-bdy-sm">折<br />射</div>
            </div>
            <div v-if="locale == 'en'" class="relative mx-auto w-[296px]">
                <Concept_en class="w-full" />
                <div class="absolute top-[19px] right-0 text-bdy-sm">Reflection</div>
                <div class="absolute top-[55px] right-0 text-bdy-sm">Refraction</div>
                <div class="absolute top-[91px] right-0 text-bdy-sm">Penetration</div>
            </div>
        </div>

        <div class="mt-12 px-page-padding-sm">
            <div>
                <div v-if="locale == 'zh'" class="inline-flex flex-col items-center">
                    <div class="text-h4">關於</div>
                    <div class="text-h4 leading-[100%]">我們</div>
                    <div class="text-stl-sm">About Us</div>
                </div>
                <div v-if="locale == 'en'">
                    <div class="text-h4">About Us</div>
                </div>
                <div class="absolute left-0 w-1/2 h-px bg-gradient-to-r from-theme-pink to-theme-yellow"></div>
            </div>
            <p class="mt-6">{{ $t('about_us') }}</p>
        </div>
    </div>

    <div v-if="deviceSize >= DEVICE_SIZE.MD" class="mt-20 mx-auto xl:px-[228px] max-w-[1920px] flex justify-center" :class="locale == 'zh' ? 'px-[131px]' : 'px-[83px]'">
        <div>
            <div v-if="locale == 'zh'" class="inline-flex flex-col items-center">
                <div class="text-h4 xl:text-h3">關於</div>
                <div class="text-h4 xl:text-h3 leading-[100%]">我們</div>
                <div class="text-stl-sm xl:text-h6">About Us</div>
            </div>
            <div v-if="locale == 'en'">
                <div class="text-h4 xl:text-h3">About Us</div>
            </div>
            <div class="absolute left-0 h-px bg-gradient-to-r from-theme-pink to-theme-yellow" :class="locale == 'zh' ? 'w-[80%]' : 'w-[65%]'"></div>
            <p class="mt-6 xl:text-h6">{{ $t('about_us') }}</p>
        </div>

        <div class="-mt-10 xl:mt-0">
            <div v-if="locale == 'zh'" class="relative mx-auto w-[250px]">
                <Concept_zh class="w-full" />
                <div class="absolute top-[70px] right-0 text-bdy-sm">反<br />射</div>
                <div class="absolute top-[158px] left-[61px] text-bdy-sm">穿<br />透</div>
                <div class="absolute top-[240px] right-0 text-bdy-sm">折<br />射</div>
            </div>
            <div v-if="locale == 'en'" class="relative mx-auto w-[296px]">
                <Concept_en class="w-full" />
                <div class="absolute top-[19px] right-0 text-bdy-sm">Reflection</div>
                <div class="absolute top-[55px] right-0 text-bdy-sm">Refraction</div>
                <div class="absolute top-[91px] right-0 text-bdy-sm">Penetration</div>
            </div>
        </div>
    </div>

    <div class="mt-20 mx-auto xl:px-[228px] max-w-[1920px] overflow-hidden" :class="locale == 'zh' ? 'md:px-[131px]' : 'md:px-[83px]'">
        <ul ref="tagContainer" class="keen-slider tag-group-slider">
            <li v-for="tg, idx in tagGroups" class="keen-slider__slide aspect-square min-w-[240px] lg:min-w-[360px] xl:min-w-[480px] flex justify-center items-center">
                <div class="relative aspect-square w-[216px] border border-secondary-dark rounded-full bg-white flex justify-center items-center transition-transform duration-300 " :class="{ 'lg:scale-150 xl:scale-200': currentTagGroup === idx }, locale == 'zh' ? 'text-h3' : 'text-h5'">
                    {{ locale == 'zh' ? tg.label.split("_")[0] : tg.label.split("_")[1] }}
                    <Ring v-if="idx % 3 == 0" class="absolute -top-2 right-3 aspect-square w-[208px]" :ring-id="idx" from="#6CA1F7" to="#46FFF4" />
                    <Ring v-if="idx % 3 == 1" class="absolute top-0 right-2 aspect-square w-[216px]" :ring-id="idx" from="#FFBABD" to="#FCFF00" />
                    <Ring v-if="idx % 3 == 2" class="absolute top-2 right-1 aspect-square w-[210px]" :ring-id="idx" from="#FCFF00" to="#46FFF4" />
                </div>
            </li>
        </ul>

        <div class="mt-6 px-page-padding-sm md:px-0 flex justify-center">
            <div v-for="(tg, idx) in tagGroups" class="flex-1 h-px transition-colors" :class="currentTagGroup === idx ? 'bg-black' : 'bg-secondary'"></div>
        </div>

        <ul class="mt-8 px-page-padding-sm md:px-0 flex flex-wrap justify-center gap-2">
            <button v-for="t in tags">
                <Tag :class="{ 'current-tag': currentTag?.id === t.id, 'current-tag-group': currentTagGroup === t.groups[0] - 1 }" :tag-id="t.id" @click="handleTagClick(t)" />
            </button>
        </ul>
    </div>

    <div class="mt-20 mx-auto px-page-padding-sm xl:px-[228px] max-w-[1920px]" :class="locale == 'zh' ? 'md:px-[131px]' : 'md:px-[83px]'">
        <div class="text-right md:text-left">
            <div v-if="locale == 'zh'" class="inline-flex flex-col items-center">
                <div class="text-h4 xl:text-h3 leading-[100%]">特色</div>
                <div class="text-stl-sm xl:text-h6">Feature</div>
            </div>
            <div v-if="locale == 'en'">
                <div class="text-h4 xl:text-h3">Feature</div>
            </div>
            <div class="absolute h-px bg-gradient-to-l from-theme-cyan to-theme-yellow" :class="{ 'right-0 w-1/2': deviceSize < DEVICE_SIZE.MD, 'left-[131px] right-0': deviceSize >= DEVICE_SIZE.MD }"></div>
        </div>
        <p class="mt-6 xl:text-h6">{{ $t('feature') }}</p>
    </div>

    <Client class="mt-12" />

    <Contact />
</template>

<script setup>
import { DEVICE_SIZE } from '~~/composables/device'

import Client from "~~/components/about/Client.vue";
import Contact from '~~/components/about/Contact.vue';

/* svg component */
import Logo from "@/assets/svg/logo.svg"
import Concept_zh from "@/assets/svg/concept_zh.svg"
import Concept_en from "@/assets/svg/concept_en.svg"

import { useKeenSlider } from 'keen-slider/vue.es';
import 'keen-slider/keen-slider.min.css'

const deviceSize = inject('deviceSize')
const { locale } = useI18n()

// import gsap from 'gsap'
// if (process.client) gsap.to('#test', { left: 100 })

const currentTagGroup = ref(1)
const currentTag = ref()
const [tagContainer, tagSlider] = useKeenSlider({
    initial: currentTagGroup.value,
    slides: {
        origin: 'center',
        perView: 'auto',
        spacing: 26
    },
    slideChanged: (s) => {
        currentTagGroup.value = s.track.details.rel
    },
    dragged: (s) => {
        currentTag.value = null
    }
})

const appConfig = useAppConfig()
const tagGroups = computed(() => appConfig.tagGroups.filter(tg => tg.label != 'not assigned'))
const tags = computed(() => appConfig.tags.filter(t => t.groups[0] != 0))

function handleTagClick(tag) {
    currentTag.value = tag
}

watch(currentTag, () => {
    if (!currentTag.value) return

    tagSlider.value.moveToIdx(currentTag.value.groups[0] - 1)
    currentTagGroup.value = currentTag.value.groups[0] - 1
})
</script>

<style scope>
.tag-group-slider {
    overflow: visible !important;
}

.current-tag {
    background: black !important;
    color: white !important;
}

.current-tag-group {
    background: white;
    border-color: black;
    color: black;
}
</style>