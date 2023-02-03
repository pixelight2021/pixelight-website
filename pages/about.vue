<template>
    <Logo class="w-[214px] mx-auto mt-[84px] mb-[35px]" />
    <div class="mx-[40px] text-h5 text-center">"Let Us Creating Interactive Experiences Together."</div>

    <!-- <Anchor class="top-[109px] right-[214px]">
        <div class="absolute inset-1/2 w-[254px] h-[1px] bg-gradient-to-r from-black to-[#FCFF00]"></div>
    </Anchor> -->
    <div id="test" class="absolute aspect-square w-[40px] rounded-full border-[1px] border-black"></div>

    <div class="mt-[222px]">
        <div v-if="$i18n.locale == 'zh'" class="relative w-[250px] mx-auto">
            <Concept_zh class="w-full" />
            <div class="absolute top-[70px] right-0 text-bd-sm">反<br />射</div>
            <div class="absolute top-[158px] left-[61px] text-bd-sm">穿<br />透</div>
            <div class="absolute top-[240px] right-0 text-bd-sm">折<br />射</div>
        </div>
        <div v-if="$i18n.locale == 'en'" class="relative w-[296px] mx-auto">
            <Concept_en class="w-full" />
            <div class="absolute top-[19px] right-0 text-bd-sm">Reflection</div>
            <div class="absolute top-[55px] right-0 text-bd-sm">Refraction</div>
            <div class="absolute top-[91px] right-0 text-bd-sm">Penetration</div>
        </div>
    </div>

    <div class="p-page mt-[40px]">
        <div class="title" id="about-us">
            <div v-if="$i18n.locale == 'zh'" class="inline-flex flex-col items-center">
                <div class="text-h4 leading-[100%]">關於<br />我們</div>
                <div class="text-st-sm">About Us</div>
            </div>
            <div v-if="$i18n.locale == 'en'">
                <div class="text-h4">About Us</div>
            </div>
        </div>
        <br />
        <p>{{ $t('about_us') }}</p>
    </div>

    <br />

    <div class="mt-[40px]">
        <ul ref="tagContainer" class="keen-slider">
            <li v-for="tg in tagGroups" class="keen-slider__slide tag-group">{{ tg.label }}</li>
        </ul>
        <br />
        <div class="flex justify-center">
            <div v-for="(tg, idx) in tagGroups" class="tag-group-dot" :class="{ 'active-dot': current === idx }"></div>
        </div>
        <br />
        <ul v-if="$i18n.locale == 'zh'" class="p-page flex flex-wrap justify-center gap-2">
            <Tag v-for="t in tags" @click="handleTagClick(t)">{{ t.name }}</Tag>
        </ul>
        <ul v-if="$i18n.locale == 'en'" class="p-page flex flex-wrap justify-center gap-2">
            <Tag v-for="t in tags" @click="handleTagClick(t)">{{ t.slug }}</Tag>
        </ul>
    </div>

    <div class="p-page mt-[40px]">
        <div class="title" id="feature">
            <div v-if="$i18n.locale == 'zh'" class="inline-flex flex-col items-center">
                <div class="text-h4 leading-[100%]">特色</div>
                <div class="text-st-sm">Feature</div>
            </div>
            <div v-if="$i18n.locale == 'en'">
                <div class="text-h4">Feature</div>
            </div>
        </div>
        <br />
        <p>{{ $t('feature') }}</p>
    </div>

    <div class="mt-[40px] py-4 px-8 bg-white">
        <!-- <br /> -->
        <div class="text-center">
            <div v-if="$i18n.locale == 'zh'">
                <div class="text-h4 leading-[100%]">合作單位</div>
                <div class="text-st-sm">Our Clients</div>
            </div>
            <div v-if="$i18n.locale == 'en'">
                <div class="text-h4">Our Clients</div>
            </div>
        </div>
        <br />
        <div class="relative px-6">
            <div ref="clientContainer" class="keen-slider">
                <div v-for="cg in clients" class="keen-slider__slide">
                    <div class="grid grid-cols-2 grid-rows-2">
                        <div v-for="c in cg" class="flex flex-col justify-center items-center p-3 gap-y-1">
                            <nuxt-img class="h-[17px]" :src="c.icon.source_url" />
                            <div class="text-ovr text-center">{{ c.name[`${$i18n.locale}`] }}</div>
                        </div>

                        <div class="absolute w-1/2 h-full border-r-[1px] border-[#D3D3D3]"></div>
                        <div class="absolute w-full h-1/2 border-b-[1px] border-[#D3D3D3]"></div>
                    </div>
                </div>
            </div>
            
            <!-- slider left -->
            <bottom class="absolute trnaslate-mid left-0 top-1/2 aspect-square w-[40px] rounded-full bg-[#D3D3D3] text-center"
                @click="clientSlider.prev()">
                <div class="absolute left-px top-px aspect-square w-[38px] rounded-full border-[3px] border-white"></div>
                <span class="material-symbols-outlined text-white align-middle leading-[40px]">west</span>
            </bottom>

            <!-- slider right -->
            <bottom class="absolute translate-x-1/2 translate-y-[-50%] right-0 top-1/2 aspect-square w-[40px] rounded-full bg-gradient-to-br from-[#FFBABD] to-[#FCFF00] text-center"
                @click="clientSlider.next()">
                <div class="absolute left-px top-px aspect-square w-[38px] rounded-full border-[3px] border-white"></div>
                <span class="material-symbols-outlined text-white align-middle leading-[40px]">east</span>
            </bottom>
        </div>
        <br />
        <div ref="client_slider_hint" class="text-center text-ovr transition-opacity">
            SLIDE TO EXPLORE
        </div>
    </div>

    <div class="p-page pt-[70px] relative">
        <Logo class="logo-variants w-[77px] absolute top-[134px] right-[28px]" />
        <div
            class="absolute top-0 right-[66px] w-[1px] h-[134px] bg-gradient-to-b from-[#FCFF00] via-[#38ABE3] to-black">
        </div>

        <a class="block text-st-lg mb-[19px]" href="https://www.axis3d.com/" target="_blank">
            OFFICES
            <div class="text-ovr">{{ $t('contact.office') }}</div>
        </a>
        <a class="block text-st-lg mb-[19px]" href="https://www.facebook.com/Pixelight2020" target="_blank">
            CHAT WITH US
            <div class="text-ovr" >{{ $t('contact.chat_with_us') }}</div>
        </a>
        <div class="text-st-lg mb-[19px]">
            PHONE
            <div class="text-ovr">{{ $t('contact.phone') }}</div>
        </div>
        <a class="block text-st-lg mb-[19px]" href="https://goo.gl/maps/TBmcJowEiLd9zgQb7" target="_blank">
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

