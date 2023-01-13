import type { SidebarConfig } from "vuepress";

export const sidebarNl: SidebarConfig = {

  '/dutch/chapters/': [
    {
      text: 'Chapters',
      children: [
        '/dutch/chapters/chapter1/',
        '/dutch/chapters/chapter3/',
        '/dutch/chapters/chapter5/',
      ]
    }

  ]

};