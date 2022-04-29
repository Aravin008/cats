import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import {Dropdown} from 'react-native-material-dropdown-v2';

const RenderItem = ({ item }) => {
    return (
    <View style={styles.item}>
        <Image 
            source={{uri: item.url}} 
            style={{width: 400, height: 400}}
        />
        {<ActivityIndicator size="large" color="#00ff00" style={styles.indicator}/>}
    </View>
)};

const HeaderComp = ({list, breed}) => {
    const item = list.filter((item) => item.id == breed);
    let name = '';
    let description = '';
    if(item.length != 0) {
        name = item[0].name;
        description = item[0].description;
    }
    return (
        <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    )
}

const CatImages = () => {
    const scrollRef = React.useRef();
    const [list, setList] = useState([]);
    const [breed, setBreed] = useState("");
    const [imageList, setImageList] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
        // https://api.thecatapi.com/v1/images/search?limit=10&page=0&order=Desc
    useEffect(() => {
        fetchCatBreeds();
    },[])

    const fetchCatBreeds = () => {
        fetch(`https://api.thecatapi.com/v1/breeds`)
        .then(res => res.json())
        .then(res => {
            setList([...res]);
        })
        .catch(err => {
            console.log("error",err)
        })
    }

    const fetchCatImagesByBreed = (breedId) => {
        fetch(`https://api.thecatapi.com/v1/images/search?limit=5&breed_ids=`+breedId)
        .then(res => res.json())
        .then(res => {
            scrollRef.current.scrollTo({ animated: true, y: 0 })
            setImageList([...res]);
            setBreed(breedId)
        })
        .catch(err => {
            console.log("error",err)
        })
    }

    const onRefresh = () => {
        setRefreshing(true);
        // wait(2000).then(() => setRefreshing(false));
        setRefreshing(false)
    }

    return(
        <View >
            <Dropdown
                data={list}
                label={'Breeds'}
                itemCount={8}
                fontSize={16}
                valueExtractor={(item) => item.id}
                labelExtractor={(item) => item.name}
                onChangeText={(value) => fetchCatImagesByBreed(value)}
            />
            <ScrollView
                ref={scrollRef}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <HeaderComp list={list} breed={breed}/>
                {
                    imageList.map(item => {
                        return <RenderItem key={item.id} item={item}/>
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    indicator: {
        justifyContent: 'center',
        position: 'absolute',
        zIndex: -1
    },
    name: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "800",
        margin: 20
    },
    description: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "200",
        margin: 10
    },
    item:{ 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5 
    }
})

export default CatImages;