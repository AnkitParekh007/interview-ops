import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'InterviewOps',
  tagline: 'Practice better. Answer sharper. Interview with confidence.',
  favicon: 'img/favicon.ico',
  url: 'https://ankitparekh007.github.io',
  baseUrl: '/interview-ops/',
  organizationName: 'AnkitParekh007',
  projectName: 'interview-ops',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/AnkitParekh007/interview-ops/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/interviewops-social.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'InterviewOps',
      logo: {
        alt: 'InterviewOps',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/quick-start',
          label: 'Quick Start',
          position: 'left',
        },
        {
          to: '/docs/tracks',
          label: 'Tracks',
          position: 'left',
        },
        {
          to: '/docs/modes',
          label: 'Modes',
          position: 'left',
        },
        {
          to: '/docs/ethics',
          label: 'Ethics',
          position: 'left',
        },
        {
          href: 'https://github.com/AnkitParekh007/interview-ops',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Introduction', to: '/docs/introduction'},
            {label: 'Quick Start', to: '/docs/quick-start'},
            {label: 'CLI Commands', to: '/docs/cli-commands'},
            {label: 'Tracks', to: '/docs/tracks'},
            {label: 'Modes', to: '/docs/modes'},
            {label: 'Rubrics', to: '/docs/rubrics'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub Issues', href: 'https://github.com/AnkitParekh007/interview-ops/issues'},
            {label: 'Good First Issues', href: 'https://github.com/AnkitParekh007/interview-ops/labels/good%20first%20issue'},
            {label: 'Contributing', to: '/docs/contributing'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'GitHub', href: 'https://github.com/AnkitParekh007/interview-ops'},
            {label: 'Releases', href: 'https://github.com/AnkitParekh007/interview-ops/releases'},
            {label: 'License', href: 'https://github.com/AnkitParekh007/interview-ops/blob/main/LICENSE'},
            {label: 'Security', to: '/docs/introduction'},
            {label: 'Ethics', to: '/docs/ethics'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} InterviewOps. MIT License. Built for developers, by developers.`,
    },
    prism: {
      theme: prismThemes.oneDark,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'typescript', 'yaml', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
