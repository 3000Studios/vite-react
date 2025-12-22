import nodemailer from 'nodemailer';
import twilio from 'twilio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, date, time, guests } = req.body;

  // 1. Configuration (These come from Environment Variables)
  const EMAIL_USER = process.env.EMAIL_USER; // Your Gmail address
  const EMAIL_PASS = process.env.EMAIL_PASS; // Your Gmail App Password
  const TWILIO_SID = process.env.TWILIO_SID;
  const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
  const TWILIO_PHONE = process.env.TWILIO_PHONE;
  const MY_PHONE_NUMBER = '+14046407734'; // Your personal phone

  // 2. Generate ICS File Content (Calendar Event)
  // Format date/time for ICS (YYYYMMDDTHHMMSS)
  const startDateTime = new Date(`${date}T${time}`).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDateTime = new Date(new Date(`${date}T${time}`).getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; // 1 hour duration

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//The Cajun Menu//Reservations//EN
BEGIN:VEVENT
UID:${Date.now()}@thecajunmenu.online
DTSTAMP:${startDateTime}
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:Reservation: ${name} (${guests} Guests)
DESCRIPTION:Reservation for ${name}.\nPhone: ${phone}\nEmail: ${email}\nGuests: ${guests}
LOCATION:The Cajun Menu, 140 Keith Dr, Canton, GA 30114
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  try {
    // 3. Send Email with ICS Attachment
    if (EMAIL_USER && EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Cajun Menu Bot" <${EMAIL_USER}>`,
        to: 'mr.jwswain@gmail.com',
        subject: `🍽️ New Reservation: ${name} - ${date} @ ${time}`,
        text: `New reservation received!\n\nName: ${name}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nPhone: ${phone}\nEmail: ${email}\n\nAn event file (.ics) is attached. Click it to add to your calendar.`,
        attachments: [
          {
            filename: 'reservation.ics',
            content: icsContent,
            contentType: 'text/calendar',
          },
        ],
      });
      console.log('Email sent successfully');
    } else {
      console.log('Skipping Email: Missing EMAIL_USER or EMAIL_PASS');
    }

    // 4. Send SMS via Twilio
    if (TWILIO_SID && TWILIO_TOKEN && TWILIO_PHONE) {
      const client = twilio(TWILIO_SID, TWILIO_TOKEN);
      await client.messages.create({
        body: `🔥 New Reservation: ${name} for ${guests} ppl on ${date} at ${time}. Phone: ${phone}`,
        from: TWILIO_PHONE,
        to: MY_PHONE_NUMBER,
      });
      console.log('SMS sent successfully');
    } else {
      console.log('Skipping SMS: Missing Twilio credentials');
    }

    return res.status(200).json({ success: true, message: 'Reservation processed' });

  } catch (error) {
    console.error('Error processing reservation:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
