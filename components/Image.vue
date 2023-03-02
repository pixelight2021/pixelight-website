<template>
    <div :class="{ 'bg-secondary': fallback }">
        <NuxtImg v-if="src" :src="src" class="object-cover min-w-full min-h-full max-h-full" @click="handleImageClick" />
        <Teleport v-if="isOpen && fullScreen" to='#full-screen-image'>
            <div class="fixed z-50 left-0 top-0 w-full h-full bg-bg-dark/75 backdrop-blur-sm flex justify-center items-center" @click="handleImageClick">
                <NuxtImg v-if="src" :src="src" class="object-fit w-auto h-auto" />
            </div>
        </Teleport>
    </div>
</template>

<script setup>
import { fetchMedia } from '~~/composables/fetchData'

const props = defineProps({
    mediaId: {
        type: Number
    },
    fullScreen: {
        type: Boolean,
        default: true
    },
    fallback: {
        type: Boolean,
        default: false
    }
})
const src = ref()
const appConfig = useAppConfig()
const isfetched = appConfig.medias.has(props.mediaId)
if (isfetched) {
    src.value = appConfig.medias.get(props.mediaId)
} else {
    fetchMedia(props.mediaId).then(({ data }) => {
        appConfig.medias.set(props.mediaId, data.value.source_url)
        src.value = data.value.source_url
    })
}

const isOpen = ref(false)
function handleImageClick() {
    isOpen.value = !isOpen.value
}
</script>