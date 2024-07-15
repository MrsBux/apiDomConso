const Salon = require("../models/Salon.js");

exports.createSalon = (req, res, next) => {
  // Vérifier si un fichier a été téléchargé
  if (!req.file) {
    console.log("Aucun fichier n'a été téléchargé");
  }

  // Créer un nouvel objet Salon avec les données du formulaire
  const salon = new Salon({
    name: req.body.name,
    description: req.body.description,
    debut: req.body.debut,
    fin: req.body.fin,
    region: req.body.region,
    localisation: req.body.localisation,
    invitation: req.file ? req.file.filename : null, // Utilisation du nom de fichier uniquement
  });

  // Sauvegarder le salon dans la base de données MongoDB
  salon
    .save()
    .then((savedSalon) => {
      res.status(201).json({ message: "Salon créé!", salon: savedSalon });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "Erreur lors de la création du salon", error });
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
