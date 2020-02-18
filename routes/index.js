const express = require('express');
const route = express.Router();
const Product = require('../models/producto')
const Categoria = require('../models/categoria');


route.get('/', function (req, res, next) {
    res.send('Probando 1 2 3');
  });

  router.get("/", (req, res, next) => {
    if (req.query.categoria) {
        Categoria.findOne({
            where: {nombre: req.query.categoria}
        })
            .then((data) => {
                Productos.findAll({
                    where: {CategoriaId: data.dataValues.id}
                })
                    .then((data) => {
                    res.json(data)
                    })
            })
        }else {
            Productos.findAll()
                .then((data) => {
                res.json(data)
            })
                .catch(err => {
                res.sendStatus(500)
            })
    }
})

route.get('/products/:id', function(req, res, next){
    
    Product.findByPk(parseInt(req.params.id))
        .then(producto => res.json(producto))
        
})

route.post('/products', function (req, res, next){
    Product.create(req.body)
        .then(articulo =>{
            res.status(201).json(articulo)
        })
        .catch(next)
})

route.put('/products/:id',function(req, res, next){
    Product.update(req.body, {
        where: {id: req.params.id}
    })
        .then(result =>{
            res.status(201).json(result)
        })
        .catch(next)
})

route.delete('/products/:id', function (req, res, next){
    Product.destroy({ where: { id: req.params.id } })
     .then(result =>{ 
        res.status(202).json(result);
        })
        .catch(next)
   });

module.exports = route;