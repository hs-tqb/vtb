module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'VPP - Airdrop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' },
      { hid: 'description', name: 'description', content: 'VPP - Airdrop' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      // {src:'https://www.googletagmanager.com/gtag/js?id=UA-112778678-1'},
      // {src:'/js/googletagmanager.js'},
      {src:'/js/jquery.3.3.1.min.js'}
    ],
  },
  css: [
    { src: '~assets/css/main.css' }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  // router: {
  //   middleware: ['parseQuery']
  // },
  build: {
    extractCSS:true,  // 打包css
  }
}
