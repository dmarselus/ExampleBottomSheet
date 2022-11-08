import React from 'react';
import {View, Text} from 'react-native';


import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { TestScreen }  from '../screens/'


const Stack = createNativeStackNavigator();

const AppStack = () => {
	return (
		
		<Stack.Navigator screenOptions={{headerShown: false, presentation: 'modal'}} initialRouteName="HomeScreen" >
			<Stack.Screen name="HomeScreen" component={HomeScreen} />
			{/* <Stack.Screen name="BottomSheet" component={BottomSheet} /> */}
			<Stack.Screen name="TestScreen" component={TestScreen} />

			
		</Stack.Navigator>
	);
};

export default AppStack;


