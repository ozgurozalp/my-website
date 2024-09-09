import {
  Envelope,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  Newspaper,
  XLogo,
  ReadCvLogo,
} from "@phosphor-icons/react";

export const links = [
  {
    name: "Blog",
    url: "/blog",
    icon: Newspaper,
  },
  {
    name: "Twitter",
    url: "https://x.com/ozqurozalp",
    icon: XLogo,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/ozqurozalp",
    icon: InstagramLogo,
  },
  {
    name: "GitHub",
    url: "https://github.com/ozgurozalp",
    icon: GithubLogo,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ozgurozalp",
    icon: LinkedinLogo,
  },
  {
    name: "Get in touch",
    url: "mailto:mail@ozgurozalp.com",
    icon: Envelope,
  },
  {
    target: "_blank",
    name: "View my resume",
    url: "/ozgurozalp.pdf",
    icon: ReadCvLogo,
  },
];
