import mysql from 'mysql2';
import { Sequelize } from 'sequelize-typescript';
import { Config } from '../config/config';
import { City } from '../models/city.model';
import { User, UserCity } from '../models/user.model';

export function initDb(config: Config) {
  return mysql.createConnection(config.MYSQL);
}

export function initSequelize(config: Config) {
  return new Sequelize({
    dialect: 'mysql',
    host: config.MYSQL.host,
    username: config.MYSQL.user,
    password: config.MYSQL.password,
    database: config.MYSQL.database,
    logging: false,
    models: [User, City, UserCity]
  });
}
