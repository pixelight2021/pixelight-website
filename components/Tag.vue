<template>
    <li class="inline-block min-w-[70px] border p-0.5 mr-[10px] text-ovr text-center">
        #<slot />
    </li>
</template>

<!-- <script setup>
const props = defineProps(['tagId'])
const appConfig = useAppConfig()
const tag = appConfig.tags.find(t => t.id === props.tagId)
</script> -->