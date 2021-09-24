const sqlite3 = require('sqlite3').verbose();
const { ConsoleLogger } = require('../helpers/loggers');

const DB_FILENAME = 'mock_server/mock-database.db';
const DB_MODE = sqlite3.OPEN_READWRITE;

let dbInstance;

const hasConnection = () => {
  return Boolean(dbInstance);
};

const openDbConnection = async () => new Promise((resolve, reject) => {
  let instance = new sqlite3.Database(DB_FILENAME, DB_MODE, (err) => {
    if (err) {
      ConsoleLogger.error('DATABASE CONNECT ERROR', err);
      reject(err);
    } else {
      dbInstance = instance;
      ConsoleLogger.info('DATABASE CONNECT SUCCESS');
      resolve();
    }
  });
});

const closeDbConnection = async () => new Promise((resolve, reject) => {
  if (this.db.hasConnection()) {
    dbInstance.close((err) => {
      if (err) {
        ConsoleLogger.error('DATABASE CONNECTION CLOSE ERROR', err);
        reject(err);
      } else {
        dbInstance = undefined;
        ConsoleLogger.info('DATABASE CONNECTION CLOSE SUCCESS');
        resolve();
      }
    });
  }
});

const queryInterceptor = async (query) => {
  if (!hasConnection()) {
    await openDbConnection();
  }
  return await query();
};

exports.db = {

  hasConnection: () => hasConnection(),

  getOne: async (query, params) => await queryInterceptor(
    () => new Promise((resolve, reject) => {
      dbInstance.get(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    })
  ),

  getAll: async (query, params) => await queryInterceptor(
    () => new Promise((resolve, reject) => {
      dbInstance.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    })
  )
};

process.on('SIGINT', async () => {
  await closeDbConnection();
});

