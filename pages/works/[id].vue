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
                <div class="absolute top-full -translate-x-1/2 -translate-y-1/2 aspect-square w-10 rounded-full border border-black">
                    <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 aspect-square w-[6px] bg-black "></span>
                </div>
                <span class="absolute -translate-x-1/2 w-px -top-6 bottom-0 bg-gradient-to-b from-theme-yellow to-black"></span>
            </div>
            {{ work?.acf.intro[`${locale}`] }}
        </div>
    </div>

    <SlideShow v-if="deviceSize < DEVICE_SIZE.MD" class="mt-12 h-[445px]" :images="work?.acf.slideshow" origin="center" />

    <div v-if="deviceSize >= DEVICE_SIZE.MD" class="relative mt-12 xl:mt-20 h-[575px] xl:h-[1130px] flex justify-between">
        <div class="absolute -top-2 xl:-top-6 w-full">
            <div class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-10 rounded-full border border-black">
                <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 aspect-square w-[6px] bg-black "></span>
            </div>
            <span class="absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-theme-yellow to-black "></span>
        </div>

        <div class="max-w-[400px] writing-mode-vertical-rl text-6xl xl:text-[150px]">
            {{ work?.acf.name.en }}
        </div>

        <SlideShow class="mt-12 h-[413px] xl:h-[689px] pl-20" :images="work?.acf.slideshow" />

        <div class="absolute right-0 bottom-0 mt-12 px-page-padding-sm md:px-page-padding-md xl:px-page-padding-xl">
            <ul v-for="i in 3" class="flex justify-end" :class="{ 'mt-2 mr-8': i === 2, 'mt-2 mr-16': i === 3 }">
                <Tag v-for="t in tags[i - 1]" :tagId="t" class="ml-2" />
            </ul>
        </div>
    </div>

    <div v-if="deviceSize < DEVICE_SIZE.MD" class="mt-14 px-page-padding-sm text-h5">
        <div class="relative">
            {{ work?.acf.name.en }}
            <div class="absolute -bottom-6 w-full">
                <div class="absolute left-1/3 -translate-x-1/2 -translate-y-1/2 aspect-square w-10 rounded-full border border-black">
                    <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 aspect-square w-[6px] bg-black "></span>
                </div>
                <span class="absolute left-1/3 -right-page-padding-sm top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-black to-theme-yellow "></span>
            </div>
        </div>

        <div class="mt-12">
            <ul v-for="i in 3" class="flex justify-end" :class="{ 'mt-2 mr-8': i === 2, 'mt-2 mr-16': i === 3 }">
                <Tag v-for="t in tags[i - 1]" :tagId="t" class="ml-2" />
            </ul>
        </div>
    </div>

    <Block v-for="b in work?.acf.blocks" :value="b.value" />

    <div class="mt-6 px-page-padding-sm md:px-page-padding-md xl:px-page-padding-xl">
        <div class="aspect-square w-full grid grid-cols-2 grid-rows-2">
            <Image v-for="id in work?.acf.gallery" :media-id="id" />
        </div>
    </div>

    <div class="my-12 px-page-padding-sm md:px-page-padding-md xl:px-page-padding-xl">
        <div v-for="s in work?.acf.staff" class="xl:w-[75%] grid grid-cols-staff text-cpt">
            <span>{{ s.value.title[`${locale}`] }}</span>
            <span>{{ s.value.members[`${locale}`] }}</span>
        </div>
    </div>

    <div class="mt-12 flex justify-between ">
        <button class="relative pl-6 md:pl-9 max-w-1/3
        after:absolute after:bottom-0 after:right-0 after:w-full after:h-0.5 after:bg-gradient-to-r from-[#E44AB7] to-[#4EFFDD]">
            上個專案
        </button>
        <button class="relative pr-6 md:pr-9 max-w-1/3
        after:absolute after:bottom-0 after:right-0 after:w-full after:h-0.5 after:bg-gradient-to-r from-[#E44AB7] to-[#4EFFDD]">
            下個專案
        </button>
    </div>
</template>

<script setup>
import { DEVICE_SIZE } from '~~/composables/device'
import { fetchWorks } from '~~/composables/fetchData';

const { locale } = useI18n()
const deviceSize = inject('deviceSize')
const isLoading = inject('isLoading')

onMounted(() => {
    // isLoading.value = false
})

const work = ref({})
const tags = ref([])
try {
    const { id } = useRoute().params
    // const url = 'http://192.168.2.140/wordpress/wp-json/wp/v2/works/' + id + '?_fields=tags,acf'
    // const res = await useFetch(url)
    const res = await fetchWorks(`/${id}?_fields=tags,acf`)
    if (res.error.value) throw new Error('work not found')

    work.value = res.data.value
    const appConfig = useAppConfig()
    const notAssign = appConfig.tagGroups.find(tg => tg.term_group == 0) //not assign tags
    const mainTags = res.data.value.tags.filter(t => !notAssign.terms.includes(t))
    for (let j = 0; j < mainTags.length; j += 3) {
        const line = []
        for (let i = 0; i < 3; i++) {
            const idx = i + j
            if (mainTags[idx]) line.push(mainTags[idx])
        }
        tags.value.push(line)
    }
} catch (err) {
    console.error(err)
    //     //redirect to home page if work not found
    //     useRouter().push('/')
}
</script>

<style scoped>
.liner-gradient {
    background: linear-gradient(to right, rgba(255, 255, 255, 90) 65%, transparent);
}
</style>
