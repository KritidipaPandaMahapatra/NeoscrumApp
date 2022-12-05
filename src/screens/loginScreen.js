import React,{useState} from "react";
//import axios from "axios";
import  AsyncStorage  from "@react-native-community/async-storage";
import {View , Text , StyleSheet , TextInput , Button} from "react-native";
function loginScreen({ navigation }) {
  const [emailVal, setemailVal] = useState('');
    const [passwordVal, setpasswordVal] = useState('');
    const storeToken= async(allData)=> {
      try {
         await AsyncStorage.setItem("userToken",JSON.stringify(allData));
        //  console.log('AsycToken',allData.token);
        //  console.log('AsycEmail',allData.email);
        //  console.log('AsycFeedbacks',allData.Feadbacks);
        //  console.log('AsycName',allData.name);
      } catch (error) {
        console.log("Something went wrong while storing user token!", error);
      }
    }
    const fetchApiCall = () => {
        fetch('https://quiet-harbor-07900.herokuapp.com/DeveloperSignin',{
        method:'POST',
        headers:{
          Accept: 'application/json',
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": emailVal,
          "password": passwordVal,
        })
      }) .then(response => response.json())
  .then(response => {
    console.log(response);
    console.log('response received');
    alert("Login Successfull");
    const allData= response= {token:response.UserLogin.token,
                              email:response.UserLogin.email,
                              Feadbacks:response.UserLogin.Feadbacks,
                              name:response.UserLogin.name,
                              profile:response.UserLogin.profile}
    console.log('token is',allData);
    storeToken(allData);
   navigation.navigate('feedbackScreen')
  })
  .catch(err => {
    console.log(err);
    alert("Login Unsuccessfull");
  });
}

// const onSubmit = () => {
//   console.log('submitted');
//   axios
//     .post(
//       'https://quiet-harbor-07900.herokuapp.com/DeveloperSignin',
//       {
//         email:emailVal,
//         password:passwordVal
//       }
//     )
//     .then((resp)=> {
//       console.log('response', resp.data);
//       console.log('response received');
//       return true;
//     })
//     .catch(function (error) {
//       console.log('error', error);
//       return false;
//     });
//   }
  return (
  <View style={styles.container}>
    <View style={styles.title}>
   <Text style={styles.text}>Login</Text>
    <TextInput style={styles.input} value={emailVal}  onChangeText={text => setemailVal(text)} placeholder="Email*" />
    <TextInput style={styles.input} value={passwordVal}  onChangeText={text => setpasswordVal(text)} placeholder="Password*"/>
   <View style={styles.button}>
   <View style={{marginVertical: 10 , marginRight:95 , width: 78 }}>
    <Button color = '#0000ff' title="Login" onPress={fetchApiCall}/>
    </View>
    <View style={{marginVertical: 10 ,marginRight:90 }}>
    <Button color= '#0000ff' title="Go To Register" onPress={() => navigation.navigate('signupScreen')}/>
    </View>
    </View>
    </View>
  </View>
  ); 
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
    padding:20,
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderBottomWidth: 2,
    borderColor: `#c0c0c0`,
    padding: 10,
  },
  text:{
    paddingTop:50,
    fontSize: 30,
    color:'black',
  },
  title:{  
    // flex:0.8,
    marginTop: 56,
    paddingVertical: 30,
    borderWidth: 4,
    borderColor: "#c0c0c0",
    backgroundColor: "white",
    borderRadius: 6,
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    borderRadius: 15,
  }

});
export default loginScreen;