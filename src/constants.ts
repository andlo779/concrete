/* CONFIG PROPERTIES */
export const APP_PORT = 'APP_PORT';
export const AUTH_JWT_AUTH_SECRET_KEY = 'AUTH_JWT_AUTH_SECRET_KEY';
export const AUTH_JWT_REFRESH_SECRET_KEY = 'AUTH_JWT_REFRESH_SECRET_KEY';
export const AUTH_JWT_AUTH_EXP_TIME = 'AUTH_JWT_AUTH_EXP_TIME';
export const AUTH_JWT_REFRESH_EXP_TIME = 'AUTH_JWT_REFRESH_EXP_TIME';
export const AUTH_SESSION_EXP_TIME = 'AUTH_SESSION_EXP_TIME';
export const AUTH_ISSUER = 'AUTH_ISSUER';
export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
export const DATABASE_NAME = 'DATABASE_NAME';

/* PROVIDERS */
export const MONGO_CLIENT = 'MongoClient';
export const MONGO_PING_CLIENT = 'MongoPingClient';

/* MONGODB CONSTANTS */
export const MONGO_COLLECTION_USERS = 'users';
export const MONGO_COLLECTION_RECORDS_COLLECTION = 'recordsCollections';
export const MONGO_COLLECTION_AUTH_SESSION = 'authSessions';
export const MONGO_COLLECTION_AUTH_REFRESH_TOKEN = 'refreshTokens';

/* ERROR MESSAGES */
export const ERROR_MSG_INTERNAL_SERVER_ERROR = 'Internal server error';

/* OTHERS */
export const APP_VERSION = process.env.npm_package_version;
