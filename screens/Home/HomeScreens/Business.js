import React from 'react'
import { StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import PropertyItem from '../../Properties/PropertyItem';

const Business = () => {

    const PROPERTIES= useSelector(state => state.property.properties.filter(property=>property.propertyType==='Business'));

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
        style={styles.businessScreen}
         showsVerticalScrollIndicator={false}
         data={PROPERTIES}
         renderItem={renderItem}
         keyExtractor={item=>item.date}
        />
    )
}

export default Business;

const styles = StyleSheet.create({
    businessScreen:{
        flex:1,
        paddingHorizontal:10,
        paddingTop:20,
        backgroundColor:'#eee'
    }
})
