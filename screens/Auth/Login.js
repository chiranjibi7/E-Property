import React, { useState, useRef, useEffect} from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { TextInput, Button} from "react-native-paper";
import LinearGradient from 'react-native-linear-gradient';
import SimpleReactValidator from 'simple-react-validator';
import CardComponent from "../../components/CardComponent";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {login} from '../../store/action/auth';

const Login = () => {

  const dispatch= useDispatch();

  const simpleValidator = useRef(new SimpleReactValidator());
  const {navigate} =useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading]= useState(false);
  const [error,setError] = useState();

    useEffect(() => {
     if(error){
      Alert.alert('An error occured!',error,[{text:'Okay'}]);
     }  
     return ()=>{
      setError(null);
    } 
    }, [error]);
 
    const loginHandler= async ()=>{
        setIsLoading(true);
        try {
          await dispatch(login(email,password));
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
        setEmail('');
        setPassword('');
    }
  return (
    <KeyboardAvoidingView style={styles.authScreen}>
        <LinearGradient colors={['#de6262','#ffb88c']} style={styles.gradient}>
      <CardComponent style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            label="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onBlur={simpleValidator.current.showMessageFor('email')}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.validationMsg}>{simpleValidator.current.message('email', email, 'required|email')}</Text>

          <TextInput
            label="Password"
            keyboardType="default"
            secureTextEntry
            autoCapitalize="none"
            style={styles.input}
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
            style={styles.buttonLogin}
            disabled={!simpleValidator.current.allValid()}
            onPress={loginHandler}
          ><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>LOG IN</Text>
          </Button>
          } 
           <TouchableOpacity activeOpacity={0.8} 
          onPress={()=>navigate('Reset Password')}
          >
            <Text style={styles.passwordForgot}>Forgot Password?</Text>
          </TouchableOpacity>

          <Text style={styles.signUp} >Don't have an account? Sign up below</Text>

          <Button
            mode="outlined"
            style={styles.buttonSignup}
            onPress={()=>navigate('Signup')}
          ><Text style={{color:'#de6262',fontSize:17,fontWeight:'bold'}}>SIGN UP</Text></Button>

        </ScrollView>
      </CardComponent>      
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  authScreen: {
    flex: 1,
  },
  gradient:{
    width:'100%',
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },    
  card: {
    width: Dimensions.get("window").width * 0.8,
    borderRadius:15
  },
  input: {
    marginVertical: 10,
    
  },
  validationMsg:{
    color:'#de6262',
    fontStyle:'italic',
    fontSize:16
  },
  buttonLogin:{
      paddingVertical:5,
      marginVertical:10,
      backgroundColor:'#de6262'
  },

  buttonSignup:{
      paddingVertical:3,
      marginTop:10,
      borderColor:'#de6262',
      borderWidth:2,
      borderRadius:5
  },
  passwordForgot:{
    color:'#1877F2',
    fontStyle:'italic',
    fontSize:17,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:5
  },
  signUp:{
    color:'#1877F2'
    ,textAlign:'center'
    , fontSize:17,
    marginTop:10,
    fontStyle:'italic',
    fontWeight:'bold'
  }
});
