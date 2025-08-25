import * as packageJson from '../../package.json';

const { description, version } = packageJson;

const APP = {
  CONFIGURATION: 'app',
  DESCRIPTION: description,
  ENDPOINT: 'swagger',
  NAME: 'FreeNotes',
  VERSION: version,
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
  AUTHENTICATE: 'Cannot authenticate',
  BAD_REQUEST: 'Missing input',
  CREATE: 'Cannot create',
  DELETE: 'Cannot delete',
  FIND: 'not found',
  REGISTER: 'Cannot register',
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
  AUTHENTICATED: 'successfully authenticated',
  BASE_URL: 'http://localhost',
  CREATE: 'Creating',
  CREATED: 'successfully created',
  DELETE: 'Deleting',
  DELETED: 'successfully deleted',
  FOUND: 'successfully found',
  READ: 'Searching',
  START: 'Server started and listening in',
  UPDATE: 'Updating',
  UPDATED: 'successfully updated',
};

const PROTOCOL = {
  HTTPS: 'https',
};

const RATE_LIMIT = {
  MAX_REQUESTS: 100,
  WINDOW: 15 * 60 * 1000,
};

const ROOT = 'OK';

const ROUTE = {
  AUTH: {
    LOGIN_LOCAL: 'login/local',
    LOGIN_JWT: 'login',
    LOGOUT: 'logout',
    REGISTER: 'register',
    SIGNIN: 'signin'
  },
  NOTES: {
    GET: '/:id',
    GET_ALL: '/:ids',
    PARAM: 'id',
    PARAM_ALL: 'ids',
  },
  TAGS: {
    GET: '/:ids',
    PARAM: 'ids',
  },
  USERS: {
    GET: '/:email',
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

const STRATEGY = {
  LOCAL: 'local',
  JWT: 'jwt',
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
  ROOT,
  ROUTE,
  SCHEMA,
  SCHEMA_OPTIONS,
  STRATEGY,
  TOKEN,
};
