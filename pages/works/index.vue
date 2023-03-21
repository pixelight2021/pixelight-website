<template>
    <div class="px-page-padding-sm md:px-page-padding-md xl:px-page-padding-xl">

        <div v-if="deviceSize < DEVICE_SIZE.MD">
            <div class="text-h6 font-medium">Works</div>

            <div id="categories-dropdown" class="relative text-bd-sm">
                <div class="border-b border-black py-2 uppercase" @click="handleDropDownMenuClick">
                    <span v-if="condition">{{ locale == locales[0] ? condition.name : condition.slug }}</span>
                    <span v-if="!condition">{{ locale == locales[0] ? current.name : current.slug }} ({{ current.count }})</span>
                    <span class="material-symbols-outlined align-middle float-right">
                        expand_more
                    </span>
                </div>
                <ul v-show="isOpen" class="absolute w-full bg-bg">
                    <li v-for="c in categories" class="py-2 uppercase" @click="handleCategorieClick(c)">
                        {{ locale == locales[0] ? c.name : c.slug }} ({{ c.count }})
                    </li>
                </ul>
            </div>
        </div>

        <ul v-if="deviceSize >= DEVICE_SIZE.MD" class="mt-12 flex justify-between">
            <li v-for="c in categories" class="text-bd-sm uppercase md:font-medium xl:font-bold" :class="{ 'text-theme-red': current == c }" @click="handleCategorieClick(c)">
                <button>{{ locale == locales[0] ? c.name : c.slug }}</button>
                <sup class="-top-4 text-black font-normal">({{ c.count }})</sup>
            </li>
        </ul>

        <div :key="resultKey">
            <div class="grid md:grid-cols-2 md:gap-x-7 xl:gap-x-12">
                <div v-for="w in works">
                    <NuxtLink :to="`/${locale}/works/${w.id}`">
                        <div class="mt-6 md:mt-8 xl:mt-16 aspect-video w-full bg-[#d4d4d4]">
                            <Image class="object-cover min-w-full h-full" :media-id="w.acf.cover" :full-screen="false" />
                        </div>
                        <div class="mt-3 text-h6 xl:text-h4">{{ w.acf.name[`${locale}`] }}</div>
                    </NuxtLink>
                    <button v-for="t in w.tags" @click="handleTagClick(t)">
                        <Tag :tag-id="t" class="mt-2 mr-2" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DEVICE_SIZE } from '~~/composables/device'
import { fetchWorks } from '~~/composables/fetchData'

const { locale, locales } = useI18n()
const isOpen = ref(false)

const deviceSize = inject('deviceSize')
const appConfig = useAppConfig()
const condition = ref()
const current = ref()
const categories = appConfig.categories
const works = ref()
// const isLoading = inject('isLoading')
const resultKey = ref(0)

watch(current, async () => {
    try {
        const res = await fetchWorks(`?categories=${current.value.id}&per_page=100`)
        if (res.error.value) throw res.error.value

        works.value = res.data.value
        resultKey.value++
        // isLoading.value = false
    } catch (err) {
        console.error(err)
    }
})

if (sessionStorage.getItem('condition')) {
    const c = JSON.parse(sessionStorage.getItem('condition'))

    const key = Object.keys(c)
    condition.value = c[`${key}`]
    let url
    if (key == 'tag') url = `?tags=${c.tag.id}&per_page=100`
    if (key == 'category') url = `?categories=${c.category.id}&per_page=100`
    try {
        const res = await fetchWorks(url)
        if (res.error.value) throw res.error.value

        works.value = res.data.value
        // isLoading.value = false
    } catch (err) {
        console.error(err)
    }
    sessionStorage.removeItem('condition')
} else {
    current.value = categories.find(c => c.slug === 'all')
}

function handleDropDownMenuClick() {
    isOpen.value = !isOpen.value
}

function handleCategorieClick(categorie) {
    condition.value = null
    current.value = categorie
    isOpen.value = false
}

const searchKey = inject('searchKey')

async function handleTagClick(id) {
    const tag = appConfig.tags.find(t => t.id === id)
    setTimeout(() => {
        sessionStorage.setItem('condition', JSON.stringify({ tag }))
        searchKey.value++ //force <main> reload
        window.scrollTo(0, document.querySelector('body').offsetTop)
    }, 0)
}
</script>