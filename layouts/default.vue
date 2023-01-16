<template>
    <header class="pt-5 sm:pt-14 flex justify-between z-10">
        <!-- default page layout -->
        <img class="sm:w-[281.92px]" src="~assets/svg/logotype.svg" />
        <span class="material-symbols-outlined">menu</span>
    </header>
    <!-- output page content -->
    <main class="grow flex flex-col">
        <slot />
    </main>
</template>