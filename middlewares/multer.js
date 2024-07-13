const multer = require("multer");

// Configuration de Multer pour les fichiers PDF
const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/pdf"); // Dossier de destination pour les PDF
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nom de fichier unique
  },
});

const pdfUpload = multer({ storage: pdfStorage }).single("invitation");

// Configuration de Multer pour les fichiers d'image
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/images"); // Dossier de destination pour les images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nom de fichier unique
  },
});

const imageUpload = multer({ storage: imageStorage }).single("logoUrl");

module.exports = { pdfUpload, imageUpload };
