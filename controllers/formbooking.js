const FormBooking = require("../models/FormBooking");
const nodemailer = require("nodemailer");
require("dotenv").config();
const EmailUser = process.env.EMAIL_USER;
const EmailPassword = process.env.EMAIL_PASSWORD;
const EmailConso = process.env.EMAIL_CONSO;

exports.postForm = async (req, res) => {
  console.log("controller atteint");

  try {
    const nouveauFormulaire = new FormBooking({
      nom: req.body.nom,
      prestation: req.body.prestation,
      email: req.body.email,
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
        `Heure: ${req.body.heure}\n` +
        `E-mail: ${req.body.email}\n` +
        `Téléphone: ${req.body.telephone}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'e-mail : ", error);
      } else {
        console.log("E-mail envoyé : ", info.response);
      }
    });

    res.status(200).json({ message: "Formulaire soumis avec succès !" });
  } catch (error) {
    console.error("Erreur lors du traitement du formulaire : ", error);
    res
      .status(500)
      .json({ message: "Erreur lors du traitement du formulaire." });
  }
};

exports.getAllBookingForms = async (req, res) => {
  try {
    const forms = await FormBooking.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error("Erreur lors de la recherche des formulaires : ", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la recherche des formulaires." });
  }
};
