const prix = require("../models/Prix.js");

exports.createPrix = (req, res, next) => {
  const prix = new Prix({
    ...req.body,
  });

  prix
    .save()
    .then(res.status(201).json({ message: "prix créé!" }))
    .catch((error) => res.status(400).json(error));
};

exports.deletePrix = (req, res, next) => {
  prix
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "prix Supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPrix = (req, res, next) => {
  prix
    .find()
    .then((salons) => res.status(200).json(salons))
    .catch(res.status(400).json(error));
};
