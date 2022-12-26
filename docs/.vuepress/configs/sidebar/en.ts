import type { SidebarConfig } from "vuepress";

export const sidebarEn: SidebarConfig = {

  '/chapters/': [
    {
      text: 'Chapters',
      children: [
        '/chapters/chapter1/',
        '/chapters/chapter3/',
      ]
    }

  ]

};