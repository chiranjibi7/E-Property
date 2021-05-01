import React from 'react'
import { StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import PropertyItem from '../../Properties/PropertyItem';

const House = () => {

    const PROPERTIES= useSelector(state => state.property.properties.filter(property=>property.propertyType==='House'));

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
        style={styles.houseScreen}
         showsVerticalScrollIndicator={false}
         data={PROPERTIES}
         renderItem={renderItem}
         keyExtractor={item=>item.date}
        />
    )
}

export default House

const styles = StyleSheet.create({
    houseScreen:{
        flex:1,
        paddingHorizontal:10,
        paddingTop:20,
        backgroundColor:'#eee'
    }
})
