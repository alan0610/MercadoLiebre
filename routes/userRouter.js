const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const path = require("path");
const multer = require("multer")

const uploadFile = require('../middlewares/multerMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const registerValidations = require('../middlewares/validateRegisterMiddleware');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = path.join(__dirname, '../public/images/avatars');
        cb(null, folder);
    },
    filename: function(req, file, cb) {
        let imageName = 'usuario' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if ((file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")) {
            console.log(file);
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Imagenes en formato .png / .jpg / .jpeg'));
        }
    }
});

router.get("/registro", guestMiddleware ,userController.registro)
router.post('/registro', registerValidations, upload.single('image'), userController.create);

router.get('/login', guestMiddleware, userController.login);
router.post('/login', userController.loginProcess)

router.get('/profile', userController.profile);

module.exports = router;