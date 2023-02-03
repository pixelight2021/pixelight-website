<template>
    <div class="relative">
        <div class="relative z-10 bg-white h-10 rounded-lg flex justify-between items-center px-2">
            <span class="material-symbols-outlined text-cpt text-[#C5C5C5]">search</span>

            <span class="flex-1 overflow-x-auto whitespace-nowrap h-full flex items-center mx-2">
                <!-- <span class="">
                    <span class="text-ovr border-[1px] p-1 mr-1">3D動畫 <span
                            class="material-symbols-outlined text-cpt align-text-top">close</span></span>
                    <span class="text-ovr border-[1px] p-1 mr-1">裝置藝術 <span
                            class="material-symbols-outlined text-cpt align-text-top">close</span></span>
                    <span class="text-ovr border-[1px] p-1 mr-1">展覽 <span
                            class="material-symbols-outlined text-cpt align-text-top">close</span></span>
                </span> -->
                <input id="search-bar" class="outline-none max-w-full" type="text" v-model="condition"
                    @keyup="handleConditionChange" />
            </span>

            <span class="text-[#C5C5C5]">IN</span>

            <span class=" relative px-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FFBABD] to-[#FCFF00]"># 標籤
                <!-- <ul class="bg-white absolute z-10 w-full left-0 top-10 rounded-[7px] p-2 text-black">
                    <li># 標籤</li>
                    <li>T 專案</li>
                </ul> -->
            </span>

            <button class="material-symbols-outlined align-middle">expand_more</button>

        </div>
        <ul v-show="options?.length" class="absolute top-8 w-full rounded-b-lg bg-[#C5C5C5] p-2">
            <li v-for="o in options" class="my-2">{{ o.name }}</li>
        </ul>
    </div>

    <ul v-show="result" class="bg-[#C5C5C5]">
        <li v-for="work in result">
            <div class="aspect-square w-[24px] border-[1px] border-black rounded-full"></div>
            <div class="text-h6">{{ work.acf.name[`${$i18n.locale}`] }}</div>
        </li>
    </ul>
</template>

<script setup>
const appConfig = useAppConfig()
// const referenceTags = ref()
const condition = ref(null)
const options = ref(null)

const result = ref(null)

const SEARCH_MODE = {
    TAG: 'search by tag',
    CONTENT: 'search by content'
}
const searchMode = ref(SEARCH_MODE.TAG)

function handleConditionChange() {
    // options.value = appConfig.tags.filter(t => new RegExp(`.*${condition.value}.*`, 'g').test(t.name))
    // console.log(options.value)

    result.value = null
    if(!condition.value) return

    const referenceTags = appConfig.tags.filter(t => new RegExp(`.*${condition.value}.*`, 'g').test(t.name))
    result.value = appConfig.works.filter(w => {
        let hasTag = false
        referenceTags.forEach(t => {
            if(w.tags.includes(t.id)) hasTag = true
        })
        return hasTag
    })
}

function handleTagsClick() {

}
</script>

<style scope>

</style>