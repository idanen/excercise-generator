import '@testing-library/jest-dom';
import { fetch } from 'whatwg-fetch';
import { configure } from '@testing-library/react';
import { vi } from 'vitest';
import { server } from './__mocks__/server';

configure({ asyncUtilTimeout: process.env.CI ? 5000 : 1000 });

window.fetch = fetch;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks();
});
afterAll(() => server.close());
