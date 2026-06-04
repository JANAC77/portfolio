import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers for Vercel Serverless environment
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required parameters: name, email, or message' });
  }

  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('SMTP Error: EMAIL_USER or EMAIL_PASS environment variables are not set.');
    return res.status(500).json({ success: false, error: 'Server configuration error: SMTP credentials missing.' });
  }

  const receiverEmail = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER;

  // Configure transporter based on provided environment variables (defaults to Gmail)
  const smtpConfig = process.env.EMAIL_HOST
    ? {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587', 10),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      }
    : {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      };

  const transporter = nodemailer.createTransport(smtpConfig);

  // Email payload details
  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`, // Recommended by SMTP servers to use your authenticated address
    replyTo: email, // Set sender email as replyTo so the user can easily click reply
    to: receiverEmail,
    subject: `Portfolio Contact: Message from ${name}`,
    text: `You have received a new message from your portfolio contact form.\n\n` +
          `Sender Identity: ${name}\n` +
          `Sender Email Vector: ${email}\n\n` +
          `Transmission Data / Message:\n` +
          `--------------------------------------------------\n` +
          `${message}\n` +
          `--------------------------------------------------\n`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #0f172a; background-color: #f8fafc; border-radius: 8px; max-width: 600px;">
        <h2 style="color: #0ea5e9; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">New Contact Inbound</h2>
        <p style="margin: 16px 0;"><strong>Sender Name:</strong> ${name}</p>
        <p style="margin: 16px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
        <div style="margin-top: 24px; padding: 16px; background-color: #ffffff; border-left: 4px solid #0ea5e9; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; font-size: 0.95rem;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
        <footer style="margin-top: 32px; font-size: 0.75rem; color: #64748b; text-align: center;">
          System Vector: Vercel Serverless Function &bull; Portfolio Inquiries
        </footer>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return res.status(200).json({ success: true, message: 'Message dispatched successfully!' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ success: false, error: 'SMTP dispatch failed', details: error.message });
  }
}
