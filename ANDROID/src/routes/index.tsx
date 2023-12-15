import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import Home from '../screens/Home/Home';
import Room from '../screens/Room/Room';
import Game from '../screens/Game/Game';
import Result from '../screens/Result/Result';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Room" component={Room} />
      <Stack.Screen
        name="Game"
        component={Game}
        initialParams={{currentQuestion: 0}}
      />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}
