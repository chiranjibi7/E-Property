import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Advertise = () => {

    const {navigate}= useNavigation();
    return (
        <View style={styles.advertise}>
            <View style={{flex:0.5}}>
                <Text style={styles.title}>Advertise Your Property</Text>
                <Text style={styles.subtitle}>Take the benefit from one of the largest realestate platform to sell or rent your property</Text>
                <Button 
                style={{backgroundColor:'#de6464'}}
                onPress={()=>navigate('Add Property')}  >
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:17}}>Add Property</Text>
                </Button>
            </View>
            <Image source={{uri:'https://image.freepik.com/free-vector/promotion-cartoon-man-standing-with-loudspeaker-advertisement-commercial-propaganda-journalist-flat-character-white-background_335657-2077.jpg'}}
            style={styles.image} />
        </View>
    )
}

export default Advertise

const styles = StyleSheet.create({
    advertise:{
        padding:10,
        marginVertical:30,
        width:'100%',
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center'
    },
    title:{
        fontSize:25,
        fontWeight:'bold'
    },
    subtitle:{
        fontSize:19,
        marginVertical:20,
        lineHeight:25
    },
    image:{
        flex:0.5,
        height:250,
        resizeMode:"cover"
    }
 
})
