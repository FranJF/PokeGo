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
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/FranJF/PokeGo",
  },
};

export const SERVER = process.env.SERVER;
