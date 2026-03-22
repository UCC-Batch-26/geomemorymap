import nodemailer from 'nodemailer';

const { EMAIL_USER, EMAIL_PASS, CONTACT_RECEIVER } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  }
})

export async function sendContactEmail({ name, email, message }) {
  const mailOptions = {
    from: EMAIL_USER,
    to: CONTACT_RECEIVER,
    replyTo: email,
    subject: `Geo Memory Map Contact Form - ${name}`,
    text: `
    New Contact form submission
    
    Name: ${name}
    Email: ${email}
    
    Message:
    ${message}
      `.trim(),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
    
    `,
  };

  return transporter.sendMail(mailOptions);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
} 