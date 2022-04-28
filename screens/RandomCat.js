import React, {useEffect, useState} from 'react';
import { View, Button, Text, Image, RefreshControl, ScrollView,ActivityIndicator, StyleSheet } from 'react-native';
import Item from '../components/Item';
const RandomCat = () => {
    const [imageParam, setImageParam] = useState(1);
    // useEffect(() => {
    //     fetch('https://cataas.com/cat')
    //     .then(res => res.json())
    //     .then(res => console.log("cat", res))
    //     .catch(err => {
    //         console.log("error",err)
    //     })
    // },[])

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [type, setType] = React.useState('image');

    const onRefresh = (type) => {
        setType(type)
        setRefreshing(true);
        // wait(2000).then(() => setRefreshing(false));
        setImageParam(imageParam+1);
        setRefreshing(false)
    }

    return(
        <ScrollView
        // contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        >
            <Item type={type} setLoading={setLoading} imageParam={imageParam} loading={loading}/>
        <View style={{flexDirection:'row', justifyContent: 'space-around',margin: 10}}>
            <Button onPress={() => onRefresh('image')} title="Random Image" style={styles.buttonStyle}></Button>
            <Button onPress={() => onRefresh('gif')} title="Random gif" style={styles.buttonStyle}></Button>
        </View>
        </ScrollView>
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
});

export default RandomCat;