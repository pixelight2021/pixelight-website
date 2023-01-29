<template>
    <div class="text-h5 text-center">"Let Us Creating Interactive Experiences Together."</div>

    <img class="sm:w-[281.92px]" src="~assets/svg/concept.svg" />

    <div class="p-page">
        <div class="title" id="about-us">
            <div class="text-h4 leading-[100%]">關於<br />我們</div>
            <div class="text-st-sm">About Us</div>
        </div>
        <div>
            Pixelight是一個專注於創造互動體驗以及數位藝術的團隊，我們期許自己像光一樣，反射顧客心中的願景，並穿透、沁入觀眾的內心，呈現每次專案的核心價值與創意，折射出絢麗多彩的光芒，在形塑光的同時，一起創造新境界。
        </div>
    </div>

    <ul ref="container" class="keen-slider">
        <li v-for="tg in tagGroups" class="keen-slider__slide tag-group">{{ tg.label }}</li>
    </ul>
    <div class="flex justify-center">
        <div v-for="(tg, idx) in tagGroups" class="tag-group-dot" :class="{ 'active-dot': current === idx }"></div>
    </div>
    <ul class="p-page">
        <Tag v-for="t in tags" @click="handleTagClick(t)">{{ t.name }}</Tag>
    </ul>

    <div class="p-page">
        <div class="title" id="feature">
            <div class="text-h4 leading-[100%]">特色</div>
            <div class="text-st-sm">Feature</div>
        </div>
        <div>
            我們善於應用科技美學，架設出傳播文化歷史與科學自然的橋樑。使用互動設計、視覺設計、空間設計、裝置設計、聲音設計與科技技術等元素協助客戶傳達他們的價值，擴大社會的知識含量。
        </div>
    </div>

    <div class="bg-[#fff]">
        <div class="text-center">
            <div class="text-h4 leading-[100%]">合作客戶</div>
            <div class="text-st-sm">Our Clients</div>
        </div>
    </div>

    <div class="p-page">
        <div class="text-st-lg mb-[19px]">
            OFFICES
            <div class="text-ovr">愛迪斯科技股份有限公司</div>
        </div>
        <div class="text-st-lg mb-[19px]">
            CHAT WITH US
            <div class="text-ovr">聯絡我們的FB</div>
        </div>
        <div class="text-st-lg mb-[19px]">
            PHONE
            <div class="text-ovr">台北 : 02-2791-2917 | 台南 : 06-205-7658</div>
        </div>
        <div class="text-st-lg mb-[19px]">
            LOCATED
            <div class="text-ovr">台北市114內湖區民權東路六段160號11F-3</div>
        </div>
    </div>
</template>

<script setup>
// import { ref, computed } from 'vue';

import { useKeenSlider } from 'keen-slider/vue.es';
import 'keen-slider/keen-slider.min.css'

const current = ref(1)
const [container, slider] = useKeenSlider({
    initial: current.value,
    slides: {
        origin: 'center',
        perView: 'auto',
        spacing: 26
    },
    slideChanged: (s) => {
        current.value = s.track.details.rel
    },
})

const appConfig = useAppConfig()
console.log(appConfig.tagGroups)
const tagGroups = computed(() => appConfig.tagGroups.filter(tg => tg.label != 'not assigned'))
const tags = ref(appConfig.tags)

function handleTagClick(tag) {
    tagGroups.value.find((tg, idx) => {
        if (tg.term_group == tag.groups[0]) {
            slider.value.moveToIdx(idx)
        }
    })

}
</script>

<style scope>
.tag-group {
    background-color: white;
    aspect-ratio: 1;
    min-width: 216px;
    line-height: 216px;
    border-radius: 50%;
    text-align: center;
    font-size: 48px;
}

.tag-group-dot {
    display: inline-block;
    background-color: #d9d9d9;
    aspect-ratio: 1;
    width: 9px;
    border-radius: 50%;
    margin: 0 4.5px;
}

.active-dot {
    @apply bg-[#898989];
}

.title::after {
    content: '';
    display: block;
    position: absolute;
    width: 50%;
    /* line width */
    height: 2px;
}

#about-us::after {
    left: 0;
    background: linear-gradient(to right, #FFBABD, #FCFF00);
}

#feature {
    text-align: right;
}

#feature::after {
    right: 0;
    background: linear-gradient(to left, #46FFF4, #FCFF00);
}
</style>