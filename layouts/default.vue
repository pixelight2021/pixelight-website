<!-- default page layout -->
<template>
    <header class="p-page pt-5 sm:pt-14 flex justify-between">
        <img class="sm:w-[281.92px]" src="~assets/svg/logotype.svg" />
        <span class="material-symbols-outlined">menu</span>
    </header>

    <main>
        <!-- output page content -->
        <!-- <Suspense> -->
        <slot></slot>
        <!-- </Suspense> -->
    </main>

    <footer v-show="path != '/'" class="bg-[#989898] h-[43px] font-['Noto Sans TC'] text-[8px] text-center">
        Copyright© 愛迪斯科技 2013 Axis 3D Technology, Inc. All Rights Reserved.
    </footer>
</template>

<script setup>
import getTags from '~~/composables/getTags'
import getTagGroups from '~~/composables/getTagGroups';
import getMedias from '~~/composables/getMedias'

const { path } = useRoute()

const appConfig = useAppConfig()
appConfig.tags = await getTags()
appConfig.tagGroups = await getTagGroups()
appConfig.medias = await getMedias()
</script>