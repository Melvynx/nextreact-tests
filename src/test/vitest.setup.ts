import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { beforeEach, expect, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

expect.extend(matchers);

export const fetchMock = createFetchMock(vi);

// adds the 'fetchMock' global variable and rewires 'fetch' global to call 'fetchMock' instead of the real implementation
fetchMock.enableMocks();

// changes default behavior of fetchMock to use the real 'fetch' implementation and not mock responses
fetchMock.dontMock();

beforeEach(() => {
  // clean the dom with @react-testing-library
  // https://testing-library.com/docs/react-testing-library/api#cleanup
  cleanup();

  // if you have an existing `beforeEach` just add the following line to it
  fetchMock.doMock();
});
