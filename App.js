/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View,Linking,Button,ToastAndroid} from 'react-native';
import Sound from 'react-native-sound'
import axios from 'axios'

import { Container, Header, Content, Card, CardItem,Body,Text } from 'native-base'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


var sound = null
export default class App extends Component {

  constructor(){
    super()
    this.state = {
        data : [],
    }
}

loadData() {
    axios.get('https://al-quran-8d642.firebaseio.com/data.json?print=pretty')
    .then(result => {
        const ayat = result.data 
        this.setState({data : ayat})
        alert('sukses get')
    })
}

componentDidMount(){
    this.loadData()
}


playAyat = () => {
  soundAyat = new Sound('http://ia802609.us.archive.org/13/items/quraninindonesia/001AlFaatihah.mp3',Sound.MAIN_BUNDLE,(error)=>{
    if(error){
      ToastAndroid.show('error init player',ToastAndroid.SHORT)
    }
  })
}


componentWillMount(){
  
  this.playAyat()
}

onPressPlayAyat() {
  if(soundAyat!=null){
    soundAyat.play((success)=>{
      if(!success){
        ToastAndroid.show('error playing',ToastAndroid.SHORT)
      }
    });
  } 
}


 
  render() {
   
    
   
    return (
      <Container >
        

        <Content>
                {this.state.data.map(item=>
                        <Card key={item.nomor}>
                        <CardItem>
                        <Body>
                        <Text style={{fontSize:22}}>
                            {item.nama}
                            </Text>
                            <Text style={{fontSize:22}}>
                            {item.arti}
                            </Text>
                            <Text style={{fontSize:22}}>
                            {item.asma}
                            </Text>
                            <Text style={{fontSize:22}}>
                            {item.ayat}
                            </Text>
                            <Button 
                              title='play'
                              onPress={()=>this.onPressPlayAyat()}
                            />
                        </Body>
                        </CardItem>
                        
                    </Card>
                    )}
                </Content>
      </Container>
    );
  }
}


