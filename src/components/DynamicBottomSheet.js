import React, { useCallback, useMemo, useRef, useContext, forwardRef } from 'react';

import { Text, Keyboard, StyleSheet } from 'react-native';

import BottomSheet, { useBottomSheet, BottomSheetBackdrop, useBottomSheetDynamicSnapPoints, BottomSheetView } from '@gorhom/bottom-sheet';


// import { getShadow } from '../../functions';

const styles = StyleSheet.create({
    // shadows: { ...getShadow() },
});

const DynamicBottomSheet = forwardRef(({ children, rest }, ref) => {

    const snapPoints = useMemo(() => ['20%', '40%', '65%', '80%', '100%'], []);

    const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props}
        disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />, []);

    const handleSheetChanges = useCallback((index) => {
        console.log(index)
    }, []);

    return (
        <BottomSheet
            // style={[styles.shadows]}
            topInset={50}
            ref={ref}
            index={-1}
            enablePanDownToClose
            backdropComponent={renderBackdrop}
            onChange={handleSheetChanges}
            snapPoints={snapPoints}

            {...rest}
        >
            <BottomSheetView nativeID={"bottomSheet"}>
                {children}
            </BottomSheetView>
        </BottomSheet>
    );
})

export default DynamicBottomSheet;
