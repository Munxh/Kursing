import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export const Card = ({ width }) => {

    return (
        <View style={[styles.card, { width, height: width }]}>
            <Text>
                Test
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
    }
});
