const NewsSub = require("../models/NewsSub.js");

exports.createNewsSub = (req, res, next) => {
  const newssub = new NewsSub({
    ...req.body,
  });

  newssub
    .save()
    .then(
      res
        .status(201)
        .json({ message: "inscription à la newsletter enregistrée" })
    )
    .catch((error) => res.status(400).json(error));
};

exports.deleteNewsSub = (req, res, next) => {
  NewsSub.deleteOne({ _id: req.params.id })
    .then(() =>
      res
        .status(200)
        .json({ message: "Suppression de l'email abonné à la newsletter !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneNewsSub = (req, res, next) => {
  NewsSub.findOne({ _id: req.params.id })
    .then((newssub) => res.status(200).json(newssub))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllNewsSubs = (req, res, next) => {
  NewsSub.find()
    .then((newssubs) => res.status(200).json(newssubs))
    .catch(res.status(400).json(error));
};
