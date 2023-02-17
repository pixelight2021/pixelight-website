<template>
    <svg viewBox="0 0 100 100">
        <defs>
            <linearGradient :id="`stroke-${props.ringId}`" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" :stop-color="props.from" />
                <stop offset="100%" :stop-color="props.to" />
            </linearGradient>
        </defs>
        <ellipse cx="50" cy="50" rx="49" ry="49" :stroke="`url(#stroke-${props.ringId})`" stroke-width="0.5" fill="none" />
    </svg>
</template>

<script setup>
const props = defineProps(['ringId', 'from', 'to'])
</script>