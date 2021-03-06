import { Configuration } from '@nuxt/types'
const SITE_NAME = 'ShareTune'
const SITE_DESC = '好きな音楽を語ろう。'
const SITE_URL = 'https://share-tune.web.app'
const OGIMG_URL = `${SITE_URL}/ogimage.png`
const path = require('path')
require('dotenv').config()

const config: Configuration = {
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
      // for iOS Web App
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default'
      },
      // for OGP
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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

      {
        href: 'splashscreens/iphone5_splash.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'splashscreens/iphone6_splash.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'splashscreens/iphoneplus_splash.png',
        media:
          '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'splashscreens/iphonex_splash.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'splashscreens/iphonexr_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'splashscreens/iphonexsmax_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'splashscreens/ipad_splash.png',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'splashscreens/ipadpro1_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'splashscreens/ipadpro3_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'splashscreens/ipadpro2_splash.png',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      }
    ]
  },
  //
  // router
  //
  router: {
    middleware: ['valid-login']
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#007c91', // primary color
    height: '4px',
    continuous: true
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/firebase/init.ts',
    '~/plugins/firebase/analytics.ts',
    '~/plugins/firebase/auth.ts',
    '~/plugins/firebase/inject.ts',
    '~/plugins/client-init.ts',
    '~/plugins/dayjs.ts'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/color-mode',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxtjs/svg-sprite'],
  //
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme'
  },
  //
  styleResources: {
    scss: ['~/assets/styles/_variables.scss']
  },
  //
  // Web App manifest
  //
  manifest: {
    lang: 'ja',
    name: SITE_NAME,
    short_name: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESC,
    theme_color: '#007c91', // primary color
    background_color: '#ffffff',
    display: 'fullscreen',
    orientation: 'natural' // lock direction of rotation
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname)
    }
  },
  //
  // environment variables
  //
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY!,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN!,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL!,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID!,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET!,
    FIREBASE_MSG_SENDER_ID: process.env.FIREBASE_MSG_SENDER_ID!,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID!,
    FIREBASE_MEASURE_ID: process.env.FIREBASE_MEASURE_ID!
  }
}

export default config
