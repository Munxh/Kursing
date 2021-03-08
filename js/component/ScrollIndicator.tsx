import React from 'react';
import {StyleSheet, View} from 'react-native';

const generateView = (totalAmount: number, selected: number): JSX.Element[] => Array.from(Array(totalAmount), (x, i) => (
    <View key={Math.random()} style={[styles.buttonStyle, selected === i ? styles.dotSelected : styles.dotDefault]} />
));

export const Indicator = ({ totalAmount, selected }) => (
    <View style={styles.dotWrapperStyle}>
        {generateView(totalAmount, selected)}
    </View>
)

const styles = StyleSheet.create({
    dotWrapperStyle: {
        position: 'absolute',
        zIndex: 10,
        width: '65%',
        flex: 1,
        flexDirection: 'row',
        bottom: 180,
        justifyContent: 'center',
    },
    buttonStyle: {
        zIndex: 10,
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        position: 'relative',
        bottom: 10,
        marginHorizontal: 10,
    },
    dotDefault: { backgroundColor: 'white' },
    dotSelected: { borderWidth: 2, borderColor: 'black' },
})
