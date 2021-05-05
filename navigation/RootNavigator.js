import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import IconHouse from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import ResetPassword from '../screens/Auth/ResetPassword';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import Home from '../screens/Home/Home';
import House from '../screens/Home/HomeScreens/House';
import Land from '../screens/Home/HomeScreens/Land';
import Apartment from '../screens/Home/HomeScreens/Apartment';
import Office from '../screens/Home/HomeScreens/Office';
import Business from '../screens/Home/HomeScreens/Business';
import Commercial from '../screens/Home/HomeScreens/Commercial';
import CustomDrawerComponent from '../components/CustomDrawerComponent';
import Settings from '../screens/Settings/Settings';
import ChangePassword from '../screens/Settings/ChangePassword';
import Properties from '../screens/Properties/Properties';
import MyProperties from '../screens/My Properties/MyProperties';
import PropertyDetail from '../screens/Properties/PropertyDetail';
import Map from '../screens/Properties/Map';
import AddProperty from '../screens/Add Property/AddProperty';
import Profile from '../screens/Profile/Profile';
import EditProfile from '../screens/Profile/EditProfile';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const AuthStackNavigator= createStackNavigator();
const AppDrawerNavigator= createDrawerNavigator();
const HomeStackNavigator= createStackNavigator();
const AddPropertyStackNavigator= createStackNavigator();
const HomeTabNavigator= createBottomTabNavigator();
const PropertiesStackNavigator= createStackNavigator();
const MyPropertiesStackNavigator= createStackNavigator();
const ProfileStackNavigator= createStackNavigator();
const SettingsStackNavigator=createStackNavigator();


const RootNavigator=()=>{

    const isAuth= useSelector(state=> !!state.authenticate.loginAuth.token);
    const isLoggedIn= useSelector(state=> state.authenticate.isLoggedIn);

    return <NavigationContainer>
        {  isAuth && <AppNavigator />}
        {  !isAuth && isLoggedIn && <AuthNavigator />} 
        { !isAuth && !isLoggedIn && <SplashScreen/>}
       
    </NavigationContainer>
};

const AuthNavigator=()=>{
    return <AuthStackNavigator.Navigator>
        <AuthStackNavigator.Screen name="Login" component={Login} options={{headerShown:false}} />
        <AuthStackNavigator.Screen name="Signup" component={Signup} options={{headerTitle:'SIGN UP' ,headerTitleAlign:'center',headerStyle:{backgroundColor:'#de6262'},headerTintColor:'#fff'}}/>
        <AuthStackNavigator.Screen name="Reset Password" component={ResetPassword} options={{headerTitle:'RESET PASSWORD' ,headerTitleAlign:'center',headerStyle:{backgroundColor:'#de6262'},headerTintColor:'#fff'}}/>
    </AuthStackNavigator.Navigator>
}

const AppNavigator=()=>{
    return <AppDrawerNavigator.Navigator 
    drawerType="slide" 
    drawerContentOptions={{
        activeBackgroundColor:'#de6262',
        activeTintColor:'#fff',
        inactiveTintColor: '#de6262',
        inactiveBackgroundColor:'#fff',
        itemStyle: { marginVertical: 10 }
    }} drawerContent={(props)=> <CustomDrawerComponent {...props}/>}>
   
    <AppDrawerNavigator.Screen name="Home" component={HomeTab} />
    <AppDrawerNavigator.Screen name="Profile" component={ProfileNavigator} />
</AppDrawerNavigator.Navigator>
}

