const { description } = require('../../package')

module.exports = {

  locales: {
    '/': {
      lang: 'en',
      title: 'Solutions supporting questions ComputerArchitecture',
      description: description
    },

    '/dutch/': {
      lang: 'nl',
      title: 'Oplossingen ondersteunende vragen ComputerArchitectuur',
      description: description
    }
  },

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/JoeyDeSmet/OplossingenOndersteunendeVragenComputerarchitectuur',
    
    locales: {
      '/': {
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,
        
        nav: [
          {
            text: 'Chapters',
            link: '/chapters/',
          },
        ],

        sidebar: {
          '/chapters/': [
            {
              title: 'Chapters',
              collapsable: false,
              children: [
                ['/chapters/chapter1/', 'Chapter1'],
                ['/chapters/chapter3/', 'Chapter3'],
              ]
            },
          ],
        }
      },

      '/dutch/': {
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,

        nav: [
          {
            text: 'Chapters',
            link: '/dutch/chapters/',
          },
        ],

        sidebar: {
          '/dutch/chapters/': [
            {
              title: 'Chapters',
              collapsable: false,
              children: [
                ['/dutch/chapters/chapter1/', 'Chapter1'],
                ['/dutch/chapters/chapter3/', 'Chapter3'],
              ]
            },
          ],
        }
      }
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
