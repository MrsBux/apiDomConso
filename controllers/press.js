const press = require("../models/Press.js");

exports.createPress = (req, res, next) => {
  const press = new Press({
    ...req.body,
  });

  press
    .save()
    .then(res.status(201).json({ message: "pressalité créée!" }))
    .catch((error) => res.status(400).json(error));
};

exports.deletePress = (req, res, next) => {
  press
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "press Supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPress = (req, res, next) => {
  press
    .find()
    .then((salons) => res.status(200).json(salons))
    .catch(res.status(400).json(error));
};
