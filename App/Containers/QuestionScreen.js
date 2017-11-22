import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { NavigationScreenProps } from 'react-navigation'
import { StyleSheet, View, Text, Button, Image, ActivityIndicator } from 'react-native'

export interface QuestionScreenProps extends NavigationScreenProps<{}> {}

export default class QuestionScreen extends Component<QuestionScreenProps> {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      cards: [],
      responseJson : {},
      resultSet : []
    }
  }

  componentDidMount(){

    fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
      .then((response) => response.json())
      .then((responseJson) => {

        var tempArray = [];
        for(var index in responseJson.results){
          tempArray.push(index);
        }

          this.setState({
            responseJson : responseJson,
            cards : tempArray,
            isLoading : false,

          })

      })
      .catch((error) => {
        this.props.navigation.navigate('LaunchScreen')
      });

  }

  renderCard = card => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{this.state.responseJson.results[card].category}</Text>
        <Text style={styles.questionText}>{this.state.responseJson.results[card].question}</Text>
      </View>
    )
  };

  onSwipedAllCards = () => {

     this.props.navigation.navigate('ResultScreen', {
       "data" : this.state.responseJson.results,
       "answerArray" : this.state.resultSet
     })

  };

  onSwipedLeft = index => {

    var answer = this.state.responseJson.results[index].correct_answer
    if(answer == "False"){

      let arr = this.state.resultSet;
      arr.push("Correct");

      this.setState({
          resultSet : arr
      })
    }else{
      let arr = this.state.resultSet;
      arr.push("Incorrect");

      this.setState({
          resultSet : arr
      })
    }

  };

  onSwipedRight = index => {

      var answer = this.state.responseJson.results[index].correct_answer
      if(answer == "True"){
        let arr = this.state.resultSet;
        arr.push("Correct");

        this.setState({
            resultSet : arr
        })
      }else{
        let arr = this.state.resultSet;
        arr.push("Incorrect");

        this.setState({
            resultSet : arr
        })
      }

  };

  render () {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
        <View style={{backgroundColor: 'transparent'}}>

          <Swiper
            ref={swiper => {
              this.swiper = swiper
            }}
            verticalSwipe = {false}
            cards={this.state.cards}
            onSwipedLeft={this.onSwipedLeft}
            onSwipedRight={this.onSwipedRight}
            renderCard={this.renderCard}
            onSwipedAll={this.onSwipedAllCards}
            overlayLabels={{

              left: {
                title: 'False',
                style: {
                  label: {
                    backgroundColor: '#0080b0',
                    borderColor: '#0080b0',
                    color: 'white',
                    borderWidth: 1
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30
                  }
                }
              },
              right: {
                title: 'True',
                style: {
                  label: {
                    backgroundColor: '#0080b0',
                    borderColor: '#0080b0',
                    color: 'white',
                    borderWidth: 1
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30
                  }
                }
              }
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity
          >

          </Swiper>

        </View>

    )
  }
}

const styles = StyleSheet.create({
  box1: {
    flex: 1
  },
  tempcontainer: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white'
  },
  title:{
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'transparent',
    top : 20,
    fontWeight: 'bold',
    color : "#666666",
  },
  questionText:{
    textAlign: 'center',
    fontSize: 25,
    alignSelf : 'flex-start',
    backgroundColor: 'transparent',
    marginTop : 130,
    color : "#666666",
  }
})
