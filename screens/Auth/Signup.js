import React, { useState, useRef, useEffect } from "react";
import {
    Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View
} from "react-native";
import { TextInput, Button} from "react-native-paper";
import SimpleReactValidator from 'simple-react-validator';
import {signup} from '../../store/action/auth';
import CardComponent from "../../components/CardComponent";
import {useDispatch, useStore} from "react-redux";
import {useNavigation} from '@react-navigation/native';


const Signup = () => {

  const dispatch= useDispatch();
  const simpleValidator = useRef(new SimpleReactValidator());
  const {navigate}=useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading]= useState(false);
  const [error,setError] = useState(null);
  const [isSignUp, setIsSignUp]=useState(false);

    useEffect(() => {
     if(error){
      Alert.alert('An error occured!',error,[{text:'Okay'}]);
     } 
     return ()=>{
       setError(null);
     }
    }, [error]);
 
    const signupHandler= async()=>{
        setIsLoading(true);
         try {
          await dispatch(signup(email,password));
          setIsSignUp(true);
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
        setEmail('');
        setPassword('');
    }
 
    const navigateToLogin=()=>{
      navigate('Login');
      setIsSignUp(false);
    }

  return (
    <KeyboardAvoidingView style={styles.authScreen}>
       
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

          { isLoading
           ? <ActivityIndicator size="large" color="#de6262" /> :
          <Button
            mode="contained"
            style={styles.button}
            disabled={!simpleValidator.current.allValid()}
            onPress={signupHandler}
          ><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>SIGN UP</Text>
          </Button>
          }
        </ScrollView>
      </CardComponent>

      {isSignUp && <View style={styles.signedUped}>
        <Text style={{fontSize:18,fontWeight:'bold'}}>Your account has been created!</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={navigateToLogin}>
           <Text style={{color:'#de6262',fontSize:18,fontWeight:'bold'}}>Login Now!</Text> 
        </TouchableOpacity>
          </View>}

    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  authScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#ccc'
  },
 
  card: {
    width: Dimensions.get("window").width * 0.8,
    borderRadius:15,
  },
  input: {
    marginVertical: 10, 
  },

  validationMsg:{
    color:'#de6262',
    fontStyle:'italic',
    fontSize:16
  },
  button:{
      paddingVertical:5,
      marginVertical:15,
      backgroundColor:'#de6262'
  },
  signedUped:{
      width:'80%',
      marginVertical:20,
      justifyContent:'center',
      alignItems:'center',
      padding:20
  }

});
