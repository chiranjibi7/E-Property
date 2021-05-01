import React,{useEffect, useState, useCallback} from 'react'
import { StyleSheet, FlatList, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {getProperty} from '../../store/action/property';
import {useSelector} from 'react-redux';
import PropertyItem from './PropertyItem';

export default function Properties(){

     const dispatch = useDispatch()
     const PROPERTIES= useSelector(state => state.property.properties);
     const [refreshing, setRefreshing] = useState(false);

    const navigation= useNavigation();
    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: <Icon name="md-menu" size={40} color="#fff" onPress={()=>navigation.toggleDrawer()}/>,
            headerStyle:{
                backgroundColor:"#de6262"
            },
            headerTitleAlign:'left'});
    });

    useEffect(() => {
       dispatch(getProperty());   
    }, []);

  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    await dispatch(getProperty());
    await setRefreshing(false);
  }, []);

    const renderItem=({item})=>{
        return <PropertyItem  
        photo={item.photoURL}
        title={item.title}
        district={item.district}
        city={item.city}
        tole={item.tole}
        price={item.price}
        date={item.date}
        /> 
    };

    return (

       <FlatList
       style={styles.propertiesScreen}
       refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
        showsVerticalScrollIndicator={false}
        data={PROPERTIES}
        renderItem={renderItem}
        keyExtractor={item=>item.date}
       />
    )
};

const styles= StyleSheet.create({
    propertiesScreen:{
        flex:1,
        paddingHorizontal:10,
        paddingTop:20,
        backgroundColor:'#eee'
    }
});
