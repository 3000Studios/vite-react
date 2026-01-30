import { describe, it, expect, vi } from 'vitest';
import handler from '../api/reserve.js';

// Mock Nodemailer
vi.mock('nodemailer', () => {
  return {
    default: {
      createTransport: vi.fn().mockReturnValue({
        verify: vi.fn().mockResolvedValue(true),
        sendMail: vi.fn().mockImplementation(async () => {
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate 500ms delay per email
          return { messageId: '123' };
        }),
      }),
    },
  };
});

// Mock Twilio
vi.mock('twilio', () => {
  return {
    default: vi.fn().mockReturnValue({
      messages: {
        create: vi.fn().mockResolvedValue({ sid: 'SM123' }),
      },
    }),
  };
});

describe('Reserve Handler Performance', () => {
  const req = {
    method: 'POST',
    body: {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      date: '2023-10-27',
      time: '18:00',
      guests: 2,
    },
  };

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };

  it('measures execution time', async () => {
    // Set environment variables for the test
    process.env.EMAIL_USER = 'test@example.com';
    process.env.EMAIL_PASS = 'secret';
    // Ensure SMS is skipped to focus on Email
    delete process.env.TWILIO_SID;

    const start = performance.now();
    await handler(req, res);
    const end = performance.now();
    const duration = end - start;

    console.log(`Execution time: ${duration.toFixed(2)}ms`);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });
});
