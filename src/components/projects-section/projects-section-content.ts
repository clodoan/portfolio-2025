import type { Project } from "./components/filterable-projects/filterable-projects";

export const projects: Project[] = [
  {
    id: "annotate-instances",
    title: "Annotate Instances",
    description:
      "A Figma plugin to annotate instances of your components in your design system so Engineers know what to use.",
    link: "https://www.figma.com/community/plugin/1148778271243240018/annotate-instances",
    mediaAsset: "/plugins/annotate-instances.svg",
    category: "plugins",
  },
  {
    id: "black-and-white",
    title: "Black and White",
    description:
      "A Figma plugin to quickly convert your designs to black and white.",
    link: "https://www.figma.com/community/plugin/1091815827328120861/black-and-white",
    mediaAsset: "/plugins/black-and-white.svg",
    category: "plugins",
  },
  {
    id: "new-doc-scan",
    title: "New ID doc capture flow",
    description:
      "Improved conversion rate of ID doc capture flow from 60% to +90%.",
    mediaAsset: "/projects/id-doc/status-sheet.png",
    category: "design",
    link: "/projects/new-doc-scan",
    disabled: false,
  },
  {
    id: "date-picker",
    title: "Date picker",
    description: "A date picker component built with React and Tailwind CSS.",
    category: "designCode",
    mediaAsset: "hQqT01Lt6e5IE02qW6d29mmGE00KwEzSiESfvmh7qgGovM",
    disabled: false,
  },
  {
    id: "multi-select",
    title: "Multi select",
    description: "A multi select component built with React and Tailwind CSS.",
    category: "designCode",
    mediaAsset: "OjGzGjaCLOmO6q02cqmEGY021t9Y2C31xIk4B027QG02EJw",
    disabled: false,
  },
  {
    id: "full-screen-filters",
    title: "Full screen filters",
    description:
      "A full screen filters component built with React and Tailwind CSS.",
    category: "designCode",
    mediaAsset: "dv00y8QSIxdzcXNFoIT1yf1KgKrIIQqdMmKFm3z1xDbY",
    disabled: false,
  },
  {
    id: "risk-signal-glossary",
    title: "Risk signal glossary",
    description:
      "A glossary of risk signals built with React and Tailwind CSS.",
    category: "designCode",
    mediaAsset: "DiIJe22Gz1502eS1xHSQ6WLjSebYGogwhHC9wugkFQBc",
    disabled: false,
  },
  {
    id: "tax-credits",
    title: "Tax credits",
    description: "A redesign of our tax credits flow.",
    category: "design",
    mediaAsset: "/projects/tax-credits/solution-6.jpg",
    link: "/projects/tax-credits",
    disabled: false,
  },
];
