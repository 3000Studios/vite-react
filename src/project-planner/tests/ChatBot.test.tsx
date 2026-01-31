import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatBot from '../components/ChatBot';
import { ProjectTask, ShoppingItem } from '../types';
import * as GeminiService from '../services/geminiService';
import { vi, describe, beforeEach, test, expect } from 'vitest';

// Mock the gemini service
vi.mock('../services/geminiService', () => ({
  chatWithAssistant: vi.fn(),
  getAiSuggestions: vi.fn(),
}));

const mockTasks: ProjectTask[] = [
  {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    scopeOfWork: 'Test Scope',
    actualCost: 100,
    estimatedHours: 10,
    actualHours: 5,
    workPerformed: 'None',
    status: 'To Do',
    priority: 'High',
    category: 'Feature',
    assignedTo: 'Owner',
    createdBy: 'Owner',
    createdAt: new Date().toISOString()
  }
];

const mockCatalog: ShoppingItem[] = [];

describe('ChatBot Performance Benchmark', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (GeminiService.chatWithAssistant as any).mockImplementation(async (msg: string) => {
      const queryMatch = msg.match(/QUERY: (.*)/);
      const query = queryMatch ? queryMatch[1] : 'Unknown';
      return {
        text: `Response to ${query}`,
        sources: []
      };
    });
  });

  test('renders correctly', () => {
    render(<ChatBot currentTasks={mockTasks} catalog={mockCatalog} />);
    expect(screen.getByText(/Terminal Secure/i)).toBeTruthy();
  });

  test('performance: sending multiple messages', async () => {
    const { getByPlaceholderText, getByRole, findByText } = render(
      <ChatBot currentTasks={mockTasks} catalog={mockCatalog} />
    );

    const input = getByPlaceholderText(/Analyze market/i);
    const button = getByRole('button');

    const start = performance.now();
    const ITERATIONS = 20;

    for (let i = 0; i < ITERATIONS; i++) {
      const msg = `Message ${i}`;
      fireEvent.change(input, { target: { value: msg } });
      fireEvent.click(button);

      // Wait for the specific response to ensure render happened
      await findByText(`Response to ${msg}`);
    }

    const end = performance.now();
    console.log(`[Benchmark] Time to render ${ITERATIONS} message pairs: ${(end - start).toFixed(2)}ms`);
  });
});
