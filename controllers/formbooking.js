const FormBooking = require("../models/FormBooking");
const nodemailer = require("nodemailer");
require("dotenv").config();
const EmailUser = process.env.EMAIL_USER;
const EmailPassword = process.env.EMAIL_PASSWORD;
const EmailConso = process.env.EMAIL_CONSO;

const getForm = async (req, res) => {
  try {
    const nouveauFormulaire = new FormBooking({
      nom: req.body.nom,
      prestation: req.body.prestation,
      email: req.body.email,
      message: req.body.message,
      date: req.body.date,
      heure: req.body.heure,
      telephone: req.body.telephone,
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
      subject: "Nouveau formulaire Booking soumis",
      text:
        "Un nouveau formulaire de Booking a été soumis sur votre site.\n" +
        `Nom: ${req.body.nom}\n` +
        `Prestation: ${req.body.prestation}\n` +
        `Date: ${req.body.date}\n` +
        `Date: ${req.body.heure}\n` +
        `E-mail: ${req.body.email}\n` +
        `Telephone: ${req.body.telephone}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'e-mail : ", error);
      } else {
        console.log("E-mail envoyé : ", info.response);
      }
    });

    res.status(200).send("Formulaire soumis avec succès !");
  } catch (error) {
    console.error("Erreur lors du traitement du formulaire : ", error);
    res.status(500).send("Erreur lors du traitement du formulaire.");
  }
};

module.exports = {
  getForm,
};

//
