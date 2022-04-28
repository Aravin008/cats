import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FlatList, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';

const renderItem = ({ item }) => {
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
        {/* <Text>Screen A</Text> */}
        <Image 
            source={{uri: item.url}} 
            style={{width: 400, height: 400}}
            // onLoadStart={() => setLoading( true)}
            // onLoadEnd={() => {
            //     setLoading( false)
            // }}
        />
        {<ActivityIndicator size="large" color="#00ff00" style={styles.indicator}/>}
    </View>
)};


const CatImages = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);
        // https://api.thecatapi.com/v1/images/search?limit=10&page=0&order=Desc
    useEffect(() => {
        fetchCatImages();
    },[])

    const fetchCatImages = () => {
        fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&order=Desc`)
        .then(res => res.json())
        .then(res => {
            setList([...list, ...res]);
            setPage(page+1)
        })
        .catch(err => {
            console.log("error",err)
        })
    }

    return(
        <View>
            {/* <Text>CatImages</Text> */}
            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onEndReached={fetchCatImages}
                onEndReachedThreshold={1}
            ></FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    indicator: {
        justifyContent: 'center',
        position: 'absolute',
        zIndex: -1
    }
})

export default CatImages;