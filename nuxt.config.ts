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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
  loading: { color: '#fff' },
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
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
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
