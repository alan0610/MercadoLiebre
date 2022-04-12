const fs = require("fs");
const path = require("path");
const db = require("../database/models")

const controller = {
    home: function(req, res) {
        db.Producto.findAll()
            .then (function(productos){
                return res.render ("home", { productos })
            })
}
}

module.exports = controller