import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';


export const Card = ({ width, index, cardAmount }) => {

    return (
        <View style={[styles.card, { width, height: width }]}>
            <Text style={styles.header}>
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
    },
    header: {
        fontSize: 25,
        alignSelf: 'center',
    },
});
