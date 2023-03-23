import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {Guildbot} from "./entity/Guildbot";
import {DcUser} from "./entity/DcUser";
import {ValidationRules} from "./entity/ValidationRules";
import {ValidationRulesUser} from "./entity/ValidationRulesUser";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'containers-us-west-105.railway.app',
  port: 7783,
  username: 'postgres',
  password: 'YWO07z6rqDJTsoVIwDJ8',
  database: 'railway',
  synchronize: true,
  logging: false,
  entities: [Guildbot,DcUser,ValidationRules,ValidationRulesUser],
  migrations: [],
  subscribers: [],
});
