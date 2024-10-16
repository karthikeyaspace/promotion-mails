import nodemailer from "nodemailer";
import { mails } from "./mails.js";
import { config } from "dotenv";
config();

const email = process.env.EMAIL;
const app_pass = process.env.APP_PASS;

const transporter = nodemailer.createTransport({
  // pool: true,
  service: "gmail",
  auth: {
    user: email,
    pass: app_pass,
  },
});

const mailHtml = `
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Get Set Py - Python Bootcamp</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "Poppins", Arial, sans-serif;
        line-height: 1.6;
        color: #000000;
        background-color: #ffffff;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 800px;
        margin: auto;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      }
      .header {
        padding: 30px 30px 0 30px;
        text-align: center;
      }
      .h1-text {
        font-size: 2.5em;
        margin: 0;
      }
      .p-text {
        font-size: 1.2em;
        font-weight: 700;
        margin-top: 10px;
      }
      .content {
        padding: 0 30px 30px 20px;
      }
      .image {
        max-width: 100%;
        height: auto;
        margin-bottom: 20px;
      }
      h2 {
        font-size: 1.8em;
        margin-top: 0;
        color: #000000;
      }
      h1 {
        color: #000000;
      }
      h3 {
        color: #000000;
      }
      p {
        color: #000000;
      }
      ul {
        color: #000000;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="h1-text">Get Set Py</h1>
        <p class="p-text">A hands-on journey with Python</p>
      </div>
      <div class="content">
        <img
          src="https://raw.githubusercontent.com/karthikeyaveruturi/tempstoragecdn/refs/heads/main/Get%20Set%20Py%20-%20Main%20poster.png"
          alt="Python Bootcamp"
          class="image"
        />
        <h2>VJ Data Questers presents:</h2>
        <h3>Python Bootcamp for 2nd Year Students!</h3>
        <p>
          Looking to master the essential frameworks of Python and create
          machine learning applications? Join us for Get Set Py, a two-day
          immersive bootcamp where you'll learn to work with:
        </p>
        <ul>
          <li>NumPy</li>
          <li>Pandas</li>
          <li>Data Cleaning</li>
          <li>Preprocessing</li>
          <li>Data Visualization</li>
        </ul>
        <p>
          By the end of the bootcamp, you'll have built your very own Machine
          Learning project from scratch and deployed it on GitHub!
        </p>

        <p>
          ⚡ And that’s not all! There will be a competition where participants
          will team up to build <strong>machine learning projects</strong>. The
          best performers will win exciting gifts 🎁 and
          <strong>certificates</strong>!
        </p>

        <p>
          📜 Participation <strong>certificates</strong> will be provided to all
          attendees, so everyone walks away with recognition.
        </p>

        <p>
          ⚡ <strong>Limited Registrations</strong> Available! Don’t miss this
          hands-on workshop! Laptops are mandatory to work on the real-world
          projects.
        </p>

        <p>Event Details:</p>
        <ul>
          <li>🗓 <strong>Dates</strong>: 25th & 26th October 2024</li>
          <li>🏢 <strong>Venue</strong>: APJ Abdul Kalam Auditorium</li>
          <li>
            🎤 <strong>Speaker</strong>: Sreeranjan Kumar Deverapalli, Senior
            Software Developer, NSIC
          </li>
          <li>💸 <strong>Fee</strong>: ₹75 per person</li>
        </ul>
        <a
          href="https://forms.gle/gSjQG1dBVGs7FYXE8"
          target="_blank"
          class="reg-button"
          >Click here to register</a
        >
      </div>
    </div>
  </body>
</html>

`;

const MailOptions = {
  from: "karthikeyaveruturi2004@gmail.com",
  subject: "Get Set Py - Python Bootcamp",
  text: "A event by VJ Data Questers",
  html: mailHtml,
};

const sendBulkMails = async () => {
  try {
    mails.map(async (mail) => {
      MailOptions.to = mail;
      await transporter.sendMail(MailOptions);
    });

    // await transporter.sendMail(MailOptions);
    // transporter.close();
  } catch (err) {
    console.log(err);
  }
};

sendBulkMails();

// transporter.close();
