import React,{useState} from "react";
import { Text, Alert, ActivityIndicator, ScrollView, View,KeyboardAvoidingView,StyleSheet,TextInput,Image } from "react-native";
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import firestore from '@react-native-firebase/firestore';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export default function AddProperty() {

  const userId=  useSelector(state => state.authenticate.loginAuth.userId);

  const [propertyType, setPropertyType] = useState();
  const [title, setTitle]= useState('');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [areaUnit, setAreaUnit]= useState();
  const [direction, setDirection] = useState();
  const [floors, setFloors]= useState('');
  const [rooms, setRooms]= useState('');
  const [lat,setLat]= useState('');
  const [long,setLong]= useState('');
  const [district, setDistrict]= useState('');
  const [city, setCity]= useState('');
  const [tole, setTole]= useState('');
  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [phone, setPhone]= useState('');
  const [image, setImage]= useState({});
  const [isSubmitted, setIsSubmitted] = useState('');
  
  const navigation= useNavigation();
  React.useLayoutEffect(()=>{
      navigation.setOptions({
          headerTitle: <Icon name="md-menu" size={40} color="#fff" onPress={()=>navigation.toggleDrawer()}/>,
          headerStyle:{
              backgroundColor:"#de6262"
          },
          headerTitleAlign:'left'});
        });

  const clearInputs= ()=>{
    setPropertyType();
    setTitle('');
    setPrice('');
    setArea('');
    setAreaUnit();
    setDirection();
    setFloors('');
    setRooms('');
    setLat('');
    setLong('');
    setDistrict('');
    setCity('');
    setTole('');
    setName('');
    setEmail('');
    setPhone('');
    setImage({});
  }

  const addPropertyDataToFirebase = async() =>{

    setIsSubmitted(true);

    try {
      const imageRef = 'photos/' + image.fileName;
    const storageRef = storage().ref(imageRef);
    await storageRef.putFile(image.uri);
    const photoURL = await storage()
      .ref(imageRef)
      .getDownloadURL(); 

    const data={
      date: Date.now(),
      userId,
      propertyType,
      title,
      price,
      area,
      areaUnit,
      direction,
      floors,
      rooms,
      lat,
      long,
      district,
      city,
      tole,
      name,
      email,
      phone,
      photoURL
    };

    await firestore()
    .collection('Properties')
    .add(data);
    Alert.alert('Property Added','Your property has been added',[{text:'Okay'}]);
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
    <ScrollView style={styles.addPropertyScreen}>
      <KeyboardAvoidingView>

      <View style={styles.formHeading}>
      <Text style={styles.formHeadingText}>Basic Information</Text>
      </View>

      <Text style={styles.inputTitle}>Property Type</Text>
{/* <View style={styles.inputSelect}> */}
<RNPickerSelect
    value={propertyType}
    style={pickerSelectStyles}
            onValueChange={value=> setPropertyType(value)}
            items={[
                { label: 'House', value: 'House' },
                { label: 'Land', value: 'Land' },
                { label: 'Apartment', value: 'Apartment' },
                { label: 'Office', value: 'Office' },
                { label: 'Commercial', value: 'Commercial' },
                { label: 'Business', value: 'Business' },
            ]}
        />
{/* </View> */}
      <TextInput
        style={styles.inputField}
        placeholder="Title"
        value={title}
        onChangeText={text=>setTitle(text)}
        />

        <TextInput
        style={styles.inputField}
        keyboardType="number-pad"
        placeholder="Price"
        value={price}
        onChangeText={text=>setPrice(text)}
        />

      <TextInput
       style={styles.inputField}
        keyboardType="number-pad"
        placeholder="Area"
        value={area}
        onChangeText={text=>setArea(text)}
        />

<Text style={styles.inputTitle}>Area Unit</Text>
{/* <View style={styles.inputSelect}> */}
<RNPickerSelect
    value={areaUnit}
    style={pickerSelectStyles}
            onValueChange={value=> setAreaUnit(value)}
            items={[
                { label: 'Ropani', value: 'Ropani' },
                { label: 'Aana', value: 'Aana' },
                { label: 'Paisa', value: 'Paisa' },
                { label: 'Bighaa', value: 'Bighaa' },
                { label: 'Kaththa', value: 'Kaththa' },
                { label: 'Dhur', value: 'Dhur' },
                { label: 'Sq Ft', value: 'Sq Ft' },
                { label: 'Sq Mt', value: 'Sq Mt' },
            ]}
        />
{/* </View> */}

<Text style={styles.inputTitle}>Direction</Text>
<View style={styles.inputSelect}>
<RNPickerSelect
    value={direction}
            onValueChange={value=> setDirection(value)}
            items={[
                { label: 'East', value: 'East' },
                { label: 'West', value: 'West' },
                { label: 'North', value: 'North' },
                { label: 'South', value: 'South' },
                { label: 'South East', value: 'South East' },
                { label: 'South West', value: 'South West' },
                { label: 'North East', value: 'North East' },
                { label: 'North West', value: 'North West' },
            ]}
        />
</View>

<TextInput
        style={styles.inputField}
        keyboardType="number-pad"
        placeholder="No.Of Floors"
        value={floors}
        onChangeText={text=>setFloors(text)}
        />

<TextInput
        style={styles.inputField}
        keyboardType="number-pad"
        placeholder="No.Of Rooms"
        value={rooms}
        onChangeText={text=>setRooms(text)}
        />

<TextInput
        style={styles.inputField}
        keyboardType="number-pad"
        placeholder="Latitude"
        value={lat}
        onChangeText={text=>setLat(text)}
        />

<TextInput
        style={styles.inputField}
        keyboardType="number-pad"
        placeholder="Longitude"
        value={long}
        onChangeText={text=>setLong(text)}
        />

<View style={styles.imagePickerContainer}>

          <View style={styles.imageBox}>
            <Image source={{uri: image.uri}} style={{width:200, height:200, resizeMode:'cover'}} />
          </View>
          <Button style={{...styles.btnStyle,width:'30%'}} onPress={pickImageFromGallery}>
            <Text style={{color:'#fff'}}>Upload</Text>
          </Button>

      </View>

      <View style={styles.formHeading}>
         <Text style={styles.formHeadingText}>Location</Text>
      </View>
      
      <TextInput
        style={styles.inputField}
        placeholder="District"
        value={district}
        onChangeText={text=>setDistrict(text)}
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

      { isSubmitted ? 
        <ActivityIndicator size="large" color="#de6262" />
        :
        <Button onPress={addPropertyDataToFirebase} style={styles.btnStyle}>
          <Text style={{color:'#fff',fontWeight:'bold'}}>SUBMIT</Text>
        </Button>  
    }
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    addPropertyScreen:{
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
    inputSelect: {
      // fontSize: 20,
      // backgroundColor:'#fff',
      borderWidth: 1,
      borderColor: '#de6262',
      borderRadius: 5,
      // color:'black',
      marginBottom:15,
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
    inputTitle:{
      fontSize:15,
      marginBottom:8
    },
    btnStyle:{
      width:'100%',
      backgroundColor:'#de6262',
      borderRadius:5,
      marginVertical:20,
      padding:2
    }

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
