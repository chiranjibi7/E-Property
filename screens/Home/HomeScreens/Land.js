import React from 'react'
import { StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import PropertyItem from '../../Properties/PropertyItem';

const Land = () => {

    const PROPERTIES= useSelector(state => state.property.properties.filter(property=>property.propertyType==='Land'));

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
        style={styles.landScreen}
         showsVerticalScrollIndicator={false}
         data={PROPERTIES}
         renderItem={renderItem}
         keyExtractor={item=>item.date}
        />
    )
}

export default Land

const styles = StyleSheet.create({
    landScreen:{
        flex:1,
        paddingHorizontal:10,
        paddingTop:20,
        backgroundColor:'#eee'
    }
})
