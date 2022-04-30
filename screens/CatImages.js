import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FlatList, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

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


const CatImages = ({ type }) => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);
        // https://api.thecatapi.com/v1/images/search?limit=10&page=0&order=Desc
    useEffect(() => {
        fetchCatImages();
    },[])

    const fetchCatImages = () => {
        console.log("type", type)
        fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&order=Desc&mime_types=${type}`)
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

const FirstRoute = () => (
    <CatImages type={'jpg,png'} style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
    <CatImages type={"gif"} style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
    images: FirstRoute,
    gif: SecondRoute,
});

export default function TabViewExample() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'images', title: 'Images' },
        { key: 'gif', title: 'Gifs' },
    ]);

    return (
        <TabView
            lazy
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={{ backgroundColor: 'black' }}
            renderTabBar={props => <TabBar {...props} indicatorStyle={styles.indicator} style={styles.tabbar} />}
            />
    );
}

const styles = StyleSheet.create({
    indicator: {
        justifyContent: 'center',
        position: 'absolute',
        zIndex: -1
    },
    tabbar: {
        backgroundColor: 'black',
    }
})