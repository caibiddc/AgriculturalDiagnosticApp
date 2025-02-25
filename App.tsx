import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useColorScheme} from 'react-native';
import {GluestackUIProvider} from './components/ui/gluestack-ui-provider';
import './global.css';
import AppNavigator from './routes';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GluestackUIProvider mode={isDarkMode ? 'dark' : 'light'}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default App;
