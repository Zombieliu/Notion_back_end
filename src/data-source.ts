import 'reflect-metadata';
import { DataSource } from 'typeorm';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'containers-us-west-105.railway.app',
  port: 7783,
  username: 'postgres',
  password: 'YWO07z6rqDJTsoVIwDJ8',
  database: 'railway',
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});
