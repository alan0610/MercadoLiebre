
module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        precio: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        categoria_id: {
            type: dataTypes.INTEGER
        },
        color: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        marca: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        descripcion: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        precio: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        imagen:{
            type: dataTypes.STRING(100)
        }
    }

    let config = {
        tableName: "productos",
        timestamps: false,
        //underscored: true
    }
    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function (models) {
        Producto.belongsTo(models.Categoria, {
            as: 'categorias',
            foreignKey: "categoria_id",
        })
        
    };
    return Producto;

}
