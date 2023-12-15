import {NavigationContainer} from '@react-navigation/native';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Routes from './src/routes';
import {Provider} from 'react-redux';
import store from './src/stores/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  GoogleSignin.configure({
    webClientId:
      '663703715627-pv5ft5oe1p0o9eevbna6ucoat47k5485.apps.googleusercontent.com',
  });
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </GluestackUIProvider>
      </QueryClientProvider>
    </Provider>
  );
}
