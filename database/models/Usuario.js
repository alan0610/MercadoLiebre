module.exports = (sequelize, dataTypes) => {
    let alias = "Usuarios";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_apellido: {
            type: dataTypes.STRING(255),
            allowNull: false,

        },
        nombre_usuario: {
            allowNull: false,
            type: dataTypes.STRING(255),
        },
        email: {
            allowNull: false,
            type: dataTypes.STRING(100),
        },
        contraseña: {
            allowNull: false,
            type: dataTypes.STRING(100)
        },
        image: {
            allowNull: false,
            type: dataTypes.STRING(100)
        }
    }
    let config = {
        tableName: "usuarios",
        timestamps: false
    }

    const Usuario = sequelize.define(alias, cols, config);

    return Usuario;
}