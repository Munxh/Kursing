import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';


export const SparemaalInfoScreen = ({ navigation }) => {
    const id = navigation.getParam('id');
    const idView = navigation.getParam('idView');
    const idBottomText = navigation.getParam('idBottomText');
    const idImage = navigation.getParam('idImage');
    const index = navigation.getParam('index');
    const mountedAnimated = useRef(new Animated.Value(0)).current;
    const images = [
        require('../../assets/sparemaal_baresparer_default_A.jpg'),
        require('../../assets/sparemaal_baresparer_default_B.jpg'),
        require('../../assets/sparemaal_baresparer_default_C.jpg'),
        require('../../assets/sparemaal_baresparer_default_D.jpg'),
        require('../../assets/sparemaal_baresparer_default_A.jpg'),
    ].reverse();

    const animation = (toValue, delay) => (
        Animated.timing(mountedAnimated, {
            toValue,
            duration: 500,
            delay,
            useNativeDriver: true,
        }));

    useEffect(() => {
        animation(1, 800).start();
    });

    return (
        <TouchableOpacity onPress={() => navigation.pop()} style={{ width: '100%', height: '100%' }}>
            <Image
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    zIndex: -10,
                }}
                source={images[images.length - index]}
            />
            <View style={{
                marginTop: '60%',
            }}>

                <SharedElement id={id} style={{ zIndex: 10 }}>
                    <Text style={styles.header}>
                        Test
                    </Text>
                </SharedElement>
                <SharedElement id={idBottomText} style={{ zIndex: 10 }}>
                    <Text style={styles.header}>
                        BottomText
                    </Text>
                </SharedElement>
                <Animated.View style={{ opacity: mountedAnimated}}>
                    <Text style={styles.text}>
                        This is some more text that should ease in
                    </Text>
                    <Text style={styles.text}>
                        moreText
                    </Text>
                    <Text style={styles.text}>
                        moreText
                    </Text>
                </Animated.View>
            </View>
            <SharedElement id={idView}
                           style={{ width: '100%', height: '80%', zIndex: -5, position: 'absolute', bottom: 0 }}>
                <View style={{
                    width: '100%',
                    height: '100%',
                    zIndex: -15,
                    borderRadius: 25,
                    backgroundColor: 'white',
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
    const idImage = navigation.getParam('idImage');
    return [{ id: idView, animation: 'fade' }, {
        id: item,
        animation: 'move',
    }, {
        id: idBottomText,
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
        zIndex: 15,
        alignSelf: 'center',
    },
    text: {
        fontSize: 20,
        marginTop: 20,
        zIndex: 15,
        alignSelf: 'center',
    },
});
