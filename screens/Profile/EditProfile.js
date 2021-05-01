import React,{useState} from 'react'
import { Text, Alert, ActivityIndicator, ScrollView, View,KeyboardAvoidingView,StyleSheet,TextInput,Image } from "react-native";
import firestore from '@react-native-firebase/firestore';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const EditProfile = () => {

    const userId=  useSelector(state => state.authenticate.loginAuth.userId);

    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [phone, setPhone]= useState('');
    const [country, setCountry]= useState('');
    const [state, setState]= useState('');
    const [city, setCity]= useState('');
    const [tole, setTole]= useState('');
    const [image, setImage]= useState({});
    const [isSubmitted, setIsSubmitted] = useState('');

    const clearInputs= ()=>{
       
        setCountry('');
        setState('');
        setCity('');
        setTole('');
        setName('');
        setEmail('');
        setPhone('');
        setImage({});
      }

    const addProfileToFirebase = async() =>{

        setIsSubmitted(true);
    
        try {
          const imageRef = 'profile/' + image.fileName;
        const storageRef = storage().ref(imageRef);
        await storageRef.putFile(image.uri);
        const photoURL = await storage()
          .ref(imageRef)
          .getDownloadURL(); 
    
        const data={
          date: Date.now(),
          userId,
          country,
         state,
          city,
          tole,
          name,
          email,
          phone,
          photoURL
        };
    
        await firestore()
        .collection('Users')
        .doc(userId)
        .set(data);
        Alert.alert('Profile Updated','Your profile has been updated',[{text:'Okay'}]);
       } catch (error) {
         console.log(error);
       }
       
       setIsSubmitted(false);
       clearInputs();
      };
    
      const pickImageFromGallery=()=>{
        launchImageLibrary({
          mediaType:'photo',
          quality:1,
          maxHeight:250
        }, response=>{
          setImage(response);
        });
      }

    return (
    <ScrollView style={styles.editProfileScreen}>
      <KeyboardAvoidingView>
        
      <View style={styles.formHeading}>
          <Text style={styles.formHeadingText}>Contact Details</Text>
      </View>
        
        <TextInput
        style={styles.inputField}
        placeholder="Name"
        value={name}
        onChangeText={text=>setName(text)}
        />
        <TextInput
        style={styles.inputField}
        keyboardType="email-address"
        placeholder="E-mail"
        value={email}
        onChangeText={text=>setEmail(text)}
        />
        <TextInput
        style={styles.inputField}
        keyboardType="number-pad"
        placeholder="Phone"
        value={phone}
        onChangeText={text=>setPhone(text)}
        />

<View style={styles.formHeading}>
         <Text style={styles.formHeadingText}>Location</Text>
      </View>
      
      <TextInput
        style={styles.inputField}
        placeholder="Country"
        value={country}
        onChangeText={text=>setCountry(text)}
        />
      <TextInput
        style={styles.inputField}
        placeholder="State"
        value={state}
        onChangeText={text=>setState(text)}
        />
        <TextInput
        style={styles.inputField}
        placeholder="City"
        value={city}
        onChangeText={text=>setCity(text)}
        />
        <TextInput
        style={styles.inputField}
        placeholder="Tole"
        value={tole}
        onChangeText={text=>setTole(text)}
        />

        <View style={styles.imagePickerContainer}>

        <View style={styles.imageBox}>
        <Image source={{uri: image.uri}} style={{width:200, height:200, resizeMode:'cover'}} />
        </View>
        <Button style={{...styles.btnStyle,width:'30%'}} onPress={pickImageFromGallery}>
        <Text style={{color:'#fff'}}>Upload</Text>
        </Button>

        </View>

      { isSubmitted ? 
        <ActivityIndicator size="large" color="#de6262" />
        :
        <Button onPress={addProfileToFirebase} style={styles.btnStyle}>
          <Text style={{color:'#fff',fontWeight:'bold'}}>SUBMIT</Text>
        </Button>  
    }
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default EditProfile

const styles = StyleSheet.create({
    editProfileScreen:{
        flex:1,
        backgroundColor:'#fff',
        paddingHorizontal:20,
    },
    inputField:{
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#de6262',
        padding:10
      },
    imagePickerContainer:{
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between', 
        marginBottom:10
      },
      imageBox:{
        width: 200, 
        height: 200, 
        alignItems: 'center', 
        justifyContent: 'center',
        borderWidth:1, 
        borderColor:'grey' 
      },
      formHeading:{
        marginBottom:10,
        marginTop:15,
        padding:8,
        backgroundColor:'#eee'
      },
      formHeadingText:{
        color:'#000',
        fontSize:18,
        fontWeight:'bold'
      },
      btnStyle:{
        width:'100%',
        backgroundColor:'#de6262',
        borderRadius:5,
        marginVertical:20,
        padding:2
      }
})
