const sqlite3 = require('sqlite3').verbose();
const { QueryLogger, ConsoleLogger } = require('../helpers/loggers');

const DB_FILENAME = 'mock-database.db';
const DB_MODE = sqlite3.OPEN_READWRITE;

let dbInstance;

const hasConnection = () => {
  return Boolean(dbInstance);
};

const openDbConnection = async () => new Promise((resolve, reject) => {
  let instance = new sqlite3.Database(DB_FILENAME, DB_MODE, (err) => {
    if (err) {
      ConsoleLogger.error('Database connect error', err);
      reject(err);
    } else {
      dbInstance = instance;
      ConsoleLogger.info('Database connect success');
      resolve();
    }
  });
});

const closeDbConnection = async () => new Promise((resolve, reject) => {
  if (this.db.hasConnection()) {
    dbInstance.close((err) => {
      if (err) {
        ConsoleLogger.error('Database connection close error', err);
        reject(err);
      } else {
        dbInstance = undefined;
        ConsoleLogger.info('Database connection close success');
        resolve();
      }
    });
  }
});

const queryInterceptor = async (action, query, params) => {
  if (!hasConnection()) {
    await openDbConnection();
  }
  const startTime = new Date();
  const results = await new Promise((resolve, reject) => {
    action((err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  const endTime = new Date();
  QueryLogger.logQuery(query, params, results, startTime, endTime);
  return results;
};

exports.db = {

  hasConnection: () => hasConnection(),

  getOne: async (query, params) => await queryInterceptor(
    (callback) => {
      dbInstance.get(query, params, callback);
    },
    query, params
  ),

  getAll: async (query, params) => await queryInterceptor(
    (callback) => {
      dbInstance.all(query, params, callback);
    },
    query, params
  )
};

process.on('SIGINT', async () => {
  await closeDbConnection();
});

