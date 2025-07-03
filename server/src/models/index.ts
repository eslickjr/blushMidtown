import sequelize from '../config/connection.js';
import { ClientFactory } from './clientModel.js';

const User = ClientFactory(sequelize);

export { sequelize, User };