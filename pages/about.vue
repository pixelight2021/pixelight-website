<template>
    <Logo class="fill-white mx-auto mt-20 w-[60%] min-w-[214px] max-w-[632px]" />

    <div class="mx-auto mt-8 max-w-[480px] text-h5 md:text-h4 md:text-h2 text-center">"Let Us Creating Interactive Experiences Together."</div>

    <div class="relative h-20">
        <div class="absolute left-1/4 bottom-0 -translate-x-1/2 translate-y-1/2 aspect-square w-10 rounded-full border border-black">
            <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 aspect-square w-[6px] bg-black "></span>
        </div>
        <span class="absolute left-1/4 right-0 bottom-0 translate-y-1/2 h-px bg-gradient-to-r from-black to-theme-yellow "></span>
    </div>

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

    <div class="mt-12 px-page-padding-sm md:px-[131px]">
        <div>
            <div v-if="locale == 'zh'" class="inline-flex flex-col items-center">
                <div class="text-h4 leading-[100%]">關於<br />我們</div>
                <div class="text-stl-sm">About Us</div>
            </div>
            <div v-if="locale == 'en'">
                <div class="text-h4">About Us</div>
            </div>
            <div class="absolute left-0 w-1/2 h-px bg-gradient-to-r from-theme-pink to-theme-yellow"></div>
        </div>
        <p class="mt-6">{{ $t('about_us') }}</p>
    </div>

    <div class="mt-20">
        <ul ref="tagContainer" class="keen-slider">
            <li v-for="tg, idx in tagGroups" class="keen-slider__slide aspect-square min-w-[240px] flex justify-center items-center">
                <Ring v-if="idx % 3 == 0" class="absolute top-2 aspect-square w-[208px]" :ring-id="idx" from="#6CA1F7" to="#46FFF4" />
                <Ring v-if="idx % 3 == 1" class="absolute right-6 aspect-square w-[216px]" :ring-id="idx" from="#FFBABD" to="#FCFF00" />
                <Ring v-if="idx % 3 == 2" class="absolute top-2 right-4 aspect-square w-[216px]" :ring-id="idx" from="#FCFF00" to="#46FFF4" />
                <div class="w-[216px] h-[216px] border border-secondary-dark rounded-full bg-white text-h3 text-center leading-[216px]">
                    {{ tg.label }}
                </div>
            </li>
        </ul>

        <div class="mt-6 px-page-padding-sm md:px-[131px] flex justify-center">
            <div v-for="(tg, idx) in tagGroups" class="flex-1 h-px" :class="currentTagGroup === idx ? 'bg-black' : 'bg-secondary-dark'"></div>
        </div>

        <ul class="mt-8 px-page-padding-sm flex flex-wrap justify-center gap-2">
            <Tag v-for="t in tags" :class="{ 'current-tag': currentTag?.id === t.id, 'current-tag-group': currentTagGroup === t.groups[0] - 1 }" :tag-id="t.id" @click="handleTagClick(t)" />
        </ul>
    </div>

    <div class="mt-20 px-page-padding-sm md:px-[131px]">
        <div class="text-right">
            <div v-if="locale == 'zh'" class="inline-flex flex-col items-center">
                <div class="text-h4 leading-[100%]">特色</div>
                <div class="text-stl-sm">Feature</div>
            </div>
            <div v-if="locale == 'en'">
                <div class="text-h4">Feature</div>
            </div>
            <div class="absolute right-0 w-1/2 h-px bg-gradient-to-l from-theme-cyan to-theme-yellow"></div>
        </div>
        <p class="mt-6">{{ $t('feature') }}</p>
    </div>

    <div class="mt-12 py-3 bg-white">
        <div class="text-center">
            <div v-if="locale == 'zh'">
                <div class="text-h4 leading-[100%]">合作單位</div>
                <div class="text-stl-sm">Our Clients</div>
            </div>
            <div v-if="locale == 'en'">
                <div class="text-h4">Our Clients</div>
            </div>
        </div>

        <div class="relative mt-6 px-14">
            <div ref="clientContainer" class="keen-slider min-h-[128px]">
                <!-- <div v-for="clients in clientGroups" class="keen-slider__slide grid grid-cols-2 grid-rows-2"> -->
                <div v-for="j in Math.ceil(clients.length / 2)" class="keen-slider__slide grid grid-cols-2">
                    <div v-for="i in 2" v-if="clients[(i - 1) + (j - 1) * 2]" class="px-3 flex flex-col justify-center items-center">
                        <Image class="aspect-square h-[17px]" :media-id="clients[(i - 1) + (j - 1) * 2]?.acf.icon" :fallback="false" :full-screen="false" />
                        <div class="text-ovr text-center">{{ clients[(i - 1) + (j - 1) * 2]?.acf.name[`${locale}`] }}</div>
                    </div>

                    <div class="mt-6 px-page-padding-sm md:px-[131px] flex justify-center">
                        <!-- <div v-for="c,idx in clientGroups" class="flex-1 h-px bg-black" :class="clientSlider.track.details.rel === idx ? 'bg-black' : 'bg-secondary-dark'"></div> -->
                    </div>

                    <!-- <div class="absolute w-1/2 h-full border-r border-secodary"></div> -->
                    <!-- <div class="absolute w-full h-1/2 border-b border-secodary"></div> -->
                </div>
            </div>
            <button class="absolute left-7 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-8 rounded-full bg-secondary text-center" @click="clientSlider.prev()">
                <span class="absolute -left-1 -top-1 aspect-square w-10 rounded-full border border-secondary"></span>
                <span class="material-symbols-outlined align-middle leading-[32px] font-thin">arrow_back</span>
            </button>

            <button class="absolute right-7 top-1/2 translate-x-1/2 -translate-y-1/2 aspect-square w-[32px] rounded-full bg-gradient-to-r from-theme-pink to-theme-yellow text-center" @click="clientSlider.next()">
                <span class="absolute -left-1 -top-1 aspect-square w-10 rounded-full border border-theme-yellow"></span>
                <span class="material-symbols-outlined align-middle leading-[32px] font-thin">arrow_forward</span>
            </button>
        </div>
        <div ref="client_slider_hint" class="mt-6 text-secondary text-center text-ovr transition-opacity">SLIDE TO EXPLORE</div>
    </div>

    <div class="relative px-page-padding-sm pt-[70px]">
        <Logo class="w-[77px] absolute top-[134px] right-[28px]" />
        <div class="absolute top-0 right-[66px] w-px h-[134px] bg-gradient-to-b from-theme-yellow via-theme-blue to-black"></div>

        <a class="block text-stl-lg mb-[19px]" href="https://www.axis3d.com/" target="_blank">
            OFFICES
            <div class="text-ovr">{{ $t('contact.office') }}</div>
        </a>
        <a class="block text-stl-lg mb-[19px]" href="https://www.facebook.com/Pixelight2020" target="_blank">
            CHAT WITH US
            <div class="text-ovr">{{ $t('contact.chat_with_us') }}</div>
        </a>
        <div class="text-st-lg mb-[19px]">
            PHONE
            <div class="text-ovr">{{ $t('contact.phone') }}</div>
        </div>
        <a class="block text-stl-lg mb-[19px]" href="https://goo.gl/maps/TBmcJowEiLd9zgQb7" target="_blank">
            LOCATED
            <div class="text-ovr">{{ $t('contact.located') }}</div>
        </a>
    </div>
