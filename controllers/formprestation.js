const FormPrestation = require("../models/FormPrestation.js");
const nodemailer = require("nodemailer");
require("dotenv").config();
const EmailUser = process.env.EMAIL_USER;
const EmailPassword = process.env.EMAIL_PASSWORD;
const EmailConso = process.env.EMAIL_CONSO;

const getForm = async (req, res) => {
  try {
    const nouveauFormulaire = new FormPrestation({
      nom: req.body.nom,
      prenom: req.body.prenom,
      telephone: req.body,
      email: req.body.email,
      telephone: req.body.telephone,
      date: req.body.date,
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
      subject: "Nouvelle demande de réservation pour une prestation",
      text:
        "Un nouveau formulaire prestation a été soumis sur votre site.\n" +
        `Nom: ${req.body.nom}\n` +
        `Prénom: ${req.body.prenom}\n` +
        `E-mail: ${req.body.email}\n` +
        `Telephone: ${req.body.telephone}\n` +
        `Date: ${req.body.date}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(
          "Erreur lors de l'envoi de l'e-mail prestation : ",
          error
        );
      } else {
        console.log("E-mail envoyé prestation: ", info.response);
      }
    });

    res.status(200).send("Formulaire prestation soumis avec succès !");
  } catch (error) {
    console.error(
      "Erreur lors du traitement du formulaire prestation : ",
      error
    );
    res.status(500).send("Erreur lors du traitement du formulaire prestation.");
  }
};

module.exports = {
  getForm,
};

//
