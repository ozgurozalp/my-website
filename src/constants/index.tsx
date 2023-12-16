import {
  TwitterLogo,
  InstagramLogo,
  GithubLogo,
  LinkedinLogo,
  Envelope,
  Article,
} from "@phosphor-icons/react";

export const links = [
  {
    name: "Blog",
    url: "https://blog.ozgurozalp.com",
    icon: <Article size={24} />,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/ozqurozalp",
    icon: <TwitterLogo size={24} />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/ozqurozalp",
    icon: <InstagramLogo size={24} />,
  },
  {
    name: "GitHub",
    url: "https://github.com/ozgurozalp",
    icon: <GithubLogo size={24} />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ozgurozalp",
    icon: <LinkedinLogo size={24} />,
  },
  {
    name: "Get in touch",
    url: "mailto:mail@ozgurozalp.com",
    icon: <Envelope size={24} />,
  },
];
