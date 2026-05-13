import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['introduction', 'quick-start', 'installation', 'configuration'],
    },
    {
      type: 'category',
      label: 'CLI Reference',
      items: ['cli-commands', 'providers'],
    },
    {
      type: 'category',
      label: 'Interview Practice',
      items: ['tracks', 'modes', 'rubrics', 'answer-workflow'],
    },
    {
      type: 'category',
      label: 'Outputs & Examples',
      items: ['output-structure', 'examples'],
    },
    {
      type: 'category',
      label: 'Project',
      items: ['ethics', 'contributing', 'roadmap'],
    },
  ],
};

export default sidebars;
