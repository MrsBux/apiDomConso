const FormGFV = require("../models/FormGFV");
const nodemailer = require("nodemailer");
require("dotenv").config();
const EmailUser = process.env.EMAIL_USER;
const EmailPassword = process.env.EMAIL_PASSWORD;
const EmailConso = process.env.EMAIL_CONSO;

const getForm = async (req, res) => {
  try {
    const nouveauFormulaire = new FormGFV({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
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
      subject: "Nouveau formulaire GFV soumis",
      text:
        "Un nouveau formulaire GFV a été soumis sur votre site.\n" +
        `Nom: ${req.body.nom}\n` +
        `Prénom: ${req.body.prenom}\n` +
        `E-mail: ${req.body.email}\n`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'e-mail form gfv : ", error);
      } else {
        console.log("E-mail envoyé gfv : ", info.response);
      }
    });

    res.status(200).send("Formulaire gfv soumis avec succès !");
  } catch (error) {
    console.error("Erreur lors du traitement du formulaire gfv : ", error);
    res.status(500).send("Erreur lors du traitement du formulaire gfv.");
  }
};

module.exports = {
  getForm,
};

//
