import React from 'react'
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import {Text} from 'react-native-paper';
import {logout} from '../../store/action/auth';
import {useDispatch, useSelector} from "react-redux";

const API_KEY='AIzaSyChsUrMEWpoH74NN661XFMOTQEy-oWiWQc';
const BASE_URL='https://identitytoolkit.googleapis.com';

const Settings = () => {
    const [error,setError] = React.useState();
    const[isLoading, setIsLoading]= React.useState(false);
    const navigation= useNavigation();
    const dispatch= useDispatch();
    const authToken = useSelector(state => state.authenticate.loginAuth.token);

    React.useEffect(() => {
        if(error){
         Alert.alert('An error occured!',error,[{text:'Okay'}]);
        }    
        return ()=>{
            setError(null);
          }
       }, [error]);

    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: <Icon name="md-menu" size={40} color="#fff" onPress={()=>navigation.toggleDrawer()}/>,
            headerStyle:{
                backgroundColor:"#de6262"
            },
            headerTitleAlign:'left'});
    });

    const removeAccount=()=>{
        Alert.alert(
            "DELETE ACCOUNT?",
            "Are you sure want to delete your account?",
            [
              {
                text: "Cancel",
              },
              {
                text: "Remove",
                onPress: handleRemoveAccount,
              },
            ],
          );
    }

    const handleRemoveAccount= async()=>{
        setError(null);
        setIsLoading(true);
        try {
           const response= await fetch(`${BASE_URL}/v1/accounts:delete?key=${API_KEY}`,
        {
         method: 'POST',
         headers:{
             'Content-Type' : 'application/json'
         },
         body: JSON.stringify({
            idToken: authToken
         })
        });
       
        if(!response.ok){
            const errResData= await response.json();
            let errorMessage='Something went wrong!';
            if(errResData.error.message==='USER_NOT_FOUND'){
                errorMessage='User not found!'
            } else if(errResData.error.message==='INVALID_ID_TOKEN'){
                errorMessage='Token expired';
            }
            throw new Error(errorMessage);
        } 
        dispatch(logout());
        } catch (error) {
            setError(error.message);
            console.log(error);
            setIsLoading(false);
        }
    }
    return (
        <View style={styles.settings}>

        <TouchableOpacity activeOpacity={0.7} onPress={()=> navigation.navigate('Change Password')}>
        <View style={styles.btnContainer}>
            <Icons name="arrowsalt" size={30} color="#de6262" />   
            <Text style={styles.btnText} >Change Password</Text>
        </View>
        </TouchableOpacity>

            { isLoading ? 
          <ActivityIndicator size="large" color='#de6262' /> 
          :         
         <TouchableOpacity activeOpacity={0.8} onPress={removeAccount}>
               <View style={styles.btnContainer}>
                <Icons name="delete" size={30} color="#de6262" />
                <Text style={styles.btnText} >Remove Account</Text>
           </View>
         </TouchableOpacity>
            }
            
           <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate('Edit Profile')}>
           <View style={styles.btnContainer}>
                <Icons name="edit" size={30} color="#de6262" />
                <Text style={styles.btnText}>Edit Profile</Text>
            </View>
           </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={()=> dispatch(logout())}>
          <View style={styles.btnContainer}>
                <Icons name="logout" size={30} color="#de6262" />
                <Text style={styles.btnText}>Log Out </Text>
            </View>
          </TouchableOpacity>
     
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    settings:{
        flex:1,
        padding:20

    },

    btnContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20,
        borderWidth:1,
        borderColor:'#de6262',
        borderRadius:5,
        paddingHorizontal:40,
        paddingVertical:5,
        backgroundColor:'#fff'

    },
      btnText:{
        color:'#de6262',
        fontSize:20,
        fontWeight:'bold',
        marginLeft:70
      }
   
})
