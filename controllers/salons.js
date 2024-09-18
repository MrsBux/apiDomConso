const Salon = require("../models/Salon.js");
const path = require("path");
const fs = require("fs");
const util = require("util");

// Dans le contrôleur salons.js
exports.createSalon = (req, res, next) => {
  const salonData = {
    name: req.body.name,
    description: req.body.description,
    debut: req.body.debut,
    fin: req.body.fin,
    region: req.body.region,
    localisation: req.body.localisation,
  };

  // Ajoute le champ invitation seulement si un fichier a été uploadé
  if (req.file) {
    salonData.invitation = req.file.path;
  }

  const salon = new Salon(salonData);

  salon
    .save()
    .then((savedSalon) => {
      res.status(201).json({ message: "Salon créé !", salon: savedSalon });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Erreur lors de la création du salon",
        error: error.message,
      });
    });
};
exports.modifySalon = (req, res, next) => {
  Salon.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Salon modifié!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSalon = (req, res, next) => {
  Salon.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Salon supprimé!" }))
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
    .catch((error) => res.status(400).json({ error }));
};
// Convertir fs.access et fs.stat en versions promisifiées
const fsAccess = util.promisify(fs.access);
const fsStat = util.promisify(fs.stat);

exports.downloadInvitation = async (req, res) => {
  console.log("Middleware atteint");

  try {
    const salonId = req.params.id;
    console.log(`ID du salon: ${salonId}`);

    const salon = await Salon.findById(salonId);
    console.log("Salon trouvé:", salon ? "Oui" : "Non");

    if (!salon || !salon.invitation) {
      console.log("Fichier d'invitation non trouvé dans le salon");
      return res
        .status(404)
        .json({ message: "Fichier d'invitation non trouvé" });
    }

    const filePath = path.resolve(salon.invitation);
    console.log(`Chemin du fichier résolu: ${filePath}`);

    try {
      await fsAccess(filePath);
      console.log("Le fichier existe sur le serveur");
    } catch (error) {
      console.error(`Erreur d'accès au fichier : ${error.message}`);
      return res
        .status(404)
        .json({ message: "Le fichier n'existe pas sur le serveur" });
    }

    const stat = await fsStat(filePath);
    console.log(`Taille du fichier: ${stat.size} octets`);

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Length": stat.size,
      "Content-Disposition": `attachment; filename="${path.basename(
        filePath
      )}"`,
    });
    console.log("En-têtes de réponse écrits");

    const fileStream = fs.createReadStream(filePath);
    console.log("Flux de lecture créé");

    fileStream.on("error", (error) => {
      console.error(`Erreur lors de la lecture du fichier : ${error.message}`);
      if (!res.headersSent) {
        res
          .status(500)
          .json({ message: "Erreur lors de la lecture du fichier" });
      }
    });

    fileStream.on("end", () => {
      console.log("Transmission du fichier terminée");
    });

    fileStream.pipe(res);
    console.log("Flux de fichier dirigé vers la réponse");
  } catch (error) {
    console.error("Erreur lors du téléchargement :", error);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: "Erreur serveur lors du téléchargement" });
    }
  }
};
