import React, { useEffect, useState } from 'react'
import {
    View,
    Image,
    FlatList,
    TouchableHighlight,
    Dimensions,
} from 'react-native';


export default function PictureList(props) {

    const [list, setList] = useState([]);
    const keyExtractor = item => item.id;

    function onClick() {

    }

    useEffect(() => {
        if (props.list) {
            setList(props.list)
            console.log(props.list)
        } else {
            console.log('lista passada para o comp PictureList VAZIA')
        }

    }, [props.list])

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                numColumns={3}
                data={list || []}
                keyExtractor={keyExtractor}
                renderItem={({ item }) => <PictureListItem onClick={props.onClick} item={item} />}
            />
        </View>
    );
}


function PictureListItem(props) {
    const { item } = props
    const { width } = Dimensions.get('window'); //windows retorna objeto que terá width e heigth, como queremos só a largura, pegamos o width

    return (
        <TouchableHighlight onPress={() => { props.onClick(item) }}>
            <Image
                source={{ uri: item.url }}
                style={{
                    width: width / 3 - 8,
                    height: width / 3 - 8,
                    margin: 2
                }}
            />

        </TouchableHighlight>
    );
}