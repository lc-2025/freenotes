const APP = {
  NAME: 'FreeNotes',
  PORT: 'port',
};

const CONFIGURATION_NAME = {
  APP: 'app',
  CACHE: 'cache',
  DATABASE: 'database',
  THROTTLE: 'throttle',
};

const CONNECTION = {
  CONNECTED: 'DB connected',
  DISCONNECTED: 'DB connection disconnected',
  DISCONNECTION: 'DB is disconnecting...',
  OPEN: 'DB connection open',
  RECONNECTED: 'DB reconnected',
};

const CONTROLLER = {
  AUTH: 'auth',
  NOTES: 'notes',
  TAGS: 'tags',
  USERS: 'users',
};
const ENVIRONMENTS = ['development', 'production'];

const ERROR = {
  BAD_REQUEST: 'Missing input',
  CREATE: 'Cannot create',
  DELETE: 'Cannot delete',
  FIND: 'not found',
  UNAUTHORIZED: 'Permission denied',
  UPDATE: 'Cannot update',
  VALIDATION: 'Validation failed',
};

const HEADER = {
  XFP: 'x-forwarded-proto',
};

const JWT = {
  EXPIRATION: '60s',
};

const MESSAGE = {
  AUTH: 'Generating user access token',
  CREATE: 'Creating',
  DELETE: 'Deleting',
  READ: 'Searching',
  UPDATE: 'Updating',
};

const PROTOCOL = {
  HTTPS: 'https',
};

const RATE_LIMIT = {
  MAX_REQUESTS: 100,
  WINDOW: 15 * 60 * 1000,
};

const ROUTE = {
  AUTH: {
    GET: 'login',
    POST: 'login',
  },
  NOTES: {
    GET: 'note/:id',
    GET_ALL: 'note/:ids',
    PARAM: 'id',
    PARAM_ALL: 'ids',
  },
  TAGS: {
    GET: 'tag/:ids',
    PARAM: 'ids',
  },
  USERS: {
    GET: 'user/:email',
    PARAM: 'email',
  },
};

const SCHEMA = {
  NOTE: 'Note',
  TAG: 'Tag',
  USER: 'User',
};

const SCHEMA_OPTIONS = {
  required: true,
};

const TOKEN = 'Bearer';

export {
  APP,
  CONNECTION,
  CONFIGURATION_NAME,
  CONTROLLER,
  ENVIRONMENTS,
  ERROR,
  HEADER,
  JWT,
  MESSAGE,
  PROTOCOL,
  RATE_LIMIT,
  ROUTE,
  SCHEMA,
  SCHEMA_OPTIONS,
  TOKEN,
};
