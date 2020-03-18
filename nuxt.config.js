const SITE_NAME = 'ShareTune'
const SITE_DESC = '好きな音楽を語ろう。'
const SITE_URL = 'https://share-tune.web.app'
const OGIMG_URL = `${SITE_URL}/ogimage.png`
require('dotenv').config()

export default {
  mode: 'spa',
  srcDir: 'app/',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    title: SITE_NAME,
    titleTemplate: '%s | ShareTune',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: SITE_DESC
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: SITE_NAME
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: SITE_URL
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: SITE_NAME
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: SITE_DESC
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: OGIMG_URL
      },
      { name: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/firebase/init.js',
    '~/plugins/firebase/analytics.js',
    '~/plugins/firebase/auth.js',
    '~/plugins/firebase/inject.js',
    '~/plugins/client-init.js',
    '~/plugins/dayjs.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/dotenv'
  ],
  //
  styleResources: {
    scss: ['~/assets/styles/_variables.scss']
  },
  //
  // Web App manifest
  //
  manifest: {
    name: SITE_NAME,
    short_name: SITE_NAME,
    lang: 'ja',
    title: SITE_NAME,
    'og:title': SITE_NAME,
    description: SITE_DESC,
    'og:description': SITE_DESC,
    theme_color: '#007c91', // primary color
    background_color: '#ffffff',
    display: 'fullscreen',
    icons: [
      {
        src: 'app/icons/icon@180px.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: 'app/icons/icon@192px.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'app/icons/icon@512px.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  //
  // environment variables
  //
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MSG_SENDER_ID: process.env.FIREBASE_MSG_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASURE_ID: process.env.FIREBASE_MEASURE_ID
  }
}
