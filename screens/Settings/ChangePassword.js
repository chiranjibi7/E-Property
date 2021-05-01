import React, {useRef, useState,useEffect} from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Alert, TouchableOpacity} from 'react-native';
import { TextInput, Button} from "react-native-paper";
import SimpleReactValidator from 'simple-react-validator';
import {useSelector, useDispatch} from "react-redux";
import {logout} from '../../store/action/auth';


const API_KEY='AIzaSyChsUrMEWpoH74NN661XFMOTQEy-oWiWQc';
const BASE_URL='https://identitytoolkit.googleapis.com';

const ChangePassword = () => {

    const simpleValidator = useRef(new SimpleReactValidator());

    const [password, setPassword] = useState(""); 
    const [error,setError] = useState(null);
    const [isLoading, setIsLoading]= useState(false);
    const [ispasswordChanged, setIsPasswordChanged]= useState(false);

    const authToken= useSelector(state=> state.authenticate.loginAuth.token);
    const dispatch=useDispatch();

    useEffect(() => {
        if(error){
         Alert.alert('An error occured!',error,[{text:'Okay'}]);
        }   
        return ()=>{
            setError(null);
        } 
       }, [error]);

    const passwordChangeHandler = async()=>{
        setError(null);
        setIsLoading(true);
        try {
            const response= await fetch(`${BASE_URL}/v1/accounts:update?key=${API_KEY}`,
         {
          method: 'POST',
          headers:{
              'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
             idToken: authToken,
             password: password,
             returnSecureToken: true
          })
         });
        
         if(!response.ok){
             const errResData= await response.json();
             let errorMessage='Something went wrong!';
             if(errResData.error.message==='WEAK_PASSWORD'){
                 errorMessage='The password must be 6 characters long or more!'
             } else if(errResData.error.message==='INVALID_ID_TOKEN'){
                 errorMessage='Token expired';
             }
             throw new Error(errorMessage);
         } 
         setIsPasswordChanged(true);
         const resData= await response.json();
         console.log(resData.password);
         } catch (error) {
             setError(error.message);
             console.log(error);
             
         }
         setIsLoading(false);
         setPassword('');
    }

    return (
        <View style={styles.resetPassword}>
             <TextInput
            label="Password"
            keyboardType="default"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onBlur={simpleValidator.current.showMessageFor('password')}
            onChangeText={(text) => setPassword(text)}
          />
           <Text style={styles.validationMsg}>{simpleValidator.current.message('password', password, 'required|min:6|max:15')}</Text>

          { isLoading ? 
          <ActivityIndicator size="large" color='#de6262' /> 
          :
          <Button
            mode="contained"
            style={styles.btn}
            disabled={!simpleValidator.current.allValid()}
            onPress={passwordChangeHandler}
          ><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>CHANGE PASSWORD</Text>
          </Button>
        }

        {ispasswordChanged && <View style={styles.reset}>
        <Text style={{fontSize:18,fontWeight:'bold',fontStyle:'italic'}}>Password Changed!</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>dispatch(logout())}>
           <Text style={{color:'#de6262',fontSize:18,fontWeight:'bold',marginVertical:5}}>Login with new password now!</Text> 
        </TouchableOpacity>
          </View>}
        </View>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    resetPassword:{
        flex:1,
        justifyContent: 'center',
        paddingHorizontal:30,
        backgroundColor:'#fff'
    },
    btn:{
        paddingVertical:5,
        marginVertical:20,
        backgroundColor:'#de6262'
    },
    validationMsg:{
        color:'#de6262',
        fontStyle:'italic',
        fontSize:16,fontWeight:'bold',
        textAlign:'center',
        marginTop:5
    },
    reset:{
        justifyContent:'center',
        alignItems:'center',
    }
})