const HomeTab=()=>{
    return <HomeTabNavigator.Navigator tabBarOptions={{activeTintColor:'#de6262', inactiveTintColor:'#e99696'}} initialRouteName="Home">
        
        <HomeTabNavigator.Screen name="Home" options={{
            tabBarIcon:({focused,color,size})=><Icon name="md-home" color={color} size={focused ? 30 : 25} />,
            tabBarLabel:({focused,color,size})=><Text style={{color:color,fontSize:focused ? 13 :11}}>Home</Text>
            }} component={HomeNavigator} />

        <HomeTabNavigator.Screen name="Properties" options={{
            tabBarIcon:({focused,color,size})=><IconHouse name="building" color={color} size={focused ? 30 : 25} />,
            tabBarLabel:({focused,color,size})=><Text style={{color:color,fontSize:focused ? 13 :11}}>Properties</Text>
            }}   component={PropertiesNavigator} />

        <HomeTabNavigator.Screen name="Add Property" options={{
            tabBarIcon:({focused,color,size})=><IconFontAwesome name="plus-circle" color={color} size={focused ? 30 : 25} />,
            tabBarLabel:({focused,color,size})=><Text style={{color:color,fontSize:focused ? 13 :11}}>Add</Text>
            }}   component={AddPropertyNavigator} />

        <HomeTabNavigator.Screen name="My Properties" options={{
            tabBarIcon:({focused,color,size})=><Icon name="list" color={color} size={focused ? 30 : 25} />,
            tabBarLabel:({focused,color,size})=><Text style={{color:color,fontSize:focused ? 13 :11}}>My List</Text>
            }}   component={MyPropertiesNavigator} />

        <HomeTabNavigator.Screen name="Settings" options={{
            tabBarIcon:({focused,color,size})=><Icon name="settings" color={color} size={focused ? 30 : 25} />,
            tabBarLabel:({focused,color,size})=><Text style={{color:color,fontSize:focused ? 13 :11}}>Settings</Text>
            }} component={SettingsNavigator} />
    </HomeTabNavigator.Navigator>
}

const HomeNavigator =()=>{
    return <HomeStackNavigator.Navigator initialRouteName="Home">
        <HomeStackNavigator.Screen name="Home" component={Home} />
        <HomeStackNavigator.Screen name="House" component={House} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}} />
        <HomeStackNavigator.Screen name="Land" component={Land} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}} />
        <HomeStackNavigator.Screen name="Apartment" component={Apartment} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}} />
        <HomeStackNavigator.Screen name="Office" component={Office} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}} />
        <HomeStackNavigator.Screen name="Business" component={Business} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}} />
        <HomeStackNavigator.Screen name="Commercial" component={Commercial} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}} />
        <HomeStackNavigator.Screen name="Property Detail" component={PropertyDetail} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}}  />
        <PropertiesStackNavigator.Screen name="Map" component={Map} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}}  />
    </HomeStackNavigator.Navigator>
}

const AddPropertyNavigator=()=>{
   return <AddPropertyStackNavigator.Navigator>
        <AddPropertyStackNavigator.Screen name="Add Property" component={AddProperty} />
    </AddPropertyStackNavigator.Navigator>
}

const PropertiesNavigator=()=>{ 
  return  <PropertiesStackNavigator.Navigator>
        <PropertiesStackNavigator.Screen name="Properties" component={Properties} />
        <PropertiesStackNavigator.Screen  name="Property Detail" component={PropertyDetail} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}}  />
        <PropertiesStackNavigator.Screen name="Map" component={Map} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}}  />
    </PropertiesStackNavigator.Navigator>
}

const MyPropertiesNavigator=()=>{ 
  return  <MyPropertiesStackNavigator.Navigator>
        <MyPropertiesStackNavigator.Screen name="My Properties" component={MyProperties} />
        <MyPropertiesStackNavigator.Screen  name="Property Detail" component={PropertyDetail} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}}  />
        <MyPropertiesStackNavigator.Screen name="Map" component={Map} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}}  />
    </MyPropertiesStackNavigator.Navigator>
}

const ProfileNavigator=()=>{
    return <ProfileStackNavigator.Navigator>
        <ProfileStackNavigator.Screen name="Profile" component={Profile} />
        <ProfileStackNavigator.Screen name="Edit Profile" component={EditProfile} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}} />
    </ProfileStackNavigator.Navigator>
}

const SettingsNavigator=()=>{
    return <SettingsStackNavigator.Navigator>
        <SettingsStackNavigator.Screen name="Settings" component={Settings} />
        <SettingsStackNavigator.Screen name="Change Password" component={ChangePassword} options={{headerTitleAlign:'center', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}} />
        <SettingsStackNavigator.Screen name="Edit Profile" component={EditProfile} options={{headerTitleAlign:'left', headerTintColor:'#fff', headerStyle:{backgroundColor:'#de6262'}}} />
    </SettingsStackNavigator.Navigator>
}

export default RootNavigator;