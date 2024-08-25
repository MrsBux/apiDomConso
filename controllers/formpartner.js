const FormPartner = require("../models/FormPartner");
const nodemailer = require("nodemailer");
require("dotenv").config();
const EmailUser = process.env.EMAIL_USER;
const EmailPassword = process.env.EMAIL_PASSWORD;
const EmailConso = process.env.EMAIL_CONSO;

const postPartnerForm = async (req, res) => {
  try {
    const nouveauFormulaire = new FormPartner({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      profession: req.body.profession,
      message: req.body.message,
    });
    await nouveauFormulaire.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EmailUser,
        pass: EmailPassword,
      },
    });

    const mailOptions = {
      from: EmailUser,
      to: EmailConso,
      subject: "Nouveau formulaire PARTNER soumis",
      text:
        "Un nouveau formulaire partenaire a été soumis sur votre site.\n" +
        `Nom: ${req.body.nom}\n` +
        `Prénom: ${req.body.prenom}\n` +
        `E-mail: ${req.body.email}\n` +
        `Profession: ${req.body.profession}\n` +
        `Message: ${req.body.message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'e-mail partner : ", error);
      } else {
        console.log("E-mail envoyé partner: ", info.response);
      }
    });

    res
      .status(200)
      .json({ message: "Formulaire partner soumis avec succès !" });
  } catch (error) {
    console.error("Erreur lors du traitement du formulaire partner : ", error);
    res
      .status(500)
      .json({ message: "Erreur lors du traitement du formulaire partner." });
  }
};

const getAllFormPartner = async (req, res) => {
  try {
    const forms = await FormPartner.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error("Erreur lors de la recherche des formulaires : ", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la recherche des formulaires." });
  }
};

module.exports = {
  postPartnerForm,
  getAllFormPartner,
};
