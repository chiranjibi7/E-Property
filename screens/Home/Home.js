import React,{useLayoutEffect, useEffect} from 'react'
import { StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import Categories from './Categories/Categories';
import CarouselProperties from './CarouselProperties';
import Advertise from './Advertise';
import {getProperty} from '../../store/action/property';
import {getProfile} from '../../store/action/profile';


const Home = () => {
    const navigation= useNavigation();
    const dispatch = useDispatch();
   
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: <Icon name="md-menu" size={40} color="#fff" onPress={()=>navigation.toggleDrawer()}/>,
            headerStyle:{
                backgroundColor:"#de6262"
            },
            headerTitleAlign:'left'});
    });

    useEffect(() => {
        dispatch(getProperty());  
        dispatch(getProfile());   
     }, []);

    //  useEffect(() => {
    //     dispatch(getProfile());   
    //  }, []);
   
    return (
        <ScrollView style={styles.home} showsVerticalScrollIndicator={false}>
           <Categories/>
            <CarouselProperties />
            <Advertise/>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    home:{
        flex:1,
        paddingLeft:10,
        backgroundColor:'#eee'
    }, 
})
