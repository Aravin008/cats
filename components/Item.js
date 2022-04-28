import React, {useEffect, useState} from 'react';
import { View, Button, Text, Image, RefreshControl, ScrollView,ActivityIndicator, StyleSheet } from 'react-native';

const Item = ({type, setLoading, imageParam, loading }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text>Screen A</Text> */}
        <Image 
            source={{uri: type == 'image' ? 'https://cataas.com/cat?param='+imageParam : 'https://cataas.com/cat/gif?param='+imageParam}} 
            style={{width: 400, height: 400}}
            onLoadStart={() => setLoading( true)}
            onLoadEnd={() => {
                setLoading( false)
            }}
        />
        {loading && <ActivityIndicator size="large" color="#00ff00" style={styles.indicator}/>}
    </View>
    )
}


const styles = StyleSheet.create({
    indicator: {
        justifyContent: 'center',
        position: 'absolute'
    },
    buttonStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'solid',
        backgroundColor: 'gray',
        padding: 4
    }
})

export default Item;