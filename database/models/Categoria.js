module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoria';
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        titulo: {
            type: dataTypes.STRING(255),
        }
    }
    let config ={
        tableName: 'categorias',
        timestamps: false,
        //underscored: true
    }
    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function (models) {
        Categoria.hasMany(models.Producto,{
            as: 'productos',
            foreingKey: "categoria_id",
        })
    }
    return Categoria;

}
