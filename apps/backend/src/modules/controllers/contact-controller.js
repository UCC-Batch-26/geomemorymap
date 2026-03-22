import { sendContactEmail } from '#modules/services/email-service.js';

export async function contactController(req, res) {
  try {
    const { name, email, message } = req.body;

    await sendContactEmail({ name, email, message });

    return res.status(200).json({
      message: 'Message sent succesfully.',
    })
  } catch (error) {
    console.error('Contact form email error', error);

    return res.status(500).json({
      message: 'Failed to send message.',
    })
  }
}