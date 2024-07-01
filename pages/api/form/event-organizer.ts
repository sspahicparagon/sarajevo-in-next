import { NextApiRequest, NextApiResponse } from "next";

const TO_EMAIL: string[] = ['info@sarajevoin.ba'];
const CC_EMAIL: string[] = ['info@bihmarketing.ba', 'spahic.sabahudin1@gmail.com'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const name: string = body['your-name'];
  const email: string = body['your-email'];
  const subject: string =  body['your-subject'];
  const message: string = body['your-message'];

  let nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "webmail.sarajevoin.ba",
    auth: {
      user: process.env.IMAGE_DIRECTORY_USER,
      pass: process.env.IMAGE_DIRECTORY_PASSWORD,
    },
    secure: true,
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailData = {
    from: email,
    to: TO_EMAIL,
    cc: CC_EMAIL,
    subject: `SarajevoIN - ${subject} - ${name}`,
    text: message + " | Poslao: " + email,
    html: `<div>${message}</div><div><p>Poslao:
    ${email}</p></div>`
  };

  //Notify our side that message was sent
  transporter.sendMail(mailData, function (err: any, info: any) {
    if(err)
      console.log({err})
    else
      console.log({info})
  });

  res.status(200);
  res.redirect('/service/event-organizer/success');
  console.log({body});
  return res;
}