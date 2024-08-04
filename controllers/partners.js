const Partner = require("../models/Partner.js");

exports.createPartner = (req, res, next) => {
  const partnerData = req.body;
  // Si vous utilisez multer ou un middleware similaire pour gérer FormData
  if (req.file) {
    partnerData.image = req.file.path;
  }

  const partner = new Partner(partnerData);

  partner
    .save()
    .then(() => res.status(201).json({ message: "Partenaire créé!", partner }))
    .catch((error) => {
      console.error("Erreur lors de la sauvegarde:", error);
      res
        .status(400)
        .json({
          error:
            error.message ||
            "Une erreur est survenue lors de la création du partenaire",
        });
    });
};
exports.modifyPartner = (req, res, next) => {
  Partner.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Partenaire modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePartner = (req, res, next) => {
  Partner.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Partenaire supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePartner = (req, res, next) => {
  Partner.findOne({ _id: req.params.id })
    .then((partner) => res.status(200).json(partner))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllPartners = (req, res, next) => {
  Partner.find()
    .then((partners) => res.status(200).json(partners))
    .catch((error) => res.status(400).json({ error }));
};
