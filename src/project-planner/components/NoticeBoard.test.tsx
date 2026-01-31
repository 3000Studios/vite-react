import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import NoticeBoard from './NoticeBoard';
import { UserRole } from '../types';

// Mock Audio
const mockAudioPlay = vi.fn().mockImplementation(() => Promise.resolve());
const mockAudioConstructor = vi.fn();

class MockAudioWithSpy {
  play = mockAudioPlay;
  constructor(public src: string) {
    mockAudioConstructor(src);
  }
}

describe('NoticeBoard Performance', () => {
  beforeEach(() => {
    vi.stubGlobal('Audio', MockAudioWithSpy);
    // Mock SpeechRecognition if needed, though we might not trigger it in this specific test
    class MockSpeechRecognition {
      start = vi.fn();
      stop = vi.fn();
    }
    vi.stubGlobal('SpeechRecognition', MockSpeechRecognition);
    vi.stubGlobal('webkitSpeechRecognition', MockSpeechRecognition);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const defaultProps = {
    notices: [],
    currentUserRole: 'Developer' as UserRole,
    onAddNotice: vi.fn(),
  };

  it('lazily loads Audio resource (Optimization)', () => {
    render(<NoticeBoard {...defaultProps} />);

    // Expect Audio to NOT be instantiated immediately
    expect(mockAudioConstructor).not.toHaveBeenCalled();

    // Trigger functionality that requires Audio
    const input = screen.getByPlaceholderText('Write a project note...');
    fireEvent.change(input, { target: { value: 'New notice' } });

    const submitButton = screen.getByText('Send');
    fireEvent.click(submitButton);

    // Expect Audio to be instantiated now
    expect(mockAudioConstructor).toHaveBeenCalledTimes(1);
    expect(mockAudioConstructor).toHaveBeenCalledWith('https://www.myinstants.com/media/sounds/mk6-get-over-here.mp3');
    expect(mockAudioPlay).toHaveBeenCalledTimes(1);
  });
});
