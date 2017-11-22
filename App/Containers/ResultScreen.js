import React, { Component } from 'react'
import { ScrollView, Text, Image, View, Button, StyleSheet, FlatList } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

export interface ResultScreenProps extends NavigationScreenProps<{}> {}


export default class ResultScreen extends Component<ResultScreenProps> {

  constructor (props) {
    super(props)

    this.state = {
      listData : [],
      titleText : 0
    }
  }


  componentWillMount(){
    
    var dataArray = [];
    var noOfCorrectAnswer = 0;
    for(var index in this.props.navigation.state.params.data){


        if(this.props.navigation.state.params.answerArray[index] == "Correct"){

          var tempObject = {
            key : index,
            imageName : require('../Images/Icons/right_icon.png'),
          };
          dataArray.push(tempObject);

            noOfCorrectAnswer = noOfCorrectAnswer + 1;
        }else{

          var tempObject = {
            key : index,
            imageName : require('../Images/Icons/wrong_icon.png'),
          };
          dataArray.push(tempObject);

        }
    }

    this.setState({
        listData : dataArray,
        titleText : noOfCorrectAnswer
    })


  }



  _renderItem = ({item}) => (

        <View style={{marginTop:10, flex:1, flexDirection:'row'}}>
          <Image source= {item.imageName} style={styles.imageStyle}></Image>
          <Text style={styles.listItemText}>{this.props.navigation.state.params.data[item.key].question}</Text>
        </View>

  );



  startNewRound(){
      this.props.navigation.navigate('LaunchScreen')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
          <Text style={styles.title}>Your Score</Text>
          <Text style={styles.title}>{this.state.titleText} / 10</Text>
          <FlatList
            data={this.state.listData}
            renderItem={this._renderItem}
            style={styles.listStyle}
          />
          <Button title="PLAY AGAIN?" onPress={()=>this.startNewRound()} style={styles.textStyle} ></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection : 'column',
    justifyContent : 'flex-start',
    alignItems : 'center'
  },
  title:{
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'transparent',
    marginTop : 20,
    fontWeight: 'bold',
    color : "#666666",
  },
  textStyle:{
    textAlign: 'center',
    fontSize: 25,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color : "#666666",
    marginTop : 20
  },
  listStyle:{
    marginTop : 20,
    flex:1
  },
  listItemText:{
    textAlign: 'left',
    fontSize: 15,
    backgroundColor: 'transparent',
    color : "#666666",
    marginLeft : 20
  },
  imageStyle:{
    width:20,
    height:20,
    marginLeft : 10,
    justifyContent : 'center',
    alignSelf : 'center'
  }

})
