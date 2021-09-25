import databaseConfig from './database.json';
import {Dialect} from "sequelize";
import sessionConfig from './session.json';
import redisConfig from './redis.json';
import passwordConfig from './passwords.json';

type DatabaseConfig = {
    "username": string,
    "password": string,
    "database": string,
    "host": string,
    "dialect": Dialect
}
export const database: DatabaseConfig = databaseConfig as unknown as DatabaseConfig;

type SessionConfig = {
    sessionSecrets: string[]
}
export const session: SessionConfig = sessionConfig;

type RedisConfig = {
    host: string,
    port: number,
    password?: string,
    db?: string | number
}
export const redis: RedisConfig = redisConfig;

type PasswordConfig = {
    saltRounds: number
}
export const passwords: PasswordConfig = passwordConfig as PasswordConfig;