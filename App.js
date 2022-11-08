/*
FILENAME:     App.js
PURPOSE:      App entry point
AUTHOR:       Eric Phung
CREATED:      06/24/2022 07:33 PM
*/
import React, {useState, useRef, useMemo, useCallback} from 'react';

import {StyleSheet, View, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler'; // gorhom bs
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {PrimaryBottomSheet} from './src/shared';

import {NavigationContainer} from '@react-navigation/native';

import {BottomSheetContext} from './src/contexts';

import {AppStack} from './src/navigators';

import {withPendoRN, PendoSDK, NavigationLibraryType} from "rn-pendo-sdk";

const navigationOptions = { 'library': NavigationLibraryType.ReactNavigation };
const key = "YOUR KEY";

//note the following API will only setup initial configuration, to start collect analytics use start session
PendoSDK.setup(key,navigationOptions,null);
PendoSDK.startSession("v1","v2");

const App = (props) => {
	const snapPoints = useMemo(() => ['20%', '40%', '88%'], [])
	// state
	const [bottomSheetContext, setBottomSheetContext] = useState({
		title: 'Awesome 🎉',
		snapPoints,
		index: -1,
		ref: useRef(null),
		handleSheetChanges: (index: number) => {
			// console.log('handleSheetChanges', index);
		},
		renderContent: () => (
			<View
				style={[
					styles.contentContainer,
					{
						paddingTop: 10,
						alignItems: 'center',
						backgroundColor: 'teal',
					},
				]}>
				<Text>{bottomSheetContext.title}</Text>
			</View>
		),
		handleComponent: () => {
			return (
				<View
					style={{
						borderTopRightRadius: 10,
						borderTopLeftRadius: 10,
						// backgroundColor: 'red',
						height: 30,
					}}
				/>
			);
		},
		enablePanDownToClose: true,
	});

	const getStackNavigator = () => {
		return <AppStack />;
	};
	const navigationRef = useRef();
	return (
		<BottomSheetContext.Provider
			value={{bottomSheetContext, setBottomSheetContext}}>
			<SafeAreaProvider>
				<NavigationContainer
				ref={navigationRef}
				 onStateChange={()=> {
      						const state = navigationRef.current.getRootState()
      						props.onStateChange(state);
    			}}>
					<GestureHandlerRootView style={styles.container}>
						{getStackNavigator()}
						<PrimaryBottomSheet />
					</GestureHandlerRootView>
				</NavigationContainer>
			</SafeAreaProvider>
		</BottomSheetContext.Provider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
	},
});

export default withPendoRN(App,{nativeIDs:[
"testButton",
]});