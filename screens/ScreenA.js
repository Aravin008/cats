import React, {useEffect, useState} from 'react';
import { View, Text, Image, RefreshControl, ScrollView } from 'react-native';

const ScreenA = () => {
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

    const onRefresh = () => {
        setRefreshing(true);
        // wait(2000).then(() => setRefreshing(false));
        setImageParam(imageParam+1);
        setRefreshing(false)
    }

    console.log(imageParam)
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Screen A</Text>
            <Image source={{uri: 'https://cataas.com/cat?param='+imageParam}} style={{width: 400, height: 400}}/>
        </View>
        </ScrollView>
    )
}

export default ScreenA;