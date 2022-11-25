import mysql from 'mysql2';
import { Sequelize } from 'sequelize-typescript';
import { Config } from '../config/config';
import { initDb, initSequelize } from './db';

export type AppDependencies = {
  db: mysql.Connection;
  sequelize: Sequelize;
  config: Config;
};

async function createDependencyContainer(config: Config): Promise<AppDependencies> {
  let db: ReturnType<typeof initDb>;
  let sequelize: Sequelize;

  const module = {
    get db() {
      if (!db) {
        db = initDb(config);
      }
      return db;
    },
    get sequelize() {
      if (!sequelize) {
        sequelize = initSequelize(config);
      }
      return sequelize;
    },
    config
  };
  return module;
}

export default createDependencyContainer;
