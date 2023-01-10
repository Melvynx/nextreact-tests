import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { fetch } from 'cross-fetch';
import { beforeEach, expect } from 'vitest';
import { server } from './server';

expect.extend(matchers);

global.fetch = fetch;

beforeEach(() => {
  // clean the dom with @react-testing-library
  // https://testing-library.com/docs/react-testing-library/api#cleanup
  cleanup();
});

afterEach(() => {
  server.resetHandlers();
});

// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => {
  server.close();
});
