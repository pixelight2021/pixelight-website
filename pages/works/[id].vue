<template>
    <div class="relative">
        <Image class="w-full h-[438px] md:h-[491px] xl:h-[758px]" :media-id="work?.acf.cover" />

        <div class="absolute bottom-12 md:-bottom-12 xl:-bottom-16 max-w-[90%] liner-gradient px-page-padding-sm md:px-page-padding-md py-2.5 text-h4" :class="{ 'md:text-h2 xl:text-[120px]': locale == 'zh', 'xl:text-[100px]': locale == 'en' }">
            {{ work?.acf.name[`${locale}`] }}
        </div>
    </div>

    <div class="mt-6 xl:mt-28 md:mt-20 px-page-padding-sm md:px-page-padding-md md:text-center">
        <iframe v-if="work?.acf.trailer" class="aspect-video w-full md:max-w-[519px] xl:max-w-[1273px] mx-auto" :src="work?.acf.trailer" allowfullscreen></iframe>


        <div class="relative mt-6  mx-auto pl-12 md:pl-0 xl:max-w-[1273px] whitespace-pre-wrap text-h6">
            <div v-if="deviceSize < DEVICE_SIZE.MD" class="absolute left-3 h-full">
                <div id="anim-1-circle" class="absolute -bottom-5 -translate-x-1/2 -translate-y-1/2 aspect-square w-10 rounded-full border border-black">
                    <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 aspect-square w-[6px] bg-black "></span>
                </div>
                <span id="anim-1-line" class="absolute -translate-x-1/2 w-px -top-6 bottom-5 bg-gradient-to-b from-theme-yellow to-black"></span>
            </div>
            {{ work?.acf.intro[`${locale}`] }}
        </div>
    </div>

    <SlideShow id="slide-show" v-if="deviceSize < DEVICE_SIZE.MD" class="mt-12 h-[445px]" :images="work?.acf.slideshow" origin="center" />

    <div v-if="deviceSize >= DEVICE_SIZE.MD" class="relative mt-12 xl:mt-20 h-[575px] xl:h-[1130px] flex justify-between">
        <div class="absolute -top-2 xl:-top-6 w-full">
            <div id="anim-2-circle" class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-10 rounded-full border border-black">
                <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 aspect-square w-[6px] bg-black "></span>
            </div>
            <span id="anim-2-line" class="absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-theme-yellow to-black "></span>
        </div>

        <div id="anim-2-text" class="relative max-w-[400px] writing-mode-vertical-rl text-6xl xl:text-[150px]">
            {{ work?.acf.name.en }}
        </div>

        <SlideShow id="slide-show" class="mt-12 h-[413px] xl:h-[689px] pl-20" :images="work?.acf.slideshow" />

        <div class="absolute right-0 bottom-0 mt-12 px-page-padding-sm md:px-page-padding-md xl:px-page-padding-xl">
            <ul v-for="i in 3" class="flex justify-end" :class="{ 'mt-2 mr-8': i === 2, 'mt-2 mr-16': i === 3 }">
                <Tag v-for="t in tags[i - 1]" :tagId="t" class="ml-2" />
            </ul>
        </div>
    </div>

    <div v-if="deviceSize < DEVICE_SIZE.MD" class="mt-14 px-page-padding-sm text-h5">
        <div class="relative">
            <div id="anim-3-text" class="relative">{{ work?.acf.name.en }}</div>
            <div class="absolute -bottom-6 w-full">
                <div id="anim-3-circle" class="absolute left-1/3 -translate-x-1/2 -translate-y-1/2 aspect-square w-10 rounded-full border border-black">
                    <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 aspect-square w-[6px] bg-black "></span>
                </div>
                <span id="anim-3-line" class="absolute left-1/3 -right-page-padding-sm top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-black to-theme-yellow "></span>
            </div>
        </div>

        <div id="tags" class="mt-12">
            <ul v-for="i in 3" class="flex justify-end" :class="{ 'mt-2 mr-8': i === 2, 'mt-2 mr-16': i === 3 }">
                <Tag v-for="t in tags[i - 1]" :tagId="t" class="ml-2" />
            </ul>
        </div>
    </div>

    <Block v-if="work?.acf.blocks" v-for="b in work?.acf.blocks" :value="b.value" />

    <div v-if="work?.acf.gallery" class="mt-6 px-page-padding-sm md:px-page-padding-md xl:px-page-padding-xl">
        <div class="aspect-square w-full grid grid-cols-2 grid-rows-2">
            <Image v-for="id in work?.acf.gallery" :media-id="id" />
        </div>
    </div>

    <div v-if="work?.acf.website" class="my-12 px-page-padding-sm md:px-page-padding-md xl:px-page-padding-xl text-h6 text-center">
        <a :href="work?.acf.website" target="_blank">
            <span class="material-symbols-outlined align-middle font-thin">arrow_forward</span>
            {{ locale == 'zh' ? '完整網站' : 'Visit Site' }}
        </a>
    </div>

    <div class="my-12 px-page-padding-sm md:px-page-padding-md xl:px-page-padding-xl">
        <div v-for="s in work?.acf.staff" class="xl:w-[75%] grid grid-cols-staff text-cpt">
            <span>{{ s.value.title[`${locale}`] }}</span>
            <span>{{ s.value.members[`${locale}`] }}</span>
        </div>
    </div>

    <div class="mt-12 grid grid-cols-5 text-bdy-sm md:text-bdy-lg xl:text-h6">
        <div class="relative col-span-2 self-end">
            <NuxtLink v-if="preWork" :to="`/${locale}/works/${preWork.id}`" class="after:absolute after:-bottom-1 after:right-0 after:w-full after:h-0.5 after:bg-gradient-to-r from-[#E44AB7] to-[#4EFFDD]">
                <div class="pl-page-padding-sm md:pl-page-padding-md xl:pl-page-padding-xl">
                    {{ preWork.acf.name[`${locale}`] }}
                </div>
            </NuxtLink>
        </div>

        <div></div>

        <div class="relative col-span-2 self-end">
            <NuxtLink v-if="nextWork" :to="`/${locale}/works/${nextWork.id}`" class="after:absolute after:-bottom-1 after:right-0 after:w-full after:h-0.5 after:bg-gradient-to-r from-[#E44AB7] to-[#4EFFDD]">
                <div class="pr-page-padding-sm md:pr-page-padding-md xl:pr-page-padding-xl text-right">
                    {{ nextWork.acf.name[`${locale}`] }}
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { DEVICE_SIZE } from '~~/composables/device'

