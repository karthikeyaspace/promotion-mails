import nodemailer from "nodemailer";
import { validate } from "email-validator";
import { mails, mailHtml } from "./mail.js";
import { config } from "dotenv";

config();

const email = process.env.EMAIL_ID;
const app_pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: app_pass,
  },
});

const mailOptions = {
  from: "VJ Dataquesters <" + email + ">",
  subject: "VJ Dataquesters Intake",
  text: "Club Intake",
  html: mailHtml,
};

const sendBulkMails = async () => {
  let count = 0;
  try {
    for (const mail of mails) {
      if (!validate(mail)) {
        console.log(`Invalid email: ${mail}`);
        continue;
      }
      mailOptions.to = mail;
      await transporter.sendMail(mailOptions);
      count++;
      console.log(`Mail sent to ${mail}: ${count}`);
    }
    console.log();
    console.log("All mails sent successfully");
  } catch (err) {
    console.log(err);
  } finally {
    transporter.close();
  }
};

sendBulkMails();
