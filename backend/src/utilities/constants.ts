const APP = {
  PORT: 'port',
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

export {
  APP,
  CONFIGURATION_NAME,
  ENVIRONMENTS,
  SCHEMA_OPTIONS,
  CONNECTION,
  CONTROLLER,
  ROUTE,
};
