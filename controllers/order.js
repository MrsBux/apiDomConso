const Order = require("../models/Order");
const nodemailer = require("nodemailer");
require("dotenv").config();

const EmailUser = process.env.EMAIL_USER;
const EmailPassword = process.env.EMAIL_PASSWORD;
const EmailConso = process.env.EMAIL_CONSO;

exports.createOrder = async (req, res, next) => {
  try {
    const order = new Order({
      ...req.body,
      state: "new", // Définit l'état initial à "new"
    });

    const savedOrder = await order.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EmailUser,
        pass: EmailPassword,
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: EmailUser,
      to: EmailConso,
      subject: "Nouvelle commande soumise",
      text:
        "Une nouvelle commande a été soumise sur votre site.\n" +
        `Numéro de commande: ${savedOrder._id}\n` +
        `Date de commande: ${savedOrder.date}\n` +
        `État: ${savedOrder.state}\n` +
        `E-mail du client: ${savedOrder.email}\n` +
        `Nom: ${savedOrder.nom}\n` +
        `Prénom: ${savedOrder.prenom}\n` +
        `Total: ${savedOrder.totalPrice}€`,
    };

    // Email to customer
    const customerMailOptions = {
      from: EmailUser,
      to: savedOrder.email,
      subject: "Confirmation de votre commande",
      text:
        `Cher/Chère ${savedOrder.prenom} ${savedOrder.nom},\n\n` +
        `Nous vous remercions pour votre commande. Voici un récapitulatif :\n\n` +
        `Numéro de commande: ${savedOrder._id}\n` +
        `Date de commande: ${savedOrder.date}\n` +
        `Total: ${savedOrder.totalPrice}€\n` +
        `Type de livraison: ${savedOrder.deliveryType}\n\n` +
        `Détails de la commande:\n` +
        savedOrder.wine
          .map(
            (item) =>
              `- ${item.wineName} - ${item.wineMillesime}: ${item.quantite}`
          )
          .join("\n") +
        `\n\nSi vous avez opté pour un paiement par chèque veuillez nous parvenir par voie postale (au 7 chemin de Boursan, 84230 Châteauneuf-du-Pape), votre chèque sous 14 jours en rappelant le numéro de commande indiqué dans ce mail, votre nom et votre prénom.\n\n` +
        `\n\n Si vous avez opté pour un paiement par virement, veuillez réaliser le virement sous 14 jours en rappelant le numéro de commande présent dans ce mail ainsi que votre nom et votre prénom. Vous trouverez le RIB à la fin de ce mail.\n\n` +
        `\n\nSi vous avez opté pour un paiement en espèce lors d'une remise en main propre, vous avez 30 jours pour venir récupérer votre commande. Pour convenir d'un créneau de retrait vous pouvez nous contacter par mail ou par télephone au 0603491348 ou au 0603494881 .\n\n` +
        `\n\nSi vous avez opté pour une livraison à domicile vous recevrez un email lors de l'expédition de votre commande,\n\n` +
        `\n\nSi vous avec opté pour la livraison en salon, vous recevrez un email de rappel avant le début du salon afin que vous puissiez penser à venir récupérer votre commande .\n\n` +
        `\n\nSi vous avez besoin d'aide, n'hezitez pas à nous contacter. Nous serons ravis de vous aider.\n\n` +
        `Cordialement,\nL'équipe de la Consonnière` +
        `\n\n\n\n` +
        `\n\n\n\n` +
        `\n\nRIB, IBAN FR76 1130 6000 8401 2212 9900 043, BIC : AGRIFRPP813\n\n`,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);

    res.status(201).json({
      message: "Commande enregistrée avec succès",
      orderId: savedOrder._id,
    });
  } catch (error) {
    console.error("Erreur lors du traitement de la commande : ", error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteOrder = (req, res, next) => {
  Order.deleteOne({ _id: req.params.id })
    .then(() =>
      res.status(200).json({ message: "Commande supprimée avec succès" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneOrder = (req, res, next) => {
  Order.findOne({ _id: req.params.id })
    .then((order) => res.status(200).json(order))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllOrders = (req, res, next) => {
  Order.find()
    .then((orders) => res.status(200).json(orders))
    .catch((error) => res.status(400).json({ error }));
};

exports.countOrders = (req, res, next) => {
  Order.countDocuments({})
    .then((count) => {
      res.status(200).json({ orderCount: count });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Erreur lors du comptage des commandes",
        error: error,
      });
    });
};
