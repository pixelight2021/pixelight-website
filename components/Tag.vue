<template>
    <li v-if="tag" class="inline-block rounded-full border border-secondary-dark px-2 py-0.5 text-ovr text-center text-secondary-dark">
        #{{ locale == locales[0] ? tag?.name : tag?.slug }}
    </li>
</template>

<script setup>
const props = defineProps(['tagId'])
const { locale, locales } = useI18n()
const tag = useAppConfig().tags.find(t => t.id === props.tagId)
</script>