import React, {useEffect} from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {LOG_IN, loggedIn} from '../../store/action/auth';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        const timer=setTimeout(()=>{
            const tryLoginUser= async ()=>{
                try {
                 const userData= await AsyncStorage.getItem('userData');
                if(!userData){
                    dispatch(loggedIn());
                    return;
                } 
                const transformedUserData= JSON.parse(userData);
                const {token, userId, expiryDate} = transformedUserData;
                const expirationDate= new Date(expiryDate);
                if(expirationDate <= new Date() || !token || !userId){
                    dispatch(loggedIn());
                    return;
                }
                    dispatch({type: LOG_IN, token: token, userId: userId});
      
                } catch (error) {
                    console.log(error);
                }
            };
            tryLoginUser();
        },4000);
        return ()=>{
            clearTimeout(timer)
        }     
    },[]);

    return (
    <View style={styles.gradient}>
        <LottieView source={require('../../assets/splash.json')} autoPlay loop />
     </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    gradient:{
        backgroundColor:'#fff',
        width:'100%',
        flex:1,
        justifyContent: "center",
        alignItems: "center",
      }
})
