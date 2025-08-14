const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

const ACTION = {
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
  NEW: 'New',
  SETTINGS: 'Settings',
};

const SETTING = {
  LABEL: {
    THEME: 'Theme',
    NOTIFICATIONS: 'Notifications',
  },
};

const ARIA = {
  BACK: 'Go back',
  PIN: 'Pin note',
  EDIT: `${ACTION.EDIT} note`,
  DELETE: `${ACTION.DELETE} note`,
};

const FORM = {
  PLACEHOLDER: {
    SEARCH: ' Search notes',
  },
};

const ERROR = {
  NOSCRIPT: 'You need to enable JavaScript to run this website.',
};

export { THEME, NOTE, SECTION, SETTING, ARIA, FORM, ACTION, ERROR };
