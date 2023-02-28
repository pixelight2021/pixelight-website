<template>
    <div v-if="deviceSize < DEVICE_SIZE.MD" class="relative px-page-padding-sm pt-[70px]">
        <Logo class="w-[77px] absolute top-[134px] right-[28px]" />
        <div class="absolute top-0 right-[66px] w-px h-[134px] bg-gradient-to-b from-theme-yellow via-theme-blue to-black"></div>

        <a class="block text-stl-lg mb-[19px]" href="https://www.axis3d.com/" target="_blank">
            OFFICES
            <div class="text-ovr">{{ $t('contact.office') }}</div>
        </a>
        <a class="block text-stl-lg mb-[19px]" href="https://www.facebook.com/Pixelight2020" target="_blank">
            CHAT WITH US
            <div class="text-ovr">{{ $t('contact.chat_with_us') }}</div>
        </a>
        <div class="text-st-lg mb-[19px]">
            PHONE
            <div class="text-ovr">{{ $t('contact.phone') }}</div>
        </div>
        <a class="block text-stl-lg mb-[19px]" href="https://goo.gl/maps/TBmcJowEiLd9zgQb7" target="_blank">
            LOCATED
            <div class="text-ovr">{{ $t('contact.located') }}</div>
        </a>
    </div>

    <div v-if="deviceSize >= DEVICE_SIZE.MD" class="relative mx-auto pt-[60px] px-8 xl:px-[228px] max-w-[1920px] flex justify-between">
        <div class="relative">
            <Logo class="relative w-[94px] top-[74px]" />
            <div class="absolute -top-[60px] left-[47px] w-px h-[134px] bg-gradient-to-b from-theme-yellow via-theme-blue to-black"></div>
        </div>

        <div class="mx-8">
            <a class="block text-stl-lg mb-[19px]" href="https://www.axis3d.com/" target="_blank">
                OFFICES
                <div class="text-ovr">{{ $t('contact.office') }}</div>
            </a>
            <a class="block text-stl-lg mb-[19px]" href="https://www.facebook.com/Pixelight2020" target="_blank">
                CHAT WITH US
                <div class="text-ovr">{{ $t('contact.chat_with_us') }}</div>
            </a>
            <div class="text-st-lg mb-[19px]">
                PHONE
                <div class="text-ovr">{{ $t('contact.phone') }}</div>
            </div>
            <a class="block text-stl-lg mb-[19px]" href="https://goo.gl/maps/TBmcJowEiLd9zgQb7" target="_blank">
                LOCATED
                <div class="text-ovr">{{ $t('contact.located') }}</div>
            </a>
        </div>

        <a href="https://goo.gl/maps/TBmcJowEiLd9zgQb7" target="_blank">
            <img src="/image/map.png" class="aspect-square w-[235px] border  rounded-lg" />
        </a>
    </div>
</template>

<script setup>
import { DEVICE_SIZE } from '~~/composables/device'

import Logo from "@/assets/svg/logo.svg"

const deviceSize = inject('deviceSize')
const { locale } = useI18n()
</script>

