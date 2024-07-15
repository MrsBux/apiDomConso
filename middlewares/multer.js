const multer = require("multer");
const path = require("path");

// Configuration de Multer pour l'enregistrement des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "/home/camille_sc/Documents/projet_consonniere/projet_conso/apiDomConso/pdf"
    );
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Initialisation de l'instance Multer avec la configuration de stockage
const upload = multer({ storage: storage });

module.exports = upload;
