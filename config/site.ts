export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "PokeGo",
  description: "Proyecto de codigo abierto sobre Pokemon Go",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Shiny",
      href: "/shiny",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Shiny",
      href: "/shiny",
    },
  ],
  links: {
    github: "https://github.com/FranJF/PokeGo",
  },
};

export const SERVER = process.env.SERVER;
