const Wine = require("../models/Wine.js");

exports.createWine = (req, res, next) => {
  const wine = new Wine({
    ...req.body,
  });

  wine
    .save()
    .then(res.status(201).json({ message: "vin créé!" }))
    .catch((error) => res.status(400).json(error));
};

exports.modifyWine = (req, res, next) => {
  Wine.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Vin modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteWine = (req, res, next) => {
  Wine.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Vin supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneWine = (req, res, next) => {
  Wine.findOne({ _id: req.params.id })
    .then((wine) => res.status(200).json(wine))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllWines = (req, res, next) => {
  Wine.find()
    .then((wines) => res.status(200).json(wines))
    .catch(res.status(400).json(error));
};
