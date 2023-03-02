<template>
    <div class="mt-12 px-page-padding-sm md:px-page-padding-md xl:px-page-padding-xl text-bdy-lg">
        <div class="mx-auto mb-3 max-w-[1178px] text-h6 font-bold">{{ value.header[`${locale}`] }}</div>
        <p class="mx-auto mb-6 max-w-[1178px] whitespace-pre-wrap">{{ value.content[`${locale}`] }}</p>

        <!-- <Image v-if="value.images.length == 1" class="w-full min-h-[181px] md:min-h-[374px]" :media-id="value.images[0]" />

                <div v-if="value.images.length == 2" class="grid grid-cols-2 gap-3 md:gap-6">
                    <Image class="min-h-[87px] md:min-h-[180px]" :media-id="value.images[0]" />
                    <Image class="min-h-[87px] md:min-h-[180px]" :media-id="value.images[1]" />
                </div>

                <div v-if="value.images.length == 3" class="grid grid-cols-2 gap-3 md:gap-6">
                    <Image class="min-h-[87px] md:min-h-[180px]" :media-id="value.images[0]" />
                    <Image class="min-h-[87px] md:min-h-[180px]" :media-id="value.images[1]" />
                    <Image class="col-start-1 col-end-3 min-h-[181px] md:min-h-[374px]" :media-id="value.images[2]" />
                </div> -->

        <Image v-if="value.images.length == 1" class="w-full" :media-id="value.images[0]" />

        <div v-if="value.images.length == 2" class="grid grid-cols-2 gap-3 md:gap-6">
            <Image :media-id="value.images[0]" />
            <Image :media-id="value.images[1]" />
        </div>

        <div v-if="value.images.length == 3" class="grid grid-cols-2 gap-3 md:gap-6">
            <Image :media-id="value.images[0]" />
            <Image :media-id="value.images[1]" />
            <Image class="col-start-1 col-end-3" :media-id="value.images[2]" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['value'])
const { locale } = useI18n()
</script>