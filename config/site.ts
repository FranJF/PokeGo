export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "PokeGo",
    description: "Ayudando a la comunidad de Pokemon Go",
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
