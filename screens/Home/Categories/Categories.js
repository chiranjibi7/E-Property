import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import CategoryItem from './CategoryItem';
import HouseIcon from 'react-native-vector-icons/AntDesign';
import BuildingIcon from 'react-native-vector-icons/FontAwesome';
import OfficeIcon from 'react-native-vector-icons/FontAwesome5';
import BusinessIcon from 'react-native-vector-icons/FontAwesome5';
import LandIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ApartmentIcon from 'react-native-vector-icons/MaterialIcons';
 

const Categories = () => {

    const DATA=[
        {
            id:'House',
            icon: <HouseIcon style={styles.icon} name="home" size={50} color="#de6464" />,
            name: <Text style={styles.text}>House</Text>
        },
        {
            id: 'Land',
            icon: <LandIcon style={styles.icon} name="wallpaper" size={50} color="#de6464" />,
            name: <Text style={styles.text}>Land</Text>
        },
        {
            id: 'Office',
            icon: <OfficeIcon style={styles.icon} name="chair" size={50} color="#de6464" />,
            name: <Text style={styles.text}>Office</Text>
        },
        {
            id: 'Apartment',
            icon: <ApartmentIcon style={styles.icon} name="apartment" size={50} color="#de6464" />,
            name: <Text style={styles.text}>Apartment</Text>
        },
        {
            id: 'Commercial',
            icon: <BuildingIcon style={styles.icon} name="building-o" size={50} color="#de6464" />,
            name: <Text style={styles.text}>Commercial</Text>
        },
        {
            id: 'Business',
            icon: <BusinessIcon style={styles.icon} name="business-time" size={50} color="#de6464" />,
            name: <Text style={styles.text}>Business</Text>
        },       
    ];

    const renderItem = ({ item }) => (
        <CategoryItem icon={item.icon} name={item.name} id={item.id} />
      );

    return (
        <View style={styles.categories}>
            <Text style={styles.title}>Categories</Text>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
      />
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    categories:{
        marginVertical:30
    },
    title:{
        fontWeight:'bold',
        fontSize:25,
        marginBottom:15
    },
    icon:{
        marginBottom:10
    },
    text:{
        fontSize:17,
        textAlign:'center'
    }
})
