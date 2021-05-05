import React from 'react'
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PropertyItem = ({photo,title,district,city,tole,price,date}) => {

    const navigation = useNavigation();
    return (
        <TouchableOpacity 
        onPress={()=>navigation.navigate('Property Detail', { date: date })} 
        activeOpacity={0.8}>

        <View style={styles.propertyItem}>
            <Image source={{uri: photo!=='' ? photo : null}} style={styles.imgStyle} />

            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.location}>{district}, {city}, {tole}</Text>
                <Text style={styles.price}>Rs {price}</Text>
            </View>
        </View>
        </TouchableOpacity>
    )
}

export default PropertyItem

const styles = StyleSheet.create({
    propertyItem:{
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        paddingRight:5,
        marginVertical:10
    },
    imgStyle:{
        height:130,
        width:130,
        resizeMode:'cover',
        marginRight:15
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        color:'#000',
        marginVertical:8
    },
    location:{
        fontSize:15
    },
    price:{
        color:'#de6262',
        fontSize:18,
        fontWeight:'bold',
        marginVertical:8,
    }
})
