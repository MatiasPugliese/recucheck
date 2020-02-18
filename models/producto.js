const S = require('sequelize');
const db = require('./database')
const Category = require('./categoria')

class Productos extends S.Model {}

Productos.init({
	nombre:{
		type: S.STRING
	},
	precio:{
		type: S.INTEGER
	},
	descripcion:{
		type: S.TEXT
	},
	disponible:{
		type: S.BOOLEAN,
		default: true
	},
	truncarDescripcion:{
		type: S.VIRTUAL, //preguntar que type es? puse virtual por descarte
		get(){
			return this.content ? `${this.content.slice(0, 23) }...`: '';
		}
	},
	
}, { sequelize: db, modelName: 'Productos' });

Productos.addHook('beforeCreate', function (productos) {
	if(productos.disponible===false) return `${productos.nombre} NO DISPONIBLE`
  });

Productos.belongsTo(Category, {as: "Categoria"})


// Promise.all(Productos.create,Category.find)
// .then((arregloPromesas=>arregloPromesas0.setCategory(arregloPromesas1)))
  
module.exports = Productos;