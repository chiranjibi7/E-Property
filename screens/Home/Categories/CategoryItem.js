import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import {Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const CategoryItem = ({icon,name,id}) => {
    
    const {navigate}= useNavigation();
    return (
        <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={()=>navigate(id)}>
        <Card style={styles.card}>
            {icon}  
            {name}
        </Card>
        </TouchableOpacity>
    )
}

export default React.memo(CategoryItem);

const styles = StyleSheet.create({
    card:{
        height:100,
        width:130,
        marginRight:30,
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
  
})
