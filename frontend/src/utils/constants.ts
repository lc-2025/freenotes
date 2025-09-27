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
    AUTO_SAVE: 'Autosave',
  },
};

const ARIA = {
  BACK: 'Go back',
  PIN: 'Pin note',
  NEW: `Create ${ACTION.NEW.toLowerCase()} note`,
  EDIT: `${ACTION.EDIT} note`,
  DELETE: `${ACTION.DELETE} note`,
  SETTINGS: 'Open settings',
  ACCOUNT: 'Account',
};

const REGEX = {
  NAME: /^[a-zA-Z]+$/i,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
};

const FORM = {
  AUTOCOMPLETE: {
    PASSWORD: 'current-password',
    PASSWORD_NEW: 'new-password',
  },
  PLACEHOLDER: {
    SEARCH: 'Search notes',
  },
  TYPE: {
    LOGIN: 'login',
    SIGNUP: 'signup',
  },
  FIELD_TYPE: {
    CHECKBOX: 'checkbox',
  },
  FIELD: {
    NAME: {
      id: 'name',
      label: 'Name',
      required: true,
      type: 'text',
      validation: {
        maxLength: {
          value: 20,
          message: 'Cannot exceed 20 chars',
        },
        pattern: {
          value: REGEX.NAME,
          message: 'Invalid name',
        },
      },
    },
    EMAIL: {
      id: 'email',
      label: 'Email',
      required: true,
      type: 'email',
      validation: {
        pattern: {
          value: REGEX.EMAIL,
          message: 'Invalid email address',
        },
      },
    },
    PASSWORD: {
      id: 'password',
      label: 'Password',
      required: true,
      type: 'password',
      validation: {
        minLength: {
          value: 8,
          message: 'Cannot be less than 8 digits',
        },
        pattern: {
          value: REGEX.PASSWORD,
          message:
            'Must contain at least 1 uppercase letter, 1 number, 1 special char',
        },
      },
    },
    PASSWORD_CONFIRM: {
      id: 'password-confirm',
      label: 'Confirm Password',
      required: true,
      type: 'password',
      validation: {
        minLength: {
          value: 8,
          message: 'Cannot be less than 8 digits',
        },
        pattern: {
          value: REGEX.PASSWORD,
          message: 'Entered passwords must match',
        },
      },
    },
    ACCEPTANCE: {
      id: 'acceptance',
      label: 'Accept',
      required: true,
      type: 'checkbox',
    },
  },
  MESSAGE: {
    LOADING: 'Sending...',
    SUBMIT: 'Authentication succeeded',
  },
};

const ROUTE = {
  API: {
    LOGIN: 'authentication/login',
    NOTES: 'notes',
    REGISTER: 'authentication/register',
    USER: 'user',
    REFRESH: 'refresh',
  },
  AUTHENTICATION: {
    NAME: 'FreeNotes',
    PATH: '/',
  },
  NOTES: {
    NAME: 'Notes',
    PATH: '/notes',
  },
  NOTE: {
    NAME: 'Note',
    PATH: '/note',
  },
  NEW: {
    NAME: 'New Note',
    PATH: '/new',
  },
  SETTINGS: {
    NAME: 'Settings',
    PATH: '/settings',
  },
};

const METHOD = {
  DELETE: 'DELETE',
  GET: 'GET',
  PATCH: 'PATCH',
  POST: 'POST',
};

const HEADER = {
  CONTENT: {
    'Content-Type': 'application/json',
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
    SEARCH: false,
    FORM: FORM.TYPE.SIGNUP,
    SETTINGS_OPTION: false,
    AUTHENTICATION: {
      authenticated: false,
    },
    USER: {
      email: '',
      name: '',
      notes: [],
    },
    ERROR: {
      title: '',
      message: '',
    },
  },
};

const STATE_ACTION = {
  AUTHENTICATION: 'authentication',
  USER: 'user',
  RESET: 'reset',
};

const ERROR = {
  AUTHENTICATION: 'Authentication error',
  CONTEXT: 'Context must be used within a `Provider`',
  NOSCRIPT: 'You need to enable JavaScript to run this website.',
};

const CACHE = 60 * 1000;

const TIMEOUT = 60 * 1000;

const STORAGE = {
  TOKEN: {
    ACCESS: 'access_token',
    REFRESH: 'refresh_token',
  },
  EMAIL: 'email',
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
  METHOD,
  HEADER,
  STATE,
  STATE_ACTION,
  ERROR,
  CACHE,
  TIMEOUT,
  STORAGE,
};