import gsap from 'gsap'
if (process.client) gsap.to('#test', { left: 100 })

const current = ref(1)
const [tagContainer, tagSlider] = useKeenSlider({
    initial: current.value,
    slides: {
        origin: 'center',
        perView: 'auto',
        spacing: 26
    },
    slideChanged: (s) => {
        current.value = s.track.details.rel
    },
})
const client_slider_hint = ref()
const [clientContainer, clientSlider] = useKeenSlider({
    slideChanged: (s) => {
        client_slider_hint.value.style.opacity = 0;
    },
})

const appConfig = useAppConfig()
const tagGroups = computed(() => appConfig.tagGroups.filter(tg => tg.label != 'not assigned'))
const tags = ref(appConfig.tags)
const clients = computed(() => {
    const clientGroups = []
    for (let i = 0; i < appConfig.clients.length; i += 4) {
        const clientGroup = []
        for (let j = 0; j < 4; j++) {
            const idx = i + j
            if (appConfig.clients[idx]) {
                const client = {
                    name: appConfig.clients[idx].acf.name,
                    icon: appConfig.medias.find(m => m.id === appConfig.clients[idx].acf.icon)
                }
                clientGroup.push(client)
            }
        }
        clientGroups.push(clientGroup)
    }
    return clientGroups
})

function handleTagClick(tag, e) {
    tagGroups.value.find((tg, idx) => {
        if (tg.term_group == tag.groups[0]) {
            tagSlider.value.moveToIdx(idx)
        }
    })

}
</script>

<style scope>
.tag-group {
    background-color: white;
    aspect-ratio: 1;
    min-width: 216px;
    line-height: 216px;
    border-radius: 50%;
    text-align: center;
    font-size: 48px;
}

.tag-group-dot {
    display: inline-block;
    background-color: #d9d9d9;
    aspect-ratio: 1;
    width: 9px;
    border-radius: 50%;
    margin: 0 4.5px;
}

.active-dot {
    @apply bg-[#898989];
}

.title::after {
    content: '';
    display: block;
    position: absolute;
    width: 50%;
    /* line width */
    height: 2px;
}

#about-us::after {
    left: 0;
    background: linear-gradient(to right, #FFBABD, #FCFF00);
}

#feature {
    text-align: right;
}

#feature::after {
    right: 0;
    background: linear-gradient(to left, #46FFF4, #FCFF00);
}

.logo-variants path {
    @apply fill-black !important
}
</style>