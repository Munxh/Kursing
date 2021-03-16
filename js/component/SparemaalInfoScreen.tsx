import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';


export const SparemaalInfoScreen = ({ navigation }) => {
    const id = navigation.getParam('id');
    const idView = navigation.getParam('idView');
    const idBottomText = navigation.getParam('idBottomText');
    const images = [
        require('../../assets/sparemaal_baresparer_default_A.jpg'),
        require('../../assets/sparemaal_baresparer_default_B.jpg'),
        require('../../assets/sparemaal_baresparer_default_C.jpg'),
        require('../../assets/sparemaal_baresparer_default_D.jpg'),
    ].reverse();

    return (
        <TouchableOpacity onPress={() => navigation.pop()} style={{ width: '100%', height: '100%' }}>
            <Image
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    zIndex: -10,
                }}
                source={images[1]}
            />
            <View style={{
                marginTop: '20%',
            }}>

                <SharedElement id={id}>
                    <Text style={styles.header}>
                        Test
                    </Text>
                </SharedElement>
                <SharedElement id={idBottomText}>
                    <Text style={styles.header}>
                        BottomText
                    </Text>
                </SharedElement>
            </View>
            <SharedElement id={idView}
                           style={{ width: '100%', height: '80%', zIndex: -5, position: 'absolute', bottom: 0 }}>
                <View style={{
                    width: '100%',
                    height: '100%',
                    zIndex: -5,
                    backgroundColor: 'yellow',
                    position: 'absolute',
                }}/>
            </SharedElement>
        </TouchableOpacity>
    );
};

SparemaalInfoScreen.sharedElements = (navigation) => {
    const item = navigation.getParam('id');
    const idBottomText = navigation.getParam('idBottomText');
    const idView = navigation.getParam('idView');
    return [{ id: `${item}`, animation: 'fade' }, { id: `${idBottomText}`, animation: 'fade' }, {
        id: idView,
        animation: 'move',
    }];
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'red',
        marginTop: '20%',
        height: '100%',
    }, header: {
        fontSize: 25,
        alignSelf: 'center',
    },
});
