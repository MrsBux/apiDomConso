const Actu = require("../models/Actu.js");

exports.createActu = (req, res, next) => {
  const actu = new Actu({
    ...req.body,
  });

  actu
    .save()
    .then(res.status(201).json({ message: "actualité créée!" }))
    .catch((error) => res.status(400).json(error));
};

exports.deleteActu = (req, res, next) => {
  Actu.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Actu Supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllActu = (req, res, next) => {
  Actu.find()
    .then((salons) => res.status(200).json(salons))
    .catch(res.status(400).json(error));
};
