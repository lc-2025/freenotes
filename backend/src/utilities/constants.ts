const HEADER = {
  XFP: 'x-forwarded-proto',
};
const PROTOCOL = {
  HTTPS: 'https',
};

const APP = {
  PORT: 'port',
};

const RATE_LIMIT = {
  WINDOW: 15 * 60 * 1000,
  MAX_REQUESTS: 100,
};

const CONFIGURATION_NAME = {
  APP: 'app',
  DATABASE: 'database',
};

const ENVIRONMENTS = ['development', 'production'];

const SCHEMA_OPTIONS = {
  required: true,
};

const CONNECTION = {
  CONNECTED: 'DB connected',
  OPEN: 'DB connection open',
  DISCONNECTED: 'DB connection disconnected',
  RECONNECTED: 'DB reconnected',
  DISCONNECTION: 'DB is disconnecting...',
};

const CONTROLLER = {
  USERS: 'users',
  NOTES: 'notes',
  TAGS: 'tags',
};

const ROUTE = {
  USERS: {
    GET: 'user/:email',
    PARAM: 'email',
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
};

const ERROR = {
  CREATE: 'Cannot create',
  FIND: 'not found',
  BAD_REQUEST: 'Missing input',
};

export {
  HEADER,
  PROTOCOL,
  APP,
  RATE_LIMIT,
  CONFIGURATION_NAME,
  ENVIRONMENTS,
  SCHEMA_OPTIONS,
  CONNECTION,
  CONTROLLER,
  ROUTE,
  ERROR,
};
