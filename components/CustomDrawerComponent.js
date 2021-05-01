import React from 'react'
import { Image, StyleSheet, Text,View} from 'react-native'
import {useSelector} from "react-redux";
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';

const userPhoto='https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png';

const CustomDrawerComponent = (props) => {

    const profile= useSelector(state=> state.profile.userProfile);

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.profile}>
                <View style={styles.profileImage}>
                    <Image 
                    style={{height:120,width:120}}
                    source={{uri: profile && profile.photoURL }}
                    resizeMode="cover"
                    />
                </View>
                <Text style={{marginVertical: 10,fontSize:18,fontWeight:'bold',color:'#000'}}>{profile && profile.name}</Text>
            </View>
          <DrawerItemList {...props} />
         
        </DrawerContentScrollView>
      );
   
}

export default CustomDrawerComponent

const styles = StyleSheet.create({
    profile:{
        width:'100%',
        backgroundColor:'#c6cbef',
        justifyContent: 'center',
        alignItems: 'center',
        padding:20
    },
    profileImage:{
        borderColor:'#de6262',
        borderWidth:1,
        borderRadius:100,
        overflow:"hidden",
    },
})
