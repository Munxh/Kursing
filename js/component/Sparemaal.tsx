import React, { useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Indicator } from './ScrollIndicator';
import { SharedElement } from 'react-navigation-shared-element';
import { SparemaalInfoScreen } from './SparemaalInfoScreen';

const ITEM_WIDTH = Dimensions.get('window').width * 0.7;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const backdropHeight = Dimensions.get('window').height * 0.6;
const spacerWidth = (screenWidth - ITEM_WIDTH) / 2;

const Backdrop = ({ scrollX }) => {
    const images = [
        require('../../assets/sparemaal_baresparer_default_A.jpg'),
        require('../../assets/sparemaal_baresparer_default_B.jpg'),
        require('../../assets/sparemaal_baresparer_default_C.jpg'),
        require('../../assets/sparemaal_baresparer_default_D.jpg'),
        require('../../assets/sparemaal_baresparer_default_A.jpg'),
    ].reverse();
    return (
        <View style={{ position: 'absolute', width: screenWidth, height: screenHeight }}>
            <FlatList
                data={images}
                horizontal
                renderItem={({ item, index }) => {
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
        </View>
    );
};

export const Sparemaal = ({ navigation }) => {
        const [index, setIndex] = useState(0);
        const scrollX = useRef(new Animated.Value(0)).current;

        const cards = [{ key: 'left-spacer' }, 1, 2, 3, 4, 5, { key: 'right-spacer' }];
        const indexChange = (e) => {
            setIndex(Math.round((e.nativeEvent.contentOffset.x)/ ITEM_WIDTH));
        };
        const renderCards = ({ index, item }) => {
            if (index === 0 || index === cards.length-1) {
                return (<View style={{width: spacerWidth, backgroundColor: 'red'}}/>);
            }
            return (
                <TouchableOpacity onPress={() => navigation.navigate('SparemaalInfoScreen', {
                    id: index.toString(), idBottomText: `${index}-bottomText`,
                    idView: `${index}-view`, idImage: `${index}-image`, index: index,
                })} style={{ width: ITEM_WIDTH}}>
                    <View style={[styles.card]}>
                        <SharedElement id={index.toString()} style={{ zIndex: 10 }}>
                            <Text style={styles.header}>
                                Test
                            </Text>
                        </SharedElement>
                        <SharedElement id={`${index}-bottomText`}>
                            <Text style={styles.header}>
                                BottomText
                            </Text>
                        </SharedElement>
                        <SharedElement id={`${index}-view`}
                                       style={{ width: '100%', height: '100%', zIndex: -15, position: 'absolute' }}>
                            <View style={{
                                width: '100%',
                                height: '100%',
                                zIndex: -5,
                                padding: 20,
                                backgroundColor: 'white',
                                position: 'absolute',
                                borderRadius: 10,
                            }}/>
                        </SharedElement>
                    </View>
                </TouchableOpacity>);
        };

        return (
            <>
                <View style={styles.container}>
                    <Backdrop scrollX={scrollX}/>
                    <Animated.FlatList
                        data={cards}
                        bounces={false}
                        decelerationRate={0}
                        scrollEventThrottle={16}
                        horizontal
                        style={{ marginTop: '70%'}}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ alignItems: 'center' }}
                        renderItem={renderCards}
                        onScroll={
                            Animated.event(
                                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                { useNativeDriver: false,
                                    listener: event => indexChange(event)},
                            )
                        }
                        snapToInterval={ITEM_WIDTH}
                        snapToAlignment="start"
                    />
                </View>
                <View style={styles.indicatorContainer}>
                    <Indicator totalAmount={cards.length-2} selected={index}/>
                </View>
                <View style={{ position: 'absolute', backgroundColor: 'white', bottom: 0, height: 80, width: screenWidth}}/>
            </>
        );
    }
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    indicatorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 20,
        height: ITEM_WIDTH,
    },
    header: {
        fontSize: 25,
        zIndex: 15,
        alignSelf: 'center',
    },
});
