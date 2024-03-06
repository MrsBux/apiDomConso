const Partner = require("../models/Partner.js");

exports.createPartner = (req, res, next) => {
  const partner = new Partner({
    ...req.body,
  });

  partner
    .save()
    .then(res.status(201).json({ message: "partenaire créé!" }))
    .catch((error) => res.status(400).json(error));
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
    .catch(res.status(400).json(error));
};
