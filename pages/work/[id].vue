<template>
    <div>
        <nuxt-img class="left-0 w-full" src="http://192.168.2.140/wordpress/wp-content/uploads/2023/01/Intersect.png"></nuxt-img>
        <div class="absolute">{{ work.name['zh-tw'] }}</div>
        <!-- <div class="absolute">{{ lang }}</div> -->
    </div>
    <div class="p-[24px]">
        <!-- iframe這邊會產生不影響運作的error，待解決 -->
        <iframe class="w-full aspect-video" src="https://player.vimeo.com/video/685312218" allowfullscreen></iframe>
        <div class="flex">
            <div class="block sm:hidden"></div>
            <p>{{ work.content1 }}</p>
            <!-- <p>White whale is also called beluga whale. With elegant appearance and pleasant sound, it is also called “canary in the sea”. In the National Museum of Marine Biology and Aquarium (NMMBA), although beluga whales are quite popular among tourists, but the public is still unfamiliar with their physiology and the stories.</p> -->
        </div>
        <div>
            <ul ref="container" class="keen-slider">
                <li class="keen-slider__slide number-slide1">
                    {{ work.contnet2 }}
                </li>
                <li class="keen-slider__slide number-slide1">
                    <nuxt-img src="http://192.168.2.140/wordpress/wp-content/uploads/2023/01/Intersect.png" />
                </li>
            </ul>
            <span class="material-symbols-outlined" @click="slider.prev()">chevron_left</span>
            <span class="material-symbols-outlined" @click="slider.next()">chevron_right</span>
        </div>
        <div>{{ work.name.EN }}</div>
        <ul class="flex flex-wrap">
            <li class="tag">#數位藝術</li>
            <li class="tag">#3D</li>
            <li class="tag">#展覽</li>
            <li class="tag">#動畫</li>
            <li class="tag">#科技</li>
            <li class="tag">#裝置藝術</li>
        </ul>

        <div class="grid grid-cols-2 aspect-square">
            <div>0</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
        </div>

        <!-- <div class="grid grid-cols-staff text-ovr align-top" v-for="(value, key) in staff">
            <span>{{ key }}</span>
            <span>{{ value }}</span>
        </div> -->

        <div class="flex justify-between">
            <button>上個專案</button>
            <button>下個專案</button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'

import { useKeenSlider } from 'keen-slider/vue.es'
import 'keen-slider/keen-slider.min.css'
const { locale } = useI18n()
const lang = computed(() => locale.name)
console.log(locale)

const current = ref(0)
const [container, slider] = useKeenSlider({
    initial: current.value,
    slideChanged: (s) => {
        current.value = s.track.details.rel
    },
})

let work

try {
    const { server_url } = useRuntimeConfig()
    const { id } = useRoute().params
    const url = server_url + '/wp-json/wp/v2/work/' + id
    const { data } = await useFetch(url)
    if (!data?.value) throw new Error('work not found')

    work = reactive({
        name: data.value.acf.name,
        cover: data.value.acf.cover,
        trailer: data.value.acf.trailer,
        content1: data.value.acf.content1,
        slideshow: data.value.acf.slideshow,
        content2: data.value.acf.content2,
        gallery: data.value.acf.gallery,
        staff: data.value.acf.staff
    })
} catch (error) {
    console.error(error)
    //redirect to home page if work not found
    useRouter().push('/')
}

// const staff = computed(() => {
//     let o = Object.keys(work.acf.staff)
//         .filter(k => work.acf.staff[k] != '')
//         .reduce((a, k) => ({ ...a, [k]: work.acf.staff[k] }), {})
//     console.log(o)
//     return o
// })
</script>

<style scope>
.tag {
    @apply inline min-w-[70px] text-ovr text-center text-[#00000060] border border-[#00000060] p-0.5 mr-[10px]
}
</style>