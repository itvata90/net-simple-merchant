// setupTests.js
import '@testing-library/jest-dom';

// Create a mock function that returns a mock ResizeObserver object
const mockResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Assign the mock function to the global.ResizeObserver property
global.ResizeObserver = mockResizeObserver;
