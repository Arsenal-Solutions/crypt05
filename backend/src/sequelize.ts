import {Sequelize} from 'sequelize-typescript';
import {database as databaseConfig} from '../config/index';
import User from "./models/User";

const sequelize =  new Sequelize({
    ...databaseConfig
});


export default () => {
    sequelize.addModels([User]);
    return sequelize;
};