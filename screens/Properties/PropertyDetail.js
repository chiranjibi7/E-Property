import React,{useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import {useSelector} from 'react-redux';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneIcon from 'react-native-vector-icons/FontAwesome5';
import call from 'react-native-phone-call';
import {useRoute,useNavigation} from '@react-navigation/native';

const PropertyDetail = () => {

    const route = useRoute();
    const navigation =useNavigation();

    const selectedProperty= useSelector(state => state.property.properties.find(property=> property.date===route.params.date));

    const {
        photoURL,
        propertyType,
        title,
        district,
        city,
        tole
        ,price,
        area,
        areaUnit,
        floors,
        rooms,
        direction,
        name,
        email,
        phone
    } = selectedProperty;

    const makePhoneCall=()=>{
        const phoneNumber={
            number: phone,
            prompt: false
        };
        call(phoneNumber).catch(err=>console.log(err));
    }

    return (
        <ScrollView style={styles.propertyDetailScreen} showsVerticalScrollIndicator={false}>
            <Image source={{uri: photoURL}} 
                style={styles.imgStyle}  />

           <View style={{paddingHorizontal:10}}>
                <View style={styles.propertyType}>
                        <Text style={{fontWeight:'bold',color:'blue',fontSize:17}}>{propertyType}</Text>
                </View>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.location}>{district}, {city}, {tole}</Text>
                    <Text style={styles.price}>Rs {price}</Text>
                </View>

                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                    <Icon style={{marginBottom:8}} name='vector-square' size={40} color='#000' />
                        <Text style={styles.infoText}>{area} {areaUnit}</Text>
                    </View>
                    <View style={styles.card}>
                        <IconM style={{marginBottom:8}} name="directions" size={40} color="#000"/>
                        <Text style={styles.infoText}>{direction} Facing</Text>
                    </View>

                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                    <Icon style={{marginBottom:8}} name='floor-plan' size={40} color='#000' />
                        <Text style={styles.infoText}>{floors} Floors</Text>
                    </View>
                    <View style={styles.card}>
                    <IconM style={{marginBottom:8}} name="meeting-room" size={40} color="#000"/>
                        <Text style={styles.infoText}>{rooms} Rooms</Text>
                    </View>
                </View>
                <View style={styles.locationContainer}>
                        <Text style={styles.infoTitle}>Address</Text>
                        <View style={styles.moreInfo}>
                            <Text style={{fontSize:18, marginRight:20}}>District :</Text>
                            <Text style={{fontSize:18}}>{district}</Text>
                        </View>
                        <View style={styles.moreInfo}>
                            <Text style={{fontSize:18, marginRight:20}}>City :</Text>
                            <Text style={{fontSize:18}}>{city}</Text>
                        </View>
                        <View style={styles.moreInfo}>
                            <Text style={{fontSize:18, marginRight:20}}>Tole :</Text>
                            <Text style={{fontSize:18}}>{tole}</Text>
                        </View>
                    </View>

                    <View style={styles.contactContainer}>
                        <Text style={styles.infoTitle}>Contact</Text>
                        <View style={styles.moreInfo}>
                            <Text style={{fontSize:18, marginRight:20}}>Name :</Text>
                            <Text style={{fontSize:18}}>{name}</Text>
                        </View>
                        <View style={styles.moreInfo}>
                            <Text style={{fontSize:18, marginRight:20}}>E-mail :</Text>
                            <Text style={{fontSize:18}}>{email}</Text>
                        </View>
                        <View style={styles.moreInfo}>
                                <Text style={{fontSize:18, marginRight:20}}>Phone :</Text>
                                <Text style={{fontSize:18}}>{phone}</Text>
                        </View>
                    </View>
                   <View style={styles.phoneCall}>
                       <Text onPress={()=>navigation.navigate('Map',{lat: selectedProperty.lat, long: selectedProperty.long})} style={{fontSize:20,color:"#de6262",fontWeight:'bold'}}>See Map</Text>
                   <PhoneIcon 
                            name="phone-square" 
                            size={50} 
                            color="#de6262"
                            onPress={makePhoneCall}
                            />
                   </View>
           </View>
        </ScrollView>
    )
}

export default PropertyDetail

const styles = StyleSheet.create({
    propertyDetailScreen:{
        flex:1,
        backgroundColor:'#fff'
    },
    imgStyle:{
        height:250, 
        width:'100%',
        resizeMode:'cover'
    },
    propertyType:{
        paddingHorizontal:20, 
        paddingVertical:8,
        backgroundColor:'#c6cbef',
        marginVertical:15,
        justifyContent:'center',
        alignItems:'center',
        width:'40%'
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'#000',
    },
    location:{
        fontSize:18,
        marginVertical:8,
    },
    price:{
        color:'#de6262',
        fontSize:24,
        fontWeight:'bold',       
    },
    cardContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        // marginBottom:20,
        padding:20
    },
    card:{
        flexDirection:'column',
        backgroundColor:'#c6cbef',
        height:100,
        width:150,
        justifyContent:'center',
        alignItems:'center'
    },
    infoText:{
        fontSize:18
    },
    locationContainer:{
        paddingHorizontal:10,
        marginBottom:20
    },  
    moreInfo:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:7
    },
    contactContainer:{
        paddingHorizontal:10,
        marginBottom:10
    }, 
    infoTitle:{
        fontSize:24,
        fontWeight:'bold',
        marginTop:10,
        backgroundColor:'#eee',
        padding:5
    },
    phoneCall:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20,
        padding:20
    }
})
