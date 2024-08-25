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
      name: req.body.name, // Correct field name
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
        `Salon: ${req.body.name}`,
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

const getAllFormInvit = async (req, res) => {
  try {
    const forms = await FormInvit.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error("Erreur lors de la recherche des formulaires : ", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la recherche des formulaires." });
  }
};

module.exports = {
  getForm,
  getAllFormInvit,
};
