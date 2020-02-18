const S = require('sequelize');
const db = require('./database');

class Categoria extends S.Model {}
Categoria.init({
    nombre:{
        type: S.STRING
    }
}, { sequelize: db, modelName: 'Categoria' });

module.exports = Categoria