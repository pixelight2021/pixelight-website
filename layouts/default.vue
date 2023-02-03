<!-- default page layout -->
<template>
    <header class="p-page py-5 sm:pt-14 flex justify-between items-center relative z-10">
        <Logotype class="sm:w-[281.92px]"/>
        <span class="material-symbols-outlined">menu</span>
        <button @click="handleLanguageSwitch('zh')">中</button>
        <button @click="handleLanguageSwitch('en')">英</button>
    </header>
    <!-- <div class="p-page">
        <SearchBar />
    </div> -->

    <main>
        <!-- output page content -->
        <slot></slot>
    </main>

    <footer v-show="path != '/'" class="p-page py-4 bg-[#989898] text-[8px] text-white">
        Copyright© 愛迪斯科技 2013 Axis 3D Technology, Inc. All Rights Reserved.
    </footer>
</template>

<script setup>
/* svg component */
import Logotype from '@/assets/svg/logotype.svg'

import getWorks from '~~/composables/getWorks'
import getTags from '~~/composables/getTags'
import getTagGroups from '~~/composables/getTagGroups'
import getClients from '~~/composables/getClients'
import getMedias from '~~/composables/getMedias'

const { path } = useRoute()

const appConfig = useAppConfig()
appConfig.works = await getWorks()
// console.log(appConfig.works)
appConfig.tags = await getTags()
// console.log(appConfig.tags)
appConfig.tagGroups = await getTagGroups()
// console.log(appConfig.tagGroups)
appConfig.clients = await getClients()
// console.log(appConfig.clients)
appConfig.medias = await getMedias()
// console.log(appConfig.medias)

const { locale } = useI18n()
function handleLanguageSwitch(lang) {
        locale.value = lang
        console.log(locale.value)
}
</script>