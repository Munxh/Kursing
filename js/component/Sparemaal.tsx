import React from 'react';
import { FlatList, View } from 'react-native';
import { Card } from './Card';


export const Sparemaal = () => {

    const cards = [1, 2, 3, 4, 5];

    const renderCards = ({ index, item }) => {
        return <Card/>;
    };

    return (
        <View style={{ marginTop: '60%' }}>
            <FlatList style={{}}
                      data={cards}
                      bounces={false}
                      decelerationRate={0}
                      scrollEventThrottle={16}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={renderCards}
            />
        </View>
    );
};
