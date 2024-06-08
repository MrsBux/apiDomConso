const Actu = require("../models/Actu.js");

exports.createActu = (req, res, next) => {
  const actu = new Actu({
    ...req.body,
  });

  actu
    .save()
    .then(res.status(201).json({ message: "actualité créée!", actu }))
    .catch((error) => res.status(400).json(error));
};

exports.deleteActu = (req, res, next) => {
  Actu.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Actu Supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllActu = (req, res, next) => {
  Actu.find()
    .then((actus) => res.status(200).json(actus))
    .catch((error) => res.status(400).json({ error }));
};
