import React, {useRef, useState,useEffect} from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Alert, TouchableOpacity} from 'react-native';
import { TextInput, Button} from "react-native-paper";
import SimpleReactValidator from 'simple-react-validator';
import {useDispatch} from "react-redux";
import {passwordReset} from '../../store/action/auth';
import {useNavigation} from "@react-navigation/native";

const ResetPassword = () => {

    const simpleValidator = useRef(new SimpleReactValidator());
    const dispatch= useDispatch();
    const {navigate} =useNavigation();

    const [email, setEmail] = useState(""); 
    const [error,setError] = useState();
    const [isLoading, setIsLoading]= useState(false);
    const [isReset, setIsReset]= useState(false);

    useEffect(() => {
        if(error){
         Alert.alert('An error occured!',error,[{text:'Okay'}]);
        }    
       }, [error]);

    const loginHandler = async()=>{
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(passwordReset(email));
            setIsReset(true);
          } catch (error) {
            setError(error.message);
          }
          setIsLoading(false);
          setEmail('');
    }

    const navigateToLogin=()=>{
        navigate('Login');
        setIsReset(false);
      }

    return (
        <View style={styles.resetPassword}>
             <TextInput
            label="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onBlur={simpleValidator.current.showMessageFor('email')}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.validationMsg}>{simpleValidator.current.message('email', email, 'required|email')}</Text>

          { isLoading ? 
          <ActivityIndicator size="large" color='#de6262' /> 
          :
          <Button
            mode="contained"
            style={styles.btn}
            disabled={!simpleValidator.current.allValid()}
            onPress={loginHandler}
          ><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>RESET PASSWORD</Text>
          </Button>
        }

        {isReset && <View style={styles.reset}>
        <Text style={{fontSize:18,fontWeight:'bold',fontStyle:'italic'}}>Please check your email to reset password!</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={navigateToLogin}>
           <Text style={{color:'#de6262',fontSize:18,fontWeight:'bold',marginVertical:5}}>Login Now!</Text> 
        </TouchableOpacity>
          </View>}
        </View>
    )
}

export default ResetPassword

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
        // width:'80%',

        justifyContent:'center',
        alignItems:'center',
        // padding:20
    }
})
