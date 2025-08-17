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
  TAGS: 'tags',
};

const ROUTE = {
  USERS: {
    GET: 'user/:email',
    PARAM: 'email',
  },
  TAGS: {
    GET: 'tag/:id',
    PARAM: 'id',
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