import { gsap, Power3, Elastic } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const { locale } = useI18n()
const deviceSize = inject('deviceSize')
// const isLoading = inject('isLoading')

function $(id) {
    return document.getElementById(id)
}
onMounted(() => {
    // isLoading.value = false
    gsap.from(document.querySelector('.liner-gradient'), {
        duration: 0.75,
        ease: Power3.easeOut,
        backgroundPositionX: 100
    })

    if (deviceSize.value < DEVICE_SIZE.MD) {
        gsap.from($('anim-1-circle'), {
            duration: 1.75,
            ease: Elastic.easeOut.config(0.65, 0.4),
            top: 24,
            scrollTrigger: {
                trigger: "#slide-show",
            }
        })
        gsap.from($('anim-1-line'), {
            duration: 1.75,
            ease: Elastic.easeOut.config(0.65, 0.4),
            bottom: 'calc(100% - 24px)',
            scrollTrigger: {
                trigger: "#slide-show",
            }
        })

        gsap.from($('anim-3-text'), {
            duration: 1.5,
            ease: Power3.easeOut,
            opacity: 0,
            top: 16,
            scrollTrigger: {
                trigger: "#tags",
            }
        })
        gsap.from($('anim-3-circle'), {
            duration: 1.75,
            ease: Elastic.easeOut.config(0.65, 0.4),
            left: '100%',
            scrollTrigger: {
                trigger: "#tags",
            }
        })
        gsap.from($('anim-3-line'), {
            duration: 1.75,
            ease: Elastic.easeOut.config(0.65, 0.4),
            left: '100%',
            scrollTrigger: {
                trigger: "#tags",
            }
        })
    }

    if (deviceSize.value >= DEVICE_SIZE.MD) {
        gsap.from($('anim-2-text'), {
            duration: 1.5,
            ease: Power3.easeOut,
            opacity: 0,
            left: -60,
            scrollTrigger: {
                trigger: "#slide-show",
            }
        })
        gsap.from($('anim-2-circle'), {
            duration: 1.75,
            ease: Elastic.easeOut.config(0.65, 0.4),
            left: 0,
            scrollTrigger: {
                trigger: "#slide-show",
            }
        })
        gsap.from($('anim-2-line'), {
            duration: 1.75,
            ease: Elastic.easeOut.config(0.65, 0.4),
            right: '100%',
            scrollTrigger: {
                trigger: "#slide-show",
            }
        })
    }
})

const { id } = useRoute().params
const appConfig = useAppConfig()
const work = computed(() => appConfig.works?.find(w => w.id == id))

const tags = ref([])
const notAssign = appConfig.tagGroups?.find(tg => tg.term_group == 0) //not assign tags
const mainTags = work.value.tags?.filter(t => !notAssign.terms.includes(t))
for (let j = 0; j < mainTags.length; j += 3) {
    const line = []
    for (let i = 0; i < 3; i++) {
        const idx = i + j
        if (mainTags[idx]) line.push(mainTags[idx])
    }
    tags.value.push(line)
}

const index = appConfig.works?.indexOf(work.value)
const preWork = computed(() => index > 0 ? appConfig.works[index - 1] : null)
const nextWork = computed(() => index < appConfig.works.length - 1 ? appConfig.works[index + 1] : null)
</script>

<style scoped>
.liner-gradient {
    background: linear-gradient(to right, #ffffffdd 32.5%, transparent 50%, transparent);
    background-size: 200% 100%;
}
</style>
