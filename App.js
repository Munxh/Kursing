/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Sparemaal} from './js/component/Sparemaal';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {createAppContainer} from 'react-navigation';
import {SparemaalInfoScreen} from './js/component/SparemaalInfoScreen';

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


export default App;
