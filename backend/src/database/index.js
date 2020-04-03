import Sequelize from 'sequelize';

import User from '../app/models/User';
import Linha from '../app/models/Linha';

import dataBaseConfig from '../config/database';

const models = [User, Linha];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(dataBaseConfig);

        models.map(model => model.init(this.connection));
    }
}

export default new Database();
