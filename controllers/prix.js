const Prix = require("../models/Prix.js"); // Ensure correct casing for model import

exports.createPrix = (req, res, next) => {
  const prix = new Prix({
    ...req.body,
  });

  prix
    .save()
    .then(() => res.status(201).json({ message: "prix créé!", prix }))
    .catch((error) => res.status(400).json(error));
};

exports.deletePrix = (req, res, next) => {
  Prix.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "prix Supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPrix = (req, res, next) => {
  Prix.find()
    .then((prix) => res.status(200).json(prix))
    .catch((error) => res.status(400).json({ error }));
};
