import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json({ limit: '10kb' }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get('/', (req, res) => {
  res.send('Dhaka Bites server chalche');
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body ?? {};
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  const cleanMessage = typeof message === 'string' ? message.trim() : '';

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({ message: 'Shob field dorkar' });
  }

  if (
    !cleanEmail.includes('@') ||
    cleanMessage.length < 5 ||
    cleanMessage.length > 2000
  ) {
    return res.status(400).json({ message: 'Email ba message thik na' });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: cleanEmail,
      subject: `New message from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
    });

    return res.json({ message: 'Pathano hoyeche' });
  } catch (error) {
    console.error('Contact email failed:', error);
    return res.status(500).json({ message: 'Email pathano jayni, pore chesta koro' });
  }
});

app.listen(port, () => {
  console.log(`Dhaka Bites server listening on port ${port}`);
});
