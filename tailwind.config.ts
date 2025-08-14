import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'light-bg': '#FFF',
        'light-border': '#E5E7EB',
        'light-text': '#1A1A1A',
        'light-subtext': '#4B5563',
        'light-placeholder': '#AAA',
        'dark-bg': '#1F2937',
        'dark-border': '#374151',
        'dark-text': '#F3F4F6',
        'dark-subtext': '#D1D5DB',
        'dark-placeholder': '#9CA3AF',
      },
      height: {
        'header-mobile': '4rem',
        'header-desktop': '5rem',
        'search-mobile': '2.5rem',
        'search-desktop': '3rem',
        'card-mobile': '5rem',
        'card-desktop': '7.5rem',
        'field-title-mobile': '2.5rem',
        'field-title-desktop': '3rem',
        'field-content-mobile': '18.75rem',
        'field-content-desktop': '30rem',
        'button-mobile': '3rem',
        'button-desktop': '4rem',
        'toggle-mobile': '1.5rem',
        'toggle-desktop': '2rem',
      },
      width: {
        'toggle-mobile': '3rem',
        'toggle-desktop': '4rem',
        'tag-mobile': '5rem',
        'tag-desktop': '6.25rem',
      },
    },
  },
  darkMode: 'class',
};

export default config;
