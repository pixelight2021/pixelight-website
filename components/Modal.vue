<template>
    <div class="fixed top-0 left-0 w-full h-full bg-bg/75 z-50 backdrop-blur-sm flex justify-center">
        <div class="flex-1 self-start max-w-[873px] mx-page-padding-md mt-[82px] xl:my-auto max-h-[80%] rounded-[15px] bg-bg-dark px-[15px] md:px-[33px] pb-6 text-secondary md:text-h5 font-thin flex flex-col overflow-hidden">
            <div class="h-[72px] border-b-[0.5px] border-white flex items-center">
                <span class="material-symbols-outlined mr-2 align-middle text-h5 font-light">
                    search
                </span>
                <input v-model="condition" class="bg-transparent focus:outline-none min-w-0 text-white flex-1" :placeholder="deviceSize < DEVICE_SIZE.MD ? 'Search anything' : 'Search anything PIXELIGHT related'" />
                <button class="material-symbols-outlined ml-2 align-middle text-h5 font-light" @click="handleClose">
                    close
                </button>
            </div>

            <div v-if="deviceSize >= DEVICE_SIZE.MD && !condition" class="mt-3">
                <div class="text-bdy-sm">featured in PIXELIGHT</div>
                <ul class="flex">
                    <li v-for="w in featuredWorks" class="inline-block mr-14 text-bdy-sm w-[160px] overflow-hidden">
                        <NuxtLink :to="`/${locale}/works/${w.id}`" @click="handleClose">
                            <Image class="h-[120px]" :media-id="w.acf.cover" :full-screen="false" />
                            <div class="mt-2 overflow-hidden whitespace-nowrap text-ellipsis">{{ w.acf.name[`${locale}`] }}</div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>


            <div v-if="works.length > 0" class="mt-3">
                <div class="text-bdy-sm">page</div>
                <ul>
                    <li v-for="w in works">
                        <NuxtLink :to="`/${locale}/works/${w.id}`" class="mb-5 flex" @click="handleClose">
                            <div class="material-symbols-outlined mr-2 align-middle text-[36px] font-thin">arrow_forward</div>
                            <div class="overflow-hidden">
                                <h5 class="overflow-hidden text-white text-h5 font-normal whitespace-nowrap text-ellipsis">{{ w.acf.name[`${locale}`] }}</h5>
                                <p v-html="highlight(w.field, condition)" class="text-bdy-lg"></p>
                            </div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>

            <div v-if="works.length === 0 && condition" class="mt-3">
                No result for "<span class="text-white font-normal">{{ condition }}</span>"
                <div v-if="tags.length === 0" class="mt-3">
                    <div class="text-bdy-sm">try searching for</div>
                    <ul>
                        <li v-for="t in recommendTags" class="inline-block mr-4 mt-2 px-4 py-0.5 rounded-full border-[0.5px] border-white text-bdy-lg">
                            <NuxtLink :to="`/${locale}/works`" @click="handleTagClick(t)">{{ locale == locales[0] ? t.name : t.slug }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>

            <div v-if="!condition" class="mt-3">
                <div class="text-bdy-sm">best tags</div>
                <ul>
                    <li v-for="c in categories" class="inline-block mr-4 mt-2 px-4 py-0.5 rounded-full border-[0.5px] border-white text-bdy-lg">
                        <NuxtLink :to="`/${locale}/works`" @click="handleCategoryClick(c)">{{ locale == locales[0] ? c.name : c.slug }}</NuxtLink>
                    </li>
                </ul>
            </div>

            <div v-if="tags.length > 0" class="mt-3">
                <div class="text-bdy-sm">tags</div>
                <ul>
                    <li v-for="t in tags" class="inline-block mr-4 mt-2 px-4 py-0.5 rounded-full border-[0.5px] border-white text-bdy-lg">
                        <NuxtLink :to="`/${locale}/works`" @click="handleTagClick(t)">{{ locale == locales[0] ? t.name : t.slug }}</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
/* plugin */
import { useI18n } from 'vue-i18n';

/* composables */
import { DEVICE_SIZE } from '~~/composables/device';

const appConfig = useAppConfig()
const { locale, locales } = useI18n()

const works = ref([])
const tags = ref([])
const condition = ref()
const featuredWorks = computed(() => {
    return appConfig.works.slice(0, 3)
})
const categories = computed(() => appConfig.categories.filter(c => c.slug != 'all'))
const recommendTags = computed(() => appConfig.tags.slice(0, 3))
const deviceSize = inject('deviceSize')

/* condition change */
watch(condition, () => {
    works.value = []
    tags.value = []
    if (!condition.value) return

    appConfig.works?.forEach(w => {
        if (new RegExp(`.*${condition.value}.*`, 'g').test(w.acf.intro[`${locale.value}`])) {
            w.field = w.acf.intro[`${locale.value}`]
            works.value.push(w)
            return
        }
        w.acf.blocks?.forEach(b => {
            if (new RegExp(`.*${condition.value}.*`, 'g').test(b.value.content[`${locale.value}`])) {
                w.field = b.value.content[`${locale.value}`]
                works.value.push(w)
                return
            }
        })
    })

    const tagResult = appConfig.tags.filter(t => {
        const regex = new RegExp(`.*${condition.value}.*`, 'g')
        return regex.test(t.name) || regex.test(t.slug)
    })
    tags.value = tagResult
})

const isLoading = inject('isLoading')
const isSearching = inject('isSearching')
function handleClose() {
    condition.value = null
    isSearching.value = false
}

function highlight(p, str) {
    const idx = p.indexOf(str)
    const l = idx > 30 ? '...' + p.substring(idx - 20, idx) : p.substring(0, idx)
    const m = '<span style="font-weight: 600; color: white">' + p.substring(idx, idx + str.length) + '</span>'
    const r = p.length - (idx + str.length) > 30 ? p.substring(idx + str.length, idx + str.length + 20) + '...' : p.substring(idx + str.length)

    return l + m + r
}

const searchKey = inject('searchKey')
function handleTagClick(tag) {
    // isLoading.value = true
    handleClose()
    setTimeout(() => {
        sessionStorage.setItem('condition', JSON.stringify({ tag }))
        searchKey.value++ //force <main> reload
    }, 0)
}

function handleCategoryClick(category) {
    // isLoading.value = true
    handleClose()
    setTimeout(() => {
        sessionStorage.setItem('condition', JSON.stringify({ category }))
        searchKey.value++ //force <main> reload
    }, 0)
}
</script>