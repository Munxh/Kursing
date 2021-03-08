import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';


export const Card = () => {

    const width = Dimensions.get('window').width * 0.5;

    return (
        <View style={[styles.card, { width, height: width + 200 }]}>
            <Text>
                Test
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'red',
        margin: 10
    }
});
