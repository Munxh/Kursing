import React, {useRef, useState} from 'react';
import {Dimensions, FlatList, View, StyleSheet, Image, Animated} from 'react-native';
import { Card } from './Card';
import {Indicator} from './ScrollIndicator';
import LinearGradient from 'react-native-linear-gradient';

const ITEM_WIDTH = Dimensions.get('window').width * 0.7;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const backdropHeight = Dimensions.get('window').height * 0.6;

const Backdrop = ({ scrollX }) => {
    const images = [
        require('../../assets/sparemaal_baresparer_default_A.jpg'),
        require('../../assets/sparemaal_baresparer_default_B.jpg'),
        require('../../assets/sparemaal_baresparer_default_C.jpg'),
        require('../../assets/sparemaal_baresparer_default_D.jpg'),
    ].reverse();
    return (
        <View style={{ position: 'absolute', top: 0, width: screenWidth, height: screenHeight }}>
            <FlatList
                data={images}
                horizontal
                renderItem={({item, index}) => {
                    const translateX = scrollX.interpolate({
                        inputRange: [(images.length - index - 1) * ITEM_WIDTH, (images.length - index) * ITEM_WIDTH],
                        outputRange: [screenWidth, 0],
                        // i revers:
                        // inputRange: [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH],
                        // outputRange: [0, screenWidth],
                    });
                    return (
                        <Animated.View
                            style={{
                                position: 'absolute',
                                width: translateX,
                                height: screenHeight,
                                overflow: 'hidden',
                            }}
                        >
                            <Image
                                key={item}
                                style={{
                                    width: screenWidth,
                                    height: screenHeight,
                                    position: 'absolute',
                                }}
                                source={item}
                            />
                        </Animated.View>
                    );
                }}
            />
            <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'white']}
                style={{
                    height: backdropHeight,
                    width: screenWidth,
                    position: 'absolute',
                    bottom: 0,
                }}
            />
        </View>
    );
};

export const Sparemaal = () => {
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const cards = [1, 2, 3, 4, 5];

    const renderCards = ({ index, item }) => {
        return <Card width={ITEM_WIDTH}/>;
    };

    return (
        <>
            <View style={styles.container}>
            <Backdrop scrollX={scrollX} />
                <Animated.FlatList
                          data={cards}
                          bounces={false}
                          decelerationRate={0}
                          scrollEventThrottle={16}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{ alignItems: 'center' }}
                          renderItem={renderCards}
                          // onScroll={event => setIndex(Math.round(event.nativeEvent.contentOffset.x / width))}
                           onScroll={Animated.event(
                                   [{nativeEvent: {contentOffset: {x: scrollX}}}],
                                   {useNativeDriver: false},
                               )}
                          snapToInterval={ITEM_WIDTH}
                          snapToAlignment="start"
                />
            </View>
            <View style={styles.indicatorContainer}>
                <Indicator totalAmount={cards.length} selected={index} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    indicatorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
