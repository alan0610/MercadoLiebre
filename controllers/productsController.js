const fs = require("fs");
const path = require("path");
const db = require("../database/models")

const controller = {
    products: (req, res) => {
            db.Producto.findAll()
                .then (function(productos){
                    return res.render ("productos", { productos })
                })
    },

    detail: (req, res) => {
        db.Producto.findByPk(req.params.id, {
            include: {association: "categorias"}
        })
            .then(function(producto){
                res.render("detailProducto", {producto:producto})
            })
    },

    create: (req, res) => {
        db.Categoria.findAll()
		.then(function(categorias){
            return res.render("create", { categorias })
        })
	},
    
    store: (req, res) => {
        db.Producto.create({
            titulo: req.body.titulo,
            precio: req.body.precio,
            categoria_id: req.body.categoria,
            color: req.body.color,
            marca: req.body.marca,
            descripcion: req.body.descripcion,
            //imagen: req.file.filename
        })
        .then(res.redirect("/"))
    },

    edit: (req, res) => {
        let pedidoProducto = db.Producto.findByPk(req.params.id)
        let pedidoCategorias = db.Categoria.findAll()

        Promise.all([pedidoProducto, pedidoCategorias])
            .then(function([producto, categorias]){
                res.render("edit", { producto, categorias })
            })
    },

    update: (req, res)=>{
        db.Producto.update({
            titulo: req.body.titulo,
            precio: req.body.precio,
            categoria_id: req.body.categoria,
            color: req.body.color,
            precio: req.body.precio,
            marca: req.body.marca,
            descripcion: req.body.descripcion,
            usuario_id: req.body.usuario_id,
            imagen: req.file.filename
        },{
            where: {
                id: req.params.id
            }
        });
        res.redirect("/products/" + req.params.id);
	},
    destroy: (req, res)=>{
        db.Producto.destroy({
            where:{
                id: req.params.id
            }
        })
        res.redirect("/products")
    }
}


module.exports = controller
