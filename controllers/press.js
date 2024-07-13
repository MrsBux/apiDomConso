const Press = require("../models/Press.js");

exports.createPress = (req, res, next) => {
  const press = new Press({
    ...req.body,
  });

  press
    .save()
    .then(res.status(201).json({ message: "press créée!", press }))
    .catch((error) => res.status(400).json(error));
};

exports.deletePress = (req, res, next) => {
  Press.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Press Supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPress = (req, res, next) => {
  Press.find()
    .then((presss) => res.status(200).json(presss))
    .catch((error) => res.status(400).json({ error }));
};
