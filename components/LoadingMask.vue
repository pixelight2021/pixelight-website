<template>
    <!-- <div id="loading-mask" class="fixed z-50 left-0 top-0 w-full h-full bg-bg-dark flex justify-center items-center" :class="{ 'startLoad': isLoading, 'endLoad': !isLoading }"> -->
    <div id="loading-mask" class="fixed z-50 left-0 top-0 w-full h-full bg-bg-dark flex justify-center items-center">
        <LoadingIcon width="80" height="80" />
    </div>
</template>

<script setup>
// import fetchData from '~~/composables/fetchData'

const isLoading = inject('isLoading')

// await fetchData()
// isLoading.value = false
onMounted(() => {
    // document.getElementById('loading-mask').classList.remove('startLoad')
    const id = setInterval(() => {
        if (isLoading.value == false) {
            document.getElementById('loading-mask').classList.add('endLoad')
            clearInterval(id)
        }
    }, 3000)
})
</script>

<style scoped>
#loading-mask {
    background-color: #292929;
    background-size: 300% 100%;
    animation-iteration-count: 1;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
}

.startLoad {
    animation-name: startLoad;
    /* background: linear-gradient(to right, transparent 33%, #292929ff 66%); */
}

.endLoad {
    animation-name: endLoad;
    /* background: linear-gradient(to right, #292929ff 33%, transparent 66%); */
}

@keyframes startLoad {
    from {
        pointer-events: none;
        visibility: hidden;
        opacity: 0;
        /* background-position-x: 0%; */
    }

    to {
        opacity: 1;        
        /* background-position-x: 100%; */
    }
}

@keyframes endLoad {
    from {
        opacity: 1;
        /* background-position-x: 0%; */
    }

    to {
        pointer-events: none;
        visibility: hidden;
        opacity: 0;
        /* background-position-x: 100%; */
    }
}
</style>