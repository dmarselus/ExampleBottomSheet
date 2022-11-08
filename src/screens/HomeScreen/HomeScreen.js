import React, {useContext, useEffect, useRef} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import {PrimaryScreenView} from '../../shared/index';

import {BottomSheetContext} from '../../contexts';
import DynamicBottomSheet from '../../components/DynamicBottomsheet';
const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'lightblue',
	},
});

export const HomeScreen = ({navigation}) => {
	const {bottomSheetContext, setBottomSheetContext} = useContext(BottomSheetContext);


	const newBSRef = useRef(null)
	//const onPressShowBs = () => bottomSheetContext.ref.current.snapToIndex(1);

	const onPressShowBs = () => {
		navigation.navigate('BottomSheet');
	};

	const initScreenBs = () => {
		setBottomSheetContext({
			...bottomSheetContext,
			renderContent: () => {
				return (
					<View
						style={{flex: 1, alignItems: 'center', backgroundColor: 'teal'}}>
						<Text>HomeScreen:{bottomSheetContext.title}</Text>
						
					</View>
				);
			},
		});
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			// The screen is focused
			// Call any action
			initScreenBs();
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [navigation]);

	function renderDynamicBottomSheet() {
		return(
			<DynamicBottomSheet ref={newBSRef}>
				<View>
					<Button nativeID="testButton" title='native id here' onPress={()=>console.log('native id here')}/>
				</View>
			</DynamicBottomSheet>
		)
		
	}

	return (
		<PrimaryScreenView style={{backgroundColor: 'steelblue'}}>
			<View style={[styles.contentContainer]}>
				<Text>HomeScreen</Text>
				<Button
					title="Go TestScreen"
					onPress={() => navigation.navigate('TestScreen')}
				/>
				<Button title="Show New BottomSheet" onPress={()=>newBSRef.current.snapToIndex(0)} />
			</View>
			{renderDynamicBottomSheet()}
		</PrimaryScreenView>
	);
};

// export const BottomSheet = ({navigation}) => {
// 	return (
// 		<PrimaryScreenView style={{backgroundColor: 'steelblue'}}>
// 			<View style={[styles.contentContainer]}>
// 				<Text>BottomSheet</Text>
// 				<Button onPress={() => navigation.goBack()} title="Dismiss" />
// 				<Button
// 					title="Track Button"
// 					onPress={() => console.log("Track")}
// 				/>
// 			</View>
// 		</PrimaryScreenView>
// 	);
// }


