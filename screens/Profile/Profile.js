import React,{useEffect} from 'react'
import { StyleSheet, Text, View,Image,RefreshControl, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import EditIcon from 'react-native-vector-icons/FontAwesome';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import PhoneIcon from 'react-native-vector-icons/FontAwesome';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getProfile} from '../../store/action/profile';

const Profile = () => {

    const userPhoto='https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png';
    const navigation= useNavigation();
    const dispatch = useDispatch();

    const profile= useSelector(state=>state.profile.userProfile);

    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: <Icon name="md-menu" size={40} color="#fff" onPress={()=>navigation.toggleDrawer()}/>,
            headerStyle:{
                backgroundColor:"#de6262"
            },
            headerTitleAlign:'left'});
    });

    useEffect(() => {
       dispatch(getProfile());
    }, []);

    return (
        <View style={styles.profile}>
            <View style={styles.iconContainer}>
                <EditIcon name='edit' size={40} color="#de6262" onPress={()=>navigation.navigate('Edit Profile')} />
            </View>
            <View style={styles.profileInfo}>
                <View style={styles.image}>
                    <Image 
                    source={{uri: profile && profile.photoURL}} 
                    height={150} width={150} style={{resizeMode:'cover'}} />
                </View>
                <View style={styles.profileTop}>
                    <View style={styles.profileTopInfo}>
                    <UserIcon name="user" size={30} color="black" />
                        <Text style={{fontSize:16,position:'absolute',left:120,fontWeight:'bold'}}>{profile && profile.name}</Text>
                    </View>
                    <View style={{...styles.profileTopInfo,marginVertical:5}}>
                    <EmailIcon name="email" size={30} color="black" />
                        <Text style={{fontSize:16,position:'absolute',left:120,fontWeight:'bold'}}>{profile && profile.email}</Text>
                    </View>
                    <View style={styles.profileTopInfo}>
                        <PhoneIcon name="phone" size={30} color="black" />
                        <Text style={{fontSize:16,position:'absolute',left:120,fontWeight:'bold'}}>{profile && profile.phone}</Text>
                    </View>
                    
                    
                </View>
                <View style={styles.profileBottom}>
                    <Text style={{backgroundColor:'#ddd',fontSize:20,fontWeight:'bold',padding:8,marginBottom:10}}>Address</Text>
                    <View style={styles.profileTopInfo}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>Country: </Text>
                        <Text style={{fontSize:16,position:'absolute',left:120,fontWeight:'bold'}}>{profile && profile.country}</Text>
                    </View>
                    <View style={styles.profileTopInfo}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>State: </Text>
                        <Text style={{fontSize:16, marginVertical:5,position:'absolute',left:120,fontWeight:'bold'}}>{profile && profile.state}</Text>
                    </View>
                    <View style={styles.profileTopInfo}>
                        <Text  style={{fontSize:18,fontWeight:'bold'}}>City: </Text>
                        <Text style={{fontSize:16,position:'absolute',left:120,fontWeight:'bold'}}>{profile && profile.city}</Text>
                    </View>
                    <View style={styles.profileTopInfo}>
                        <Text  style={{fontSize:18,fontWeight:'bold'}}>Tole: </Text>
                        <Text style={{fontSize:16, marginVertical:5,position:'absolute',left:120,fontWeight:'bold'}}>{profile && profile.tole}</Text>
                    </View>
                
                </View>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    profile:{
        flex:1,
        backgroundColor:'#c6cbef',
    },
    iconContainer:{
        padding:20,
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end',
        marginBottom:60
    },
    profileInfo:{
        width:'100%',
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        backgroundColor:'#fff',
        flex:1
    },
    image:{
        height:150,
        width:150,
        borderWidth:1,
        borderRadius:100,
        overflow:'hidden',
        position:'absolute',
        top:'-16%',
        left:'33%',
        backgroundColor:'#c6cbef'
    },
    profileTop:{
        marginTop:120,
        paddingHorizontal:20
    },
    profileTopInfo:{
        width:'60%',
        flexDirection:'row',
        alignItems:'center'
    },
    profileBottom:{
        marginTop:20,
        paddingHorizontal:20
    }
})
