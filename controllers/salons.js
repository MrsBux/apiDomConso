const Salon = require("../models/Salon.js");
const { pdfUpload, imageUpload } = require("../middlewares/multer.js");

exports.createSalon = (req, res, next) => {
  // Utilisation de Multer pour gérer les fichiers
  pdfUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Erreur lors du téléchargement du fichier PDF",
        error: err,
      });
    }

    imageUpload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: "Erreur lors du téléchargement du fichier image",
          error: err,
        });
      }

      // Création du nouveau salon avec les données du corps de la requête
      const salon = new Salon({
        ...req.body,
        logoUrl: req.file ? "/uploads/images/" + req.file.filename : "",
        invitation: req.file ? "/uploads/pdf/" + req.file.filename : "",
      });

      // Sauvegarde du salon dans la base de données
      salon
        .save()
        .then(() => res.status(201).json({ message: "Salon créé!", salon }))
        .catch((error) =>
          res
            .status(400)
            .json({ message: "Erreur lors de la création du salon", error })
        );
    });
  });
};

exports.modifySalon = (req, res, next) => {
  Salon.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Salon modifié!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSalon = (req, res, next) => {
  Salon.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Salon supprimé!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSalon = (req, res, next) => {
  Salon.findOne({ _id: req.params.id })
    .then((salon) => res.status(200).json(salon))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSalons = (req, res, next) => {
  Salon.find()
    .then((salons) => res.status(200).json(salons))
    .catch((error) => res.status(400).json({ error }));
};
