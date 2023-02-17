<template>
    <div id="loading-mask" class="fixed z-50 left-0 top-0 w-full h-full bg-bg-dark" :class="{ 'startLoad': isLoading, 'endLoad': !isLoading }">
        <Loading class="w-[500px] h-[500px] z-50"/>
    </div>
</template>

<script setup>
/* svg component */
import Loading from '@/assets/svg/loading.svg'

const isLoading = inject('isLoading')
onMounted(() => {
    document.getElementById('loading-mask').classList.remove('startLoad')
})
</script>

<style scoped>
#loading-mask {
    background-size: 300% 100%;
    animation-iteration-count: 1;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
}

.startLoad {
    animation-name: startLoad;
    background: linear-gradient(to right, transparent 33%, #292929ff 66%);
}

.endLoad {
    animation-name: endLoad;
    background: linear-gradient(to right, #292929ff 33%, transparent 66%);
}

@keyframes startLoad {
    from {
        pointer-events: none;
        background-position-x: 0%;
    }

    to {
        background-position-x: 100%;
    }
}

@keyframes endLoad {
    from {
        background-position-x: 0%;
    }

    to {
        pointer-events: none;
        background-position-x: 100%;
    }
}
</style>