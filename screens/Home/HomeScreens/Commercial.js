import React from 'react'
import { StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import PropertyItem from '../../Properties/PropertyItem';

const Commercial = () => {

    const PROPERTIES= useSelector(state => state.property.properties.filter(property=>property.propertyType==='Commercial'));

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
        style={styles.commercialScreen}
         showsVerticalScrollIndicator={false}
         data={PROPERTIES}
         renderItem={renderItem}
         keyExtractor={item=>item.date}
        />
    )
}

export default Commercial

const styles = StyleSheet.create({
    commercialScreen:{
        flex:1,
        paddingHorizontal:10,
        paddingTop:20,
        backgroundColor:'#eee'
    }
})
