//---- ---RN Animation Example1-------
// import React, { Component } from 'react'
// import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native'

// class Animations extends Component {
//    componentWillMount = () => {
//       this.animatedWidth = new Animated.Value(50)
//       this.animatedHeight = new Animated.Value(100)
//    }
//    animatedBox = () => {
//       Animated.timing(this.animatedWidth, {
//          toValue: 200,
//          duration: 1000,
//          useNativeDriver: true ,
//       }).start()
//       Animated.timing(this.animatedHeight, {
//          toValue: 500,
//          duration: 500,
//          useNativeDriver: true ,
//       }).start()
//    }
//    render() {
//       const animatedStyle = { width: this.animatedWidth, height: this.animatedHeight }
//       return (
//          <TouchableOpacity style = {styles.container} onPress = {this.animatedBox}>
//             <Animated.View style = {[styles.box, animatedStyle]}/>
//          </TouchableOpacity>
//       )
//    }
// }
// export default Animations

// const styles = StyleSheet.create({
//    container: {
//       justifyContent: 'center',
//       alignItems: 'center'
//    },
//    box: {
//       backgroundColor: 'blue',
//       width: 50,
//       height: 100
//    }
// })

//------Example2--------
// import React, { Component } from 'react';  
// import {StyleSheet, AppRegistry,Text, View,Animated,Easing} from 'react-native';  
  
// export default class DisplayAnImage extends Component {  
//     constructor () {  
//         super()  
//         this.spinValue = new Animated.Value(0)//declare spinValue as a new Animated.Value and pass 0 (zero) in it.  
//     }  
//     componentDidMount () {  
//         this.spin()  
//     }  
//     //create a spin method and call it from componentDidMount  
//     spin () {  
//         this.spinValue.setValue(0) //set spinValue to 0 (zero)  
//         Animated.timing(    //calling Animated.timing() method, it takes two arguments:  
//             this.spinValue, // value  
//             {           // and config object  
//                 toValue: 1, //and setting spinValue to 1  
//                 duration: 4000, //within 4000 milliseconds  
//                 easing: Easing.linear ,
//                 useNativeDriver: true , 
//             }  
//         ).start(() => this.spin())  
//     }  
//     render () {  
//         const spin = this.spinValue.interpolate({  
//             inputRange: [0, 1],  
//             outputRange: ['0deg', '360deg']  
//         })  
//         return (  
//             <View style={styles.container}>  
//                 <Animated.Image  
//                     style={{  
//                         width: 227,  
//                         height: 200,  
//                         transform: [{rotate: spin}] }}  
//                         source={require('./MyReactNativeApp/img/React-icon.svg.png')}
//                 />  
//             </View>  
//         )  
//     }  
// }  
// const styles = StyleSheet.create({  
//     container: {  
//         flex: 1,  
//         justifyContent: 'center',  
//         alignItems: 'center'  
//     }  
// })  
//------Example3--------
import React, { Component } from 'react';  
import {StyleSheet, AppRegistry,Text, View,Animated,Easing} from 'react-native';  
  
export default class DisplayAnImage extends Component {  
    constructor () {  
        super()  
        this.animatedValue = new Animated.Value(0)  
    }  
    componentDidMount () {  
        this.animate()  
    }//animate method is call from componentDidMount  
    animate () {  
        this.animatedValue.setValue(0)  
        Animated.timing(  
            this.animatedValue,  
            {  
                toValue: 1,  
                duration: 2000,  
                easing: Easing.linear ,
                useNativeDriver: false, 
            }  
        ).start(() => this.animate())  
    }  
  
    render() {  
        const marginLeft = this.animatedValue.interpolate({  
            inputRange: [0, 1],  
            outputRange: [0, 300]  
        })  
        const opacity = this.animatedValue.interpolate({  
            inputRange: [0, 0.5, 1],  
            outputRange: [0, 1, 0]  
        })  
        const movingMargin = this.animatedValue.interpolate({  
            inputRange: [0, 0.5, 1],  
            outputRange: [0, 300, 0]  
        })  
        const textSize = this.animatedValue.interpolate({  
            inputRange: [0, 0.5, 1],  
            outputRange: [18, 32, 18]  
        })  
        const rotateX = this.animatedValue.interpolate({  
            inputRange: [0, 0.5, 1],  
            outputRange: ['0deg', '180deg', '0deg']  
        })  
  
  
        return (  
            <View style={styles.container}>  
                <Animated.View //returns Animated.View  
                    style={{  
                        marginLeft,  
                        height: 30,  
                        width: 40,  
                        backgroundColor: 'red'}} />  
                <Animated.View  
                    style={{  
                        opacity,  
                        marginTop: 10,  
                        height: 30,  
                        width: 40,  
                        backgroundColor: 'blue'}} />  
                <Animated.View  
                    style={{  
                        marginLeft: movingMargin,  
                        marginTop: 10,  
                        height: 30,  
                        width: 40,  
                        backgroundColor: 'orange'}} />  
                <Animated.Text // returns Animated.Text  
                    style={{  
                        fontSize: textSize,  
                        marginTop: 10,  
                        color: 'green'}} >  
                    Animated Text!  
                </Animated.Text>  
                <Animated.View   
                    style={{  
                        transform: [{rotateX}],  
                        marginTop: 50,  
                        height: 30,  
                        width: 40,  
                        backgroundColor: 'black'}}>  
                    <Text style={{color: 'white'}}>Hello from TransformX</Text>  
                </Animated.View>  
            </View>  
        )  
    }  
}  
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        paddingTop: 150  
    }  
})   





//---- ---Neoscrum-------
// import * as React from 'react';
// import signupScreen from './src/screens/signupScreen';
//  import loginScreen from './src/screens/loginScreen';
// import feedbackScreen from './src/screens/feedbackScreen';
// import profileScreen from './src/screens/profileScreen';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home" screenOptions={{header:()=>null}}>
//         <Stack.Screen name="loginScreen" component={loginScreen}/>
//         <Stack.Screen name="signupScreen" component={signupScreen}/> 
//          <Stack.Screen name="profileScreen" component={profileScreen}/>
//         <Stack.Screen name="feedbackScreen" component={feedbackScreen}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

//export default App;