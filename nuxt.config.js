export default {
  mode: 'universal',
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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Bree+Serif|Ubuntu:400,700&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/scss/global.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/clipboard'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],
  markdownit: {
    injected: true
  },
  toast: {
    containerClass: 'toast-block',
    duration: 3000,
    singleton: true,
    register: [
      // Register custom toasts
      {
        name: 't_error',
        message(payload) {
          if (!payload.message) {
            return 'Oops.. Something Went Wrong..'
          }
          // if there is a message show it with the message
          return payload.message
        },
        options: {
          className: 't__error',
          iconPack: 'fontawesome',
          theme: 'bubble',
          action: {
            icon: 'times',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        }
      },
      {
        name: 't_success',
        message(payload) {
          if (!payload.message) {
            return 'Success!'
          }
          // if there is a message show it with the message
          return payload.message
        },
        options: {
          type: 'success',
          className: 't__success'
        }
      }
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
