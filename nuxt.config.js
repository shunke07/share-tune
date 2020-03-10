export default {
  mode: 'spa',
  srcDir: 'app/',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
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
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/firebase/init.js'],
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
  modules: ['@nuxtjs/pwa'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  // environment variables
  env: {
    FIREBASE_API_KEY: 'AIzaSyDYFQ0ofx0raM52hSNHVKTFDwG8DK5y2EY',
    FIREBASE_AUTH_DOMAIN: 'share-tune.firebaseapp.com',
    FIREBASE_DATABASE_URL: 'https://share-tune.firebaseio.com',
    FIREBASE_PROJECT_ID: 'share-tune',
    FIREBASE_STORAGE_BUCKET: 'share-tune.appspot.com',
    FIREBASE_MSG_SENDER_ID: '529502998438',
    FIREBASE_APP_ID: '1:529502998438:web:5830a9018ad875a021c967',
    FIREBASE_MEASURE_ID: 'G-BVSWTW0GZ1'
  }
}
