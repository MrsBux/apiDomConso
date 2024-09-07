const multer = require("multer");
const path = require("path");

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "pdf")); // Utilisation d'un chemin relatif
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Filtre de fichier pour s'assurer que seuls les fichiers PDF sont téléchargés
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers PDF sont autorisés !"), false);
  }
};

// Initialisation de l'instance Multer avec la configuration de stockage et le filtre de fichier
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite la taille du fichier à 5MB
});

module.exports = upload;
