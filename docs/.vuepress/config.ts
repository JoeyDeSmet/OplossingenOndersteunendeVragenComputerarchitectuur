import { sidebarEn } from "./configs/sidebar/en";
import { sidebarNl } from "./configs/sidebar/nl";
import { defineUserConfig, defaultTheme } from "vuepress";

export default defineUserConfig({

  locales: {
    '/': {
      lang: 'en',
      title: 'Solutions supporting questions ComputerArchitecture',
      description: 'These are the solutions to the supporting questions.'
    },

    '/dutch': {
      lang: 'dutch',
      title: 'Oplossingen ondersteunende vragen ComputerArchitectuur',
      description: 'Dit zijn de oplossingen voor de ondersteunende vragen.'
    }
  },

  theme: defaultTheme({
    editLink: false,
    docsDir: 'docs',
    repo: 'https://github.com/JoeyDeSmet/OplossingenOndersteunendeVragenComputerarchitectuur',

    navbar: [
      { text: 'Home', link: '/' }
    ],

    locales: {
      '/': {
        home: '/',
        sidebar: sidebarEn,
      },

      '/dutch': {
        home: '/dutch',
        sidebar: sidebarNl,
      }
    }
  }),

});

