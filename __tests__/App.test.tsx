/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
// This smoke test exercises the app shell. Navigation/screens require native device E2E tests.
jest.mock('../routes', () => () => null);
// NativeWind color scheme requires a device-specific runtime; mock only its wrapper.
jest.mock('../components/ui/gluestack-ui-provider', () => ({
  GluestackUIProvider: ({children}: {children: React.ReactNode}) => children,
}));
import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
