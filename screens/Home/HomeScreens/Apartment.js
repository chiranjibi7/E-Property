import React from 'react'
import { StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import PropertyItem from '../../Properties/PropertyItem';

const Apartment = () => {

    const PROPERTIES= useSelector(state => state.property.properties.filter(property=>property.propertyType==='Apartment'));

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
        style={styles.apartmentScreen}
         showsVerticalScrollIndicator={false}
         data={PROPERTIES}
         renderItem={renderItem}
         keyExtractor={item=>item.date}
        />
    )
}

export default Apartment;

const styles = StyleSheet.create({
    apartmentScreen:{
        flex:1,
        paddingHorizontal:10,
        paddingTop:20,
        backgroundColor:'#eee'
    }
})
