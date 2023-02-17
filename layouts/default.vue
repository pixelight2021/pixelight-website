<!-- default page layout -->
<template>
    <header class="z-40 top-0 w-full transition" :class="isMenuOpen ? 'fixed h-full bg-bg-dark text-white flex flex-col' : 'sticky bg-bg'">
        <div class="px-page-padding-sm md:px-page-padding-md xl:px-40 py-6 xl:py-12 flex justify-between items-center" :class="{ 'border-b border-white': isMenuOpen }">
            <NuxtLink :to="`/${locale}`" @click="handlePageClick">
                <Logotype class="w-[110.88px] md:w-[221.77px] xl:w-[281.92px]" :class="{ '[&>path]:fill-white': isMenuOpen }" />
            </NuxtLink>

            <div v-if="deviceSize < DEVICE_SIZE.XL">
                <div v-if="!isMenuOpen" class="[&>button]:ml-4">
                    <button class="material-symbols-outlined align-middle md:text-[36px]" @click="isSearching = true">search</button>
                    <button class="material-symbols-outlined align-middle md:text-[36px]" @click="handleMenuClick">drag_handle</button>
                </div>
                <button v-if="isMenuOpen" class="material-symbols-outlined align-middle md:text-[36px]" @click="handleMenuClick">close</button>
            </div>

            <div v-if="deviceSize >= DEVICE_SIZE.XL" class="text-h5 flex items-center [&>*]:pl-16">
                <NuxtLink :to="`/${locale}/about`">About</NuxtLink>
                <NuxtLink :to="`/${locale}/works`">Works</NuxtLink>
                <NuxtLink :to="`/${locale}/about`" @click="handleContactClick">Contact</NuxtLink>
                <div class="whitespace-nowrap">
                    <button class="uppercase" :class="{ 'text-theme-red': locale === locales[0] }" @click="handleLanguageSwitch(locales[0])">{{ locales[0]}}</button>
                    —
                    <button class="uppercase" :class="{ 'text-theme-red': locale === locales[1] }" @click="handleLanguageSwitch(locales[1])">{{ locales[1]}}</button>
                </div>
                <button class="material-symbols-outlined md:text-[24px]" @click="isSearching = true">search</button>
            </div>
        </div>

        <!-- menu open -->
        <div v-show="isMenuOpen" class="flex-1 px-page-padding-sm py-5 md:pb-[139px] text-h4 md:text-h2 md:text-h1 flex flex-col justify-between">
            <div class="[&>a]:block [&>a]:mb-6">
                <NuxtLink :to="`/${locale}/about`" @click="handlePageClick">About</NuxtLink>
                <NuxtLink :to="`/${locale}/works`" @click="handlePageClick">
                    Works
                    <ul class="[&>li]:mt-2">
                        <li v-for="c in categories" class="text-bdy-sm md:text-h5 uppercase">
                            {{ c.slug }}
                        </li>
                    </ul>
                </NuxtLink>
                <NuxtLink :to="`/${locale}/about`" @click="handleContactClick">Contact</NuxtLink>
            </div>

            <div class="text-bdy-lg md:text-h4 flex items-center uppercase">
                <button class="uppercase" :class="{ 'text-theme-red': locale === locales[0] }" @click="handleLanguageSwitch(locales[0])">{{ locales[0]}} &nbsp;</button>

                <span v-if="deviceSize < DEVICE_SIZE.MD">—</span>
                <span v-if="deviceSize >= DEVICE_SIZE.MD" class="material-symbols-outlined font-thin">
                    {{ locale === locales[0] ? 'arrow_forward' : 'arrow_back'}}
                </span>

                <button class="uppercase" :class="{ 'text-theme-red': locale === locales[1] }" @click="handleLanguageSwitch(locales[1])">&nbsp; {{ locales[1]}}</button>
            </div>
        </div>
    </header>

    <main class="relative grow" :key="searchKey">
        <!-- output page content -->
        <slot></slot>
    </main>

    <footer v-show="path != '/'" class="translate-y-full py-4 w-full bg-secondary text-ovr text-white text-center z-10">
        Copyright© 愛迪斯科技 2013 Axis 3D Technology, Inc. All Rights Reserved.
    </footer>

    <!-- loading mask -->
    <LoadingMask />

    <!-- search modal-->
    <Modal v-show="isSearching" :isSearching="isSearching" />

    <!-- image -->
    <div id="full-screen-image"></div>
</template>

<script setup>
/* svg component */
import Logotype from '@/assets/svg/logotype.svg'

/* composables */
import { DEVICE_SIZE } from '~~/composables/device'
import fetchData from '~~/composables/fetchData'

const { path } = useRoute()
const { locale, locales, setLocale } = useI18n()
function handleLanguageSwitch(l) {
    setLocale(l)
    isMenuOpen.value = false
}
const appConfig = useAppConfig()
const categories = computed(() => appConfig.categories.filter(c => c.slug != 'all'))

const searchKey = ref(0)
provide('searchKey', searchKey)

const isLoading = ref(true)
provide('isLoading', isLoading)

const isSearching = ref(false)
provide('isSearching', isSearching)

const isMenuOpen = ref(false)
function handleMenuClick() {
    isMenuOpen.value = !isMenuOpen.value
}

function handlePageClick() {
    isMenuOpen.value = false
}

function handleContactClick() {
    handlePageClick()
    setTimeout(() => {window.scrollTo(0, document.querySelector('footer').offsetTop)}, 0)
}

const deviceSize = ref()
provide('deviceSize', deviceSize)
if (process.client) {
    deviceSize.value = window.innerWidth
    function handleResize() {
        deviceSize.value = window.innerWidth
    }

    let prevScrollpos = window.pageYOffset
    function handlePageScroll() {
        if (isMenuOpen.value) return
        
        let currentScrollPos = window.pageYOffset
        if (currentScrollPos < document.getElementsByTagName("header").item(0).style.height) {
            document.getElementsByTagName("header").item(0).style.transform = "translateY(0%)"
            return
        }
        
        if (prevScrollpos > currentScrollPos) {
            document.getElementsByTagName("header").item(0).style.transform = "translateY(0%)"
        } else {
            document.getElementsByTagName("header").item(0).style.transform = "translateY(-100%)"
        }
        prevScrollpos = currentScrollPos
    }
    
    onMounted(() => {
        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handlePageScroll)
    })
    
    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize)
    })
}

await fetchData()
isLoading.value = false
</script>

