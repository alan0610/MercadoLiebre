const path = require("path");
const multer = require("multer");

// Multer
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
       let folder = path.join(__dirname, '../public/images/avatars');
       cb(null, folder);
   },
   filename: function (req, file, cb) {
       let imageName = 'usuario' + Date.now() + path.extname(file.originalname);
       cb(null, imageName);
   }
})

const upload = multer({ storage: storage });

module.exports = upload;