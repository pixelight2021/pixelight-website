<template>
    <div class="relative flex-1 flex flex-col justify-center items-center overflow-hidden">
        <div class="absolute font-status-code text-[326px] md:text-[622px] text-secondary/50 rotate-90 xl:rotate-0 -z-[1]">{{ error.statusCode }}</div>
        <div class="text-h2 md:text-[80px] xl:text-[100px]">{{ emoticon }}</div>
        <div class="font-medium md:text-h5 xl:text-h4">{{ error.message }}</div>
        <button class="mt-10 rounded-full bg-white border border-black px-4 py-0.5">
            <NuxtLink to="/">Go Home</NuxtLink>
        </button>
    </div>
</template>

<script setup>
defineProps(['error'])
const emoticons = [
    '(^_^)b',
    '(o^^)o',
    '(·_·)',
    'ಠ_ಠ',
    '(@~@)?',
    '(´･ω･`)',
    '(✖﹏✖)',
    'ʕ◉ᴥ◉ʔ',
    '(>_<)',
    '(๑´ㅂ`๑)'
]
const emoticon = computed(() => {
    const idx = Math.floor(Math.random() * emoticons.length)
    console.log(idx)
    return emoticons[idx]
})
</script>