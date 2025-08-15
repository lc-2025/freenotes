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
  FIELD: {
    TYPE: {
      CHECKBOX: 'checkbox',
    },
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
};

const ROUTE = {
  AUTHENTICATION: {
    NAME: 'Notes',
    PATH: '/',
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
    SEARCH: false,
    FORM: FORM.TYPE.SIGNUP,
    SETTINGS_OPTION: false,
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
