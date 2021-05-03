import React,{useEffect} from 'react'
import { Image, StyleSheet, Text,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getProfile} from '../store/action/profile';
import {useDispatch,useSelector} from "react-redux";
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';

const CustomDrawerComponent = (props) => {
    const dispatch= useDispatch();
    const profile= useSelector(state=> state.profile.userProfile);

    useEffect(() => {
        dispatch(getProfile());
     }, [])

    return (
        <DrawerContentScrollView {...props}>

           <LinearGradient colors={['#fff','#c6cbef']}>
           <View style={styles.profile}>
                <View style={styles.profileImage}>
                    <Image 
                    style={{height:150,width:150}}
                    source={{uri: profile && profile.photoURL }}
                    resizeMode="cover"
                    />
                </View>
                <Text style={{marginVertical: 10,fontSize:18,fontWeight:'bold',color:'#000'}}>{profile && profile.name}</Text>
            </View>
           </LinearGradient>
          <DrawerItemList {...props} />
         
        </DrawerContentScrollView>
      );
   
}

export default CustomDrawerComponent

const styles = StyleSheet.create({
    profile:{
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding:20,
    },
    profileImage:{
        borderColor:'#aaa',
        borderWidth:1,
        borderRadius:100,
        overflow:"hidden",
    },
})
