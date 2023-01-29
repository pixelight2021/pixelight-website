// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    components: [
        {
            path: '~/components',
            extensions: ['.vue'],
        }
    ],
    modules: [
        '@nuxt/image-edge',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n'
    ],
    runtimeConfig: {
        buildModules: [
            "@nuxtjs/svg"
        ],
        public: {
            server_url: process.env.SERVER_URL
        }
    },
    app: {
        head: {
            link: [
                { rel: "preconnect", href: "https://fonts.googleapis.com" },
                { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
                { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&family=Noto+Sans+TC:wght@300;400;500&display=swap" },
                { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" }
            ]
        }
    },
    css: [
        "@/assets/css/style.css"
    ],
    i18n: {
        strategy: 'no_prefix',
        vueI18n: {
            legacy: false,
        },
        locales: ['zh', 'en']
    }
})

