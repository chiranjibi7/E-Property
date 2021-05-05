import React from 'react'
import { StyleSheet,FlatList } from 'react-native'
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import PropertyItem from '../Properties/PropertyItem';

const MyProperties = () => {

    const navigation= useNavigation();
    const myUserId= useSelector(state=> state.authenticate.loginAuth.userId);
    const MYPROPERTIES= useSelector(state => state.property.properties.filter(property=> property.userId===myUserId));

    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: <Icon name="md-menu" size={40} color="#fff" onPress={()=>navigation.toggleDrawer()}/>,
            headerStyle:{
                backgroundColor:"#de6262"
            },
            headerTitleAlign:'left'});
    });

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
        style={styles.myPropertiesScreen}
         showsVerticalScrollIndicator={false}
         data={MYPROPERTIES}
         renderItem={renderItem}
         keyExtractor={item=>item.date}
        />
    )
}

export default MyProperties

const styles = StyleSheet.create({
    myPropertiesScreen:{
        flex:1,
        paddingHorizontal:10,
        backgroundColor:'#eee'
    }
})
