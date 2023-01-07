import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { beforeEach, expect, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

expect.extend(matchers);

export const fetchMock = createFetchMock(vi);

// adds the 'fetchMock' global variable and rewires 'fetch' global to call 'fetchMock' instead of the real implementation
fetchMock.enableMocks();

beforeEach(() => {
  // clean the dom with @react-testing-library
  // https://testing-library.com/docs/react-testing-library/api#cleanup
  cleanup();

  fetchMock.doMock();
});
