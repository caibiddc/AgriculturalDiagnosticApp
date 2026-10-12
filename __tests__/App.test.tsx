/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
// This smoke test exercises the app shell. Navigation/screens require native device E2E tests.
jest.mock('../routes', () => () => null);
import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
