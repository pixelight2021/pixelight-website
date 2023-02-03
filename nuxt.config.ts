import svgLoader from "vite-svg-loader"

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
    vite: {
        plugins: [
            svgLoader({
                /* ... */
            })
        ]
    },
    build: {
        transpile: ['gsap'],
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
            messages: {
                zh: {
                    about_us: 'Pixelight是一個專注於創造互動體驗以及數位藝術的團隊，我們期許自己像光一樣，反射顧客心中的願景，並穿透、沁入觀眾的內心，呈現每次專案的核心價值與創意，折射出絢麗多彩的光芒，在形塑光的同時，一起創造新境界。',
                    feature: '我們善於應用科技美學，架設出傳播文化歷史與科學自然的橋樑。使用互動設計、視覺設計、空間設計、裝置設計、聲音設計與科技技術等元素協助客戶傳達他們的價值，擴大社會的知識含量。',
                    contact: {
                        office: '愛迪斯科技股份有限公司',
                        chat_with_us: '聯絡我們的FB',
                        phone: '台北: 02-2791-2917  I  台南: 06-205-7658',
                        located: '台北市114內湖區民權東路六段160號11F-3',
                    }
                },
                en: {
                    about_us: 'Pixelight is a team that focuses on creating interactive experiences and digital art. We expect ourselves to be like light, reflecting the vision in the hearts of customers, penetrating and infiltrating the hearts of the audience, presenting the core value and creativity of each project, and reflecting the brilliance The colorful light, while shaping the light, creates a new realm together.',
                    feature: 'We are good at applying science and technology aesthetics to build a bridge between cultural history and scientific nature. Use elements of interaction design, visual design, space design, installation design, sound design and technology to help clients convey their value and expand the knowledge content of society.',
                    contact: {
                        office: 'Axis3D Technology Co',
                        chat_with_us: 'Facebook',
                        phone: 'Taipei: 02-2791-2917  I  Tainan: 06-205-7658',
                        located: '11F.-3, No. 160, Sec. 6, Minquan E. Rd., Neihu Dist., Taipei City',
                    }
                }
            }
        },
        locales: ['zh', 'en'],
    }
})

