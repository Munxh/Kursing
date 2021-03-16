import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';


export const SparemaalInfoScreen = ({ navigation }) => {
    const id = navigation.getParam('id');
    return (
        <TouchableOpacity onPress={() => navigation.pop()}>
            <View style={styles.card}>
                <SharedElement id={id}>
                    <Text style={styles.header}>
                        Test
                    </Text>
                </SharedElement>
            </View>
        </TouchableOpacity>
    );
};

SparemaalInfoScreen.sharedElements = (navigation) => {
    const item = navigation.getParam('id');
    return [{ id: `${item}`, animation: 'fade' }];
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'red',
        marginTop: '20%',
        height: '100%',
        zIndex: -10,
    }, header: {
        fontSize: 25,
        alignSelf: 'center',
    },
});
