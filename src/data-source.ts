import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {Guildbot} from "./entity/Guildbot";
import {DcUser} from "./entity/DcUser";
import {ValidationRules} from "./entity/ValidationRules";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [Guildbot,DcUser,ValidationRules],
  migrations: [],
  subscribers: [],
});
