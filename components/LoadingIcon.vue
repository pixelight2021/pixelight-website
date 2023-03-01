<template>
    <svg id="logo" viewBox="-50 -50 100 100">
        <line class="line-1" x1="-24.5" y1="0" x2="24.5" y2="0"></line>
        <line class="line-2" x1="0" y1="-24.5" x2="0" y2="0"></line>
        <line class="line-3" x1="-18" y1="-18" x2="18" y2="18"></line>
        <line class="line-4" x1="0" y1="0" x2="18" y2="-18"></line>
    </svg>
</template>

<style scoped>
#logo {
    stroke: white;
    stroke-width: 8px;
    animation: fade 3s linear infinite;
}

@keyframes fade {
    85% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.line-1 {
    opacity: 0%;
    animation: anim-1 3s infinite;
    animation-timing-function: cubic-bezier("00.22, 1, 0.36, 1");
    transform-origin: center;
}

@keyframes anim-1 {
    10% {
        transform: translateX(-40px);
        opacity: 0;
    }

    35% {
        opacity: 1;
        transform: translateX(0px);
    }

    100% {
        opacity: 1;
    }
}

.line-2 {
    opacity: 0%;
    animation: anim-2 3s infinite;
    animation-timing-function: cubic-bezier("00.22, 1, 0.36, 1");
    transform-origin: center;
}

@keyframes anim-2 {
    20% {
        transform: translateY(-30px);
        opacity: 0;
    }

    40% {
        transform: translateY(0px);
        opacity: 1;
    }

    100% {
        opacity: 1;
    }
}

.line-3 {
    opacity: 0%;
    animation: anim-3 3s infinite;
    animation-timing-function: cubic-bezier("00.22, 1, 0.36, 1");
    transform-origin: center;
}

@keyframes anim-3 {
    30% {
        transform: translateX(-20px) translateY(-20px);
        opacity: 0;
    }

    45% {
        opacity: 1;
    }

    60% {
        transform: translateX(0px) translateY(0px);
        opacity: 1;
    }

    100% {
        opacity: 1;
    }
}

.line-4 {
    opacity: 0%;
    animation: anim-4 3s infinite;
    animation-timing-function: cubic-bezier("00.22, 1, 0.36, 1");
    transform-origin: center;
}

@keyframes anim-4 {
    45% {
        transform: translateX(-2px) translateY(2px);
        opacity: 0;
    }

    60% {
        opacity: 1;
    }
    
    75% {
        transform: translateX(0px) translateY(0px);
    }
    
    100% {
        opacity: 1;
    }
}
</style>