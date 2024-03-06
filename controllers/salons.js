const Salon = require("../models/Salon.js");

exports.createSalon = (req, res, next) => {
  const salon = new Salon({
    ...req.body,
  });

  salon
    .save()
    .then(res.status(201).json({ message: "salon créé!" }))
    .catch((error) => res.status(400).json(error));
};

exports.modifySalon = (req, res, next) => {
  Salon.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Salon modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSalon = (req, res, next) => {
  Salon.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Salon supprimé !" }))
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
    .catch(res.status(400).json(error));
};
