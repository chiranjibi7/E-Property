import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView, Image,TouchableOpacity } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import DirectionIcon from 'react-native-vector-icons/FontAwesome5';
import LandIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const CarouselProperties=()=>  {

    const [activeIndex, setActiveIndex]= React.useState(0);
    const PROPERTIES= useSelector(state=>state.property.properties);
    const navigation= useNavigation();

   const _renderItem=({item,index})=>{
        return (
          <TouchableOpacity 
          onPress={()=>navigation.navigate('Property Detail', {date: item.date})} 
          activeOpacity={0.8}>
          <View style={{
              backgroundColor:'#fff',
              borderRadius: 5,
              marginRight: 25, 
              }}>
                  <Image 
                  source={{uri:item.photoURL}}
                  style={{
                      height:250,
                      width:'100%',
                      resizeMode:'cover'
                  }}
                  />
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', marginVertical:10,paddingLeft:8}}>
                  <View style={{paddingHorizontal:20, paddingVertical:8,backgroundColor:'#c6cbef'}}>
                      <Text style={{fontWeight:'bold',color:'blue'}}>{item.propertyType}</Text>
                  </View>
                  <View style={{width:'55%',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <DirectionIcon style={{marginRight:7}} name='directions' size={20} color='#000' />
                        <Text>{item.direction}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <LandIcon style={{marginRight:7}} name='vector-square' size={20} color='#000' />
                        <Text>{item.area} {item.areaUnit}</Text>
                    </View>
                    
                  </View>
            </View>
            <Text style={{fontSize:20,fontWeight:'bold',paddingLeft:8}}>{item.title}</Text>
            <Text style={{marginVertical:7,paddingLeft:8}}>{item.district}, {item.city}, {item.tole}</Text>
            <Text style={{paddingLeft:8,fontSize:20,fontWeight:'bold',color:'#de6464',marginBottom:5}}>Rs {item.price}</Text>
          </View>
          </TouchableOpacity>
        )
    };

        return (
          <SafeAreaView>
              <Text style={{fontSize:25,fontWeight:'bold',marginBottom:15}}>Popular</Text>
            <View style={{ flexDirection:'row', justifyContent: 'center'}}>
                
                <Carousel
                  loop
                  autoplay
                  autoplayDelay={2}
                  layout={"default"}
                  data={PROPERTIES}
                  sliderWidth={300}
                  itemWidth={420}
                  renderItem={_renderItem}
                  onSnapToItem = { index => setActiveIndex(index) } />
            </View>
            </SafeAreaView>
           
        );
    }


export default CarouselProperties;
