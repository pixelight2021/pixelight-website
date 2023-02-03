<template>
    <div class="absolute w-full h-full top-0 pointer-event-none pt-[64px] pb-[24px] flex">

        <ClientOnly>
            <Three />
        </ClientOnly>

        <div ref="slogan" class="relative p-page text-center transition-opacity self-center" @click="handleClick">
            <h4 class="text-h4">
                Pixelight is a Design Team Founded in 2020. We Focus on Creating Interactive Experiences and Digital
                Art.
            </h4>
            <div class="flex justify-center items-center mt-4">
                <span class="material-symbols-outlined mr-3">360</span>
                ROTATE TO EXPLORE
            </div>
        </div>

        <div class="absolute w-full top-[41%] text-h3 font-semibold text-center z-10">{{ page }}</div>

        <!-- <div id="anchor-container" class="opacity-0 transition-opacity">
            <div id="about" class="anchor" @mouseover="handleAnchorHover">
                <nuxt-img v-show="anchorHover" class="rounded-full rotate-[-45deg]" src="jpg/bird.jpg" />
            </div>
            <div id="works" class="anchor" @mouseover="handleAnchorHover">
                <nuxt-img v-show="anchorHover" class="rounded-full rotate-[-45deg]" src="jpg/cat.jpg" />
            </div>
            <div id="contact" class="anchor" @mouseover="handleAnchorHover">
                <nuxt-img v-show="anchorHover" class="rounded-full rotate-[-45deg]" src="jpg/dog.jpg" />
            </div>
        </div> -->

        <div class="absolute p-page self-end">
            Visualization Editors
            <div class="grid grid-cols-input items-center gap-[10px] mt-[10px]">
                <span>Hue</span>
                <input type="range" class="shader-input" />
                <span>Speed</span>
                <input type="range" class="shader-input" />
                <span>Dimmer</span>
                <input type="range" class="shader-input" />
            </div>
        </div>

    </div>
</template>

<script setup>
const slogan = ref(true)
const page = ref('')
const anchorHover = ref(false)

function handleAnchorHover(e) {
    page.value = e.target.id.toUpperCase()
    anchorHover.value = true

    const handleMouseLeave = () => {
        page.value = ''
        anchorHover.value = false
        e.target.removeEventListener('mouseleave', handleMouseLeave);
    }
    e.target.addEventListener('mouseleave', handleMouseLeave);
}


function handleClick() {
    slogan.value.style.opacity = 0
    setTimeout(() => {
        slogan.value.style.display = 'none'
        document.getElementById('anchor-container').style.opacity = 1
    }, 150)
}
</script>

<style>
/* .anchor {
    position: fixed;
    z-index: 1;
    aspect-ratio: 1/1;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: black;

    transition: width 0.2s ease-in-out, height 0.2s ease-in-out, border-radius 0.2s ease-in-out, background-color 0.5s ease-in;
    width: 4px;
    border-radius: none;
}

.anchor:hover {
    width: 120px;
    border-radius: 50%;
    background-color: transparent;
}

.anchor::after {
    content: '';
    display: block;
    position: absolute;
    border: 1px solid black;
    border-radius: 50%;
    aspect-ratio: 1/1;
    width: 24px;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    transition: all 0.2s ease-in-out;
}

.anchor:hover::after {
    width: 140px;
    border-color: white;
} */

.shader-input {
    -webkit-appearance: none;
    top: 12px;
    height: 1px;
    background: black;
}

.shader-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    aspect-ratio: 1/1;
    width: 12px;
    border-radius: 50%;
    border: 1px solid black;
    background: white;
}
</style>