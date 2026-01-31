import nodemailer from 'nodemailer';
import twilio from 'twilio';

let cachedTransporter = null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, date, time, guests } = req.body;

  // 1. Configuration (These come from Environment Variables)
  const EMAIL_USER = process.env.EMAIL_USER || 'mr.jwsswain@gmail.com'; // Your Gmail address
  const EMAIL_PASS = process.env.EMAIL_PASS || 'wwrx hzop udow tkxh'; // Your Gmail App Password
  
  // Twilio Config - Supports both Phone Number and Messaging Service
  const TWILIO_SID = process.env.TWILIO_SID || 'AC12f76686b3c1126347be3f422c15d463'; // Default from user
  const TWILIO_TOKEN = process.env.TWILIO_TOKEN || '9d7efcb8b66fd224d8eaddac0bd8ffe0'; // Default from user
  const TWILIO_PHONE = process.env.TWILIO_PHONE || '+18444593956'; // Default from user
  const TWILIO_MESSAGING_SERVICE_SID = process.env.TWILIO_MESSAGING_SERVICE_SID || 'MG60d407a08d34d8ecc32bb874daf3f57a'; // Default from user
  
  // Owner Contact Info
  const OWNER_EMAIL = 'mr.jwsswain@gmail.com';
  const OWNER_PHONE = '+14046407734';

  // Helper to format phone number to E.164 (assuming US)
  const formatPhone = (p) => {
    const cleaned = ('' + p).replace(/\D/g, '');
    return cleaned.length === 10 ? `+1${cleaned}` : p.startsWith('+') ? p : `+1${cleaned}`;
  };

  const customerPhone = formatPhone(phone);

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
    const results = {
      email: { success: false, error: null },
      sms: { success: false, error: null }
    };

    // 3. Send Emails (Owner & Customer)
    if (EMAIL_USER && EMAIL_PASS) {
      try {
        if (!cachedTransporter) {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: EMAIL_USER,
              pass: EMAIL_PASS,
            },
          });
          cachedTransporter = transporter;
        }

        // Email to Owner and Customer (Parallel)
        await Promise.all([
          cachedTransporter.sendMail({
            from: `"Cajun Menu Bot" <${EMAIL_USER}>`,
            to: OWNER_EMAIL,
            subject: `🍽️ New Reservation: ${name} - ${date} @ ${time}`,
            text: `New reservation received!\n\nName: ${name}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nPhone: ${phone}\nEmail: ${email}\n\nAn event file (.ics) is attached. Click it to add to your calendar.`,
            attachments: [
              {
                filename: 'reservation.ics',
                content: icsContent,
                contentType: 'text/calendar',
              },
            ],
          }),
          cachedTransporter.sendMail({
            from: `"The Cajun Menu" <${EMAIL_USER}>`,
            to: email,
            subject: `✅ Reservation Confirmed: The Cajun Menu`,
            text: `Hi ${name},\n\nYour reservation for ${guests} people on ${date} at ${time} is confirmed!\n\nWe look forward to seeing you.\n\n📍 Location: 140 Keith Dr, Canton, GA 30114\n📞 Contact: (678) 899-7404\n\nWe've attached a calendar invite for your convenience.`,
            attachments: [
              {
                filename: 'reservation.ics',
                content: icsContent,
                contentType: 'text/calendar',
              },
            ],
          })
        ]);
        
        console.log('Emails sent successfully');
        results.email.success = true;
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        results.email.error = emailError.message;
      }
    } else {
      console.log('Skipping Email: Missing EMAIL_USER or EMAIL_PASS');
      results.email.error = 'Missing Environment Variables: EMAIL_USER or EMAIL_PASS';
    }

    // 4. Send SMS (Owner & Customer)
    if (TWILIO_SID && TWILIO_TOKEN && (TWILIO_PHONE || TWILIO_MESSAGING_SERVICE_SID)) {
      try {
        const client = twilio(TWILIO_SID, TWILIO_TOKEN);
        
        // Determine sender (Messaging Service takes priority if available)
        const messageOptions = {};
        if (TWILIO_MESSAGING_SERVICE_SID) {
            messageOptions.messagingServiceSid = TWILIO_MESSAGING_SERVICE_SID;
        } else {
            messageOptions.from = TWILIO_PHONE;
        }

        // SMS to Owner & Customer (Parallel)
        await Promise.all([
          client.messages.create({
            ...messageOptions,
            body: `🔥 New Reservation: ${name} (${guests} ppl) @ ${date} ${time}. Phone: ${phone}`,
            to: OWNER_PHONE,
          }),
          client.messages.create({
            ...messageOptions,
            body: `✅ The Cajun Menu: Your reservation for ${guests} on ${date} at ${time} is confirmed! See you soon! 🐊`,
            to: customerPhone,
          })
        ]);

        console.log('SMS sent successfully');
        results.sms.success = true;
      } catch (smsError) {
        console.error('SMS sending failed:', smsError);
        results.sms.error = smsError.message;
      }
    } else {
      console.log('Skipping SMS: Missing Twilio credentials');
      results.sms.error = 'Missing Environment Variables: TWILIO_SID, TWILIO_TOKEN, or TWILIO_PHONE/MESSAGING_SERVICE_SID';
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Reservation processed',
      details: results 
    });

  } catch (error) {
    console.error('Error processing reservation:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
