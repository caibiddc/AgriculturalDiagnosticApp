/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import SignIn from '@/screens/auth/signin';
import React from 'react';
import {useColorScheme} from 'react-native';
import {GluestackUIProvider} from './components/ui/gluestack-ui-provider';
import './global.css';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GluestackUIProvider mode={isDarkMode ? 'dark' : 'light'}>
      <SignIn />
    </GluestackUIProvider>
  );
}

export default App;
