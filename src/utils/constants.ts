const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

const ACTION = {
  NEW: 'New',
  EDIT: 'Edit',
  DELETE: 'Delete',
};

const NOTE = {
  LABEL: {
    TITLE: 'Note Title',
    CONTENT: 'Note Content',
  },
};

const SECTION = {
  SEARCH: 'Search',
  NEW: ACTION.NEW,
  DETAILS: 'Note',
  SETTINGS: 'Settings',
};

const SETTING = {
  LABEL: {
    NOTIFICATIONS: 'Notifications',
  },
};

const ARIA = {
  BACK: 'Go back',
  PIN: 'Pin note',
  NEW: `Create ${ACTION.NEW.toLowerCase()} note`,
  EDIT: `${ACTION.EDIT} note`,
  DELETE: `${ACTION.DELETE} note`,
  SETTINGS: 'Open settings',
};

const FORM = {
  PLACEHOLDER: {
    SEARCH: 'Search notes',
  },
};

const ROUTE = {
  AUTHENTICATION: {
    NAME: 'Authentication',
    PATH: '/'
  },
  HOME: {
    NAME: 'Notes',
    PATH: '/home',
  },
  DETAILS: {
    NAME: '',
    PATH: '/details',
  },
  NEW: {
    NAME: 'New Note',
    PATH: `/${ACTION.NEW.toLowerCase()}`,
  },
  SETTINGS: {
    NAME: 'Settings',
    PATH: '/settings',
  },
};

const STATE = {
  DEFAULT: {
    HEADER: {
      title: '',
      showBack: false,
      showPin: false,
      showToggle: false,
      showSettings: false,
    },
  },
};

const ERROR = {
  NOSCRIPT: 'You need to enable JavaScript to run this website.',
};

export {
  THEME,
  NOTE,
  SECTION,
  SETTING,
  ARIA,
  FORM,
  ACTION,
  ROUTE,
  STATE,
  ERROR,
};
