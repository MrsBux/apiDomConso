const Prestation = require("../models/Prestation.js");

exports.createPrestation = (req, res, next) => {
  const prestation = new Prestation({
    ...req.body,
  });

  prestation
    .save()
    .then(res.status(201).json({ message: "Prestation crée!" }))
    .catch((error) => res.status(400).json(error));
};

exports.modifyPrestation = (req, res, next) => {
  Prestation.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Prestation modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePrestation = (req, res, next) => {
  Prestation.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Prestation supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePrestation = (req, res, next) => {
  Prestation.findOne({ _id: req.params.id })
    .then((prestation) => res.status(200).json(prestation))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllPrestations = (req, res, next) => {
  Prestation.find()
    .then((prestations) => res.status(200).json(prestations))
    .catch(res.status(400).json(error));
};
