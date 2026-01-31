import { describe, it, expect, vi, afterEach } from 'vitest';
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
        create: vi.fn().mockImplementation(async () => {
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate 500ms delay per SMS
            return { sid: 'SM123' };
        }),
      },
    }),
  };
});

describe('Reserve Handler Benchmark', () => {
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

  const OLD_ENV = process.env;

  afterEach(() => {
    process.env = OLD_ENV;
    vi.clearAllMocks();
  });

  it('measures execution time with both Email and SMS', async () => {
    // Set environment variables to trigger both paths
    process.env.EMAIL_USER = 'test@example.com';
    process.env.EMAIL_PASS = 'secret';
    process.env.TWILIO_SID = 'AC123';
    process.env.TWILIO_TOKEN = 'token';
    process.env.TWILIO_PHONE = '+1234567890';
    process.env.TWILIO_MESSAGING_SERVICE_SID = ''; // Ensure we use phone or service

    const start = performance.now();
    await handler(req, res);
    const end = performance.now();
    const duration = end - start;

    console.log(`[Benchmark] Execution time: ${duration.toFixed(2)}ms`);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });
});
