import React, { Component } from 'react'
import { ScrollView, Text, Image, View, Button } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export interface LaunchScreenProps extends NavigationScreenProps<{}> {}


export default class LaunchScreen extends Component<LaunchScreenProps> {

  initiateTest(){
      this.props.navigation.navigate('QuestionScreen')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop : 30,
          marginBottom : 30
        }}>
          <Text style={styles.textStyle} >Welcome to the Trivia Challenge!</Text>
          <Text style={styles.textStyle} >You will be presented with 10 true or false questions.</Text>
          <Text style={styles.textStyle} >Can you score 100%?</Text>
          <Button title="Begin" onPress={()=>this.initiateTest()} style={styles.textStyle} ></Button>
        </View>
      </View>
    )
  }
}
