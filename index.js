import nodemailer from "nodemailer";
import { validate } from "email-validator";
import { readFileSync } from "fs";
import { join } from "path";
import { config } from "dotenv";
import { mails } from "./mail.js";

config();

const configuration = {
  HTML_FILE_NAME: "langvision2.html",
  MAIL_SUBJECT: "LANGVISION – Shaping the Future of Gen AI & LLMs!",
  MAIL_TEXT: "Event from VJ Dataquesters",
  EMAIL: process.env.EMAIL_ID,
  APP_PASS: process.env.EMAIL_PASS,
  CONCURRENCY_LIMIT: 5, 
};

const mailHtml = readFileSync(join(process.cwd(), "templates", configuration.HTML_FILE_NAME), "utf8");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: configuration.EMAIL, pass: configuration.APP_PASS },
});

const sendEmail = async (recipient) => {
  if (!validate(recipient)) {
    console.log(`❌ Invalid email: ${recipient}`);
    return { recipient, status: "failed", reason: "Invalid email" };
  }

  try {
    await transporter.sendMail({
      from: `VJ Dataquesters <${configuration.EMAIL}>`,
      to: recipient,
      subject: configuration.MAIL_SUBJECT,
      text: configuration.MAIL_TEXT,
      html: mailHtml,
    });

    console.log(`✅ Mail sent to ${recipient}`);
    return { recipient, status: "success" };
  } catch (error) {
    console.error(`❌ Error sending to ${recipient}:`, error);
    return { recipient, status: "failed", reason: error.message };
  }
};

const sendBulkMails = async () => {
  const uniqueMails = [...new Set(mails)]; 
  const batchSize = configuration.CONCURRENCY_LIMIT; 

  console.log(`📧 Sending emails in batches of ${batchSize}...`);

  let count = 0;
  const results = [];

  for (let i = 0; i < uniqueMails.length; i += batchSize) {
    const batch = uniqueMails.slice(i, i + batchSize).map(sendEmail);

    const batchResults = await Promise.allSettled(batch);

    batchResults.forEach((result) => {
      if (result.status === "fulfilled" && result.value.status === "success") count++;
      results.push(result.value);
    });

    console.log(`📨 Batch ${i / batchSize + 1} completed. (${count}/${uniqueMails.length} sent)`);
  }

  console.log("\n✅ All emails processed!");
  transporter.close();

  return results;
};

sendBulkMails();
