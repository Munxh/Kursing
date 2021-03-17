/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Sparemaal} from './js/component/Sparemaal';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {createAppContainer} from 'react-navigation';
import {SparemaalInfoScreen} from './js/component/SparemaalInfoScreen';
import {transitionConfig} from './js/transitionConfig';

const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

const stackNavigator = createSharedElementStackNavigator(
    {
        Sparemaal: {
            screen: Sparemaal,
        },
        SparemaalInfoScreen: {
            screen: SparemaalInfoScreen,
            navigationOptions: () => {
                return {
                    transitionSpec: {
                        open: { animation: 'timing', config: {duration: 800}},
                        close: { animation: 'timing', config: {duration: 800}},
                    },
                    cardStyleInterpolator: forFade
                };
            },
        },
    },
    {
        initialRouteName: 'Sparemaal',
        headerMode: 'none',
    },
);

const AppContainer = createAppContainer(stackNavigator);

const App: () => React$Node = () => {

    return (
        <AppContainer/>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
