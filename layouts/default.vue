<!-- default page layout -->
<template>
    <header class="px-[24px] pt-5 sm:pt-14 flex justify-between z-10">
        <img class="sm:w-[281.92px]" src="~assets/svg/logotype.svg" />
        <span class="material-symbols-outlined">menu</span>
    </header>

    <main class="grow flex flex-col">
        <!-- output page content -->
        <slot></slot>
    </main>

    <footer class="bg-[#989898] h-[43px] font-['Noto Sans TC'] text-[8px] text-center">
        Copyright© 愛迪斯科技 2013 Axis 3D Technology, Inc. All Rights Reserved.
    </footer>
</template>