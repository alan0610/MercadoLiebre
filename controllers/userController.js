const path = require('path');
const express = require('express'); 
const app = express();
const db = require('../database/models/');
const bcryptjs = require("bcrypt")
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;
const { Op } = require('sequelize');

const controller = {
    
    users: (req, res) =>{
        res.render("users", {users})
    },

    detail: (req, res) => {
        let user = users.find(user=>user.id==req.params.id)
        res.render ("users", { user,toThousand })
    },

    registro: function(req, res) {
        return res.render("registro")
    },

    create: function(req, res) {
        const resultValidation = validationResult(req);
        console.log(resultValidation)
        if (resultValidation.errors.length > 0) {
            return res.render('registro', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        } else {
            db.Usuario.create({
                nombre_apellido: req.body.nombre_apellido,
                email: req.body.email,
                contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
                nombre_usuario: req.body.nombre_usuario,
                image: req.body.filename,
            })
            .then(() => {
                return res.redirect('/login');
            })
            .catch((error) => res.send(error));
        }
        let image
        if(req.file != undefined){
            image = req.file.filename
        } else {
            image = 'default-image.png'
        }
    },

    login: function(req, res) {
        return res.render("login")
    },

    loginProcess: (req, res) => {

        let resultValidation = validationResult(req);	
        db.Usuario.findOne({
            where: {
                email: req.body.email
            }
    })
        .then((userToLogin) => {

            if (userToLogin) {
                let isOkThePassword = bcryptjs.compareSync(req.body.contraseña, userToLogin.contraseña);
                if (isOkThePassword) {
                    req.session.userLogged = userToLogin;
                    return res.redirect('/');
                }
                    return res.render('login', {
                        errors: {
                            email: {
                                msg: 'Credenciales invalidas.'
                            }
                        }
                    })
                }

                return res.render('login', {
                    errors: {
                        email: {
                             msg: 'No se encuentra el mail en la base de datos'
                            }
                    }
                }); 

            })
        .catch((error) => {
            console.log(error);
        })
    },
   //return res.send(req.body);

   profile: (req, res) => {
       //return res.send("hola" + req.session.user)
       return res.render('/users/profile', {
           users: req.session.user
       });
   },

}

module.exports = controller