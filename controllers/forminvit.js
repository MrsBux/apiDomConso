const FormInvit = require("../models/FormInvit");
const nodemailer = require("nodemailer");
require("dotenv").config();
const EmailUser = process.env.EMAIL_USER;
const EmailPassword = process.env.EMAIL_PASSWORD;
const EmailConso = process.env.EMAIL_CONSO;

const getForm = async (req, res) => {
  try {
    const nouveauFormulaire = new FormInvit({
      email: req.body.email,
      salon: req.body.salon,
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
      subject: "Nouvelle demande d'invit soumise",
      text:
        "Nouvelle demande d'invit soumise sur votre site.\n" +
        `E-mail: ${req.body.email}\n` +
        `Salon: ${req.body.salon}`,
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
