import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import QuestionScreen from '../Containers/QuestionScreen'
import ResultScreen from '../Containers/ResultScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  QuestionScreen : {screen: QuestionScreen},
  ResultScreen : {screen: ResultScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header,
    gesturesEnabled: false
  }
})

export default PrimaryNav