</template>

<script setup>
/* svg component */
import Logo from "@/assets/svg/logo.svg"
import Concept_zh from "@/assets/svg/concept_zh.svg"
import Concept_en from "@/assets/svg/concept_en.svg"

import { useKeenSlider } from 'keen-slider/vue.es';
import 'keen-slider/keen-slider.min.css'

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
    animationEnded: (s) => {
        currentTagGroup.value = s.track.details.rel
    },
    dragged: (s) => {
        currentTag.value = null
    }
})
const client_slider_hint = ref()
const [clientContainer, clientSlider] = useKeenSlider({
    slideChanged: (s) => {
        client_slider_hint.value.style.opacity = 0;
    },
})

const appConfig = useAppConfig()
const tagGroups = computed(() => appConfig.tagGroups.filter(tg => tg.label != 'not assigned'))
const tags = computed(() => appConfig.tags.filter(t => t.groups[0] != 0))
// const clientGroups = computed(() => {
//     const group = []
//     const perPage = 
//     for (let i = 0; i < appConfig.clients.length / 2; i++) {
//         group.push(appConfig.clients.slice(i * 4, i * 4 + 4))
//     }
//     return group
// })
// function clientPage
const clients = appConfig.clients


function handleTagClick(tag) {
    currentTag.value = tag
}

watch(currentTag, () => {
    if (!currentTag.value) return

    tagSlider.value.moveToIdx(currentTag.value.groups[0] - 1)
    currentTagGroup.value = currentTag.value.groups[0] - 1
})

// function autoChangeTag() {
//     const idx = Math.floor(Math.random() * tags.value.length)
//     currentTag.value = tags.value[idx]
// }

// onMounted(() => {
//     setInterval(autoChangeTag, 3000)
// })

// onBeforeUnmount(() => {
//     clearInterval(autoChangeTag)
// })
</script>

<style scope>
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