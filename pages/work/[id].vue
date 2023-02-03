<template>
    <div class="relative">
        <nuxt-img class="min-w-full h-[438px] object-cover" :src="work.cover.source_url" />
        <div class="absolute max-w-[90%] bottom-[47px] bg-[#ffffffe6] text-h4 px-[30px] py-[10px]">{{ work.name[`${$i18n.locale}`] }}</div>
    </div>

    <div class="py-[24px] p-page">
        <!-- iframe這邊會產生不影響運作的error，待解決 -->
        <iframe class="w-full aspect-video" :src="work.trailer" allowfullscreen></iframe>
        
        <div class="flex">
            <div class="block sm:hidden"></div>
            <p>{{ work.content1[`${$i18n.locale}`] }}</p>
        </div>

        <div class="relative">
            <ul ref="container" class="keen-slider h-[445px]">
                <li class="keen-slider__slide rounded-[10px] min-w-[255px] ">
                    {{ work.content2[`${$i18n.locale}`] }}
                </li>
                <li class="keen-slider__slide rounded-[10px] min-w-[255px]" v-for="media in work.slideshow">
                    <nuxt-img class="object-cover min-w-full h-full" :src="media.source_url" />
                </li>
            </ul>
            <div class="absolute top-1/2 left-[-10px] rounded-full aspect-square w-[30px] bg-[#fff] flex justify-center items-center">
                <span class="material-symbols-outlined" @click="slider.prev()">west</span>
            </div>
            <div class="absolute top-1/2 right-[-10px] rounded-full aspect-square w-[30px] bg-[#fff] flex justify-center items-center">
                <span class="material-symbols-outlined" @click="slider.next()">east</span>
            </div>
        </div>

        <div>{{ work.name.en }}</div>

        <ul class="flex flex-wrap">
            <Tag v-for="t in work.tags" :tagId="t">{{ t.name }}</Tag>
        </ul>

        <div class="grid grid-cols-2 aspect-square">
            <div class="overflow-hidden" v-for="media in work.gallery">
                <nuxt-img class="object-cover min-w-full h-full" :src="media.source_url" />
            </div>
        </div>

        <div class="grid grid-cols-staff text-ovr align-top" v-for="(value, key) in work.staff[`${$i18n.locale}`]">
            <span>{{ key }}</span>
            <span>{{ value }}</span>
        </div>

        <div class="flex justify-between">
            <button>上個專案</button>
            <button>下個專案</button>
        </div>
    </div>
</template>

<script setup>
import { useKeenSlider } from 'keen-slider/vue.es'
import 'keen-slider/keen-slider.min.css'

const [container, slider] = useKeenSlider({
    slides: {
        origin: 'center',
        perView: 'auto',
        spacing: 30
    }
})

const appConfig = useAppConfig()
let work

try {
    const { id } = useRoute().params
    const url = 'http://192.168.2.140/wordpress/wp-json/wp/v2/works/' + id
    const {data} = await useFetch(url)
    if (!data?.value) throw new Error('work not found')

    work = reactive({
        name: data.value.acf.name,
        cover: computed(() => appConfig.medias.find(m => m.id === data.value.acf.cover)),
        trailer: data.value.acf.trailer,
        content1: data.value.acf.content1,
        slideshow: computed(() => {
            const keys = Object.keys(data.value.acf.slideshow).filter(k => data.value.acf.slideshow[k] != '')
            const medias = keys.map(k => appConfig.medias.find(m => m.id === data.value.acf.slideshow[k]))
            return medias
        }),
        content2: data.value.acf.content2,
        tags: computed(() => data.value.tags.map(id => appConfig.tags.find(t => t.id === id))),
        gallery: computed(() => {
            const keys = Object.keys(data.value.acf.gallery)
            const medias = keys.map(k => appConfig.medias.find(m => m.id === data.value.acf.gallery[k]))
            return medias
        }),
        staff: computed(() => {
            const langs = Object.keys(data.value.acf.staff)
            const staff = langs.reduce((accumulator, lang) => {
                const keys = Object.keys(data.value.acf.staff[lang]).filter(k => data.value.acf.staff[lang][k] != '')
                const members = keys.reduce((a, k) => ({ ...a, [k]: data.value.acf.staff[lang][k] }), {})
                return { ...accumulator, [lang]: members }
            }, {})
            return staff
        })
    })
} catch (error) {
    console.error(error)
    //redirect to home page if work not found
    useRouter().push('/')
}
</script>
