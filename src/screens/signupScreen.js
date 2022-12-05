import React, { useState } from "react";
import axios from "axios";
import ImagePicker from 'react-native-image-crop-picker';
import {View , Text , StyleSheet , TextInput ,TouchableOpacity ,Image} from "react-native";
function signupScreen({ navigation }) {
 const [email, setemail] = useState('');
 const [name, setname] = useState('');
 const [emailError, setemailError] = useState('');
 const [nameError, setnameError] = useState('');
 const [profileImage,  setprofileImage] = useState({});
const onSubmit = () => {
  if (empNameValidator() && emailValidator()) {
 const imageData = new FormData();
 imageData.append('email', email);
 imageData.append('name', name);
//  imageData.append(' profileImage', {
//     name: profileImage.name,
//     type: profileImage.type,
//     uri: Platform.OS === 'ios' ? 
//     profileImage.uri.replace('file://', '')
//          : profileImage.uri,
//   });
 imageData.append('profileImage'
 , {
   uri: profileImage.path,
   type: profileImage.mime,
   name: profileImage.path.replace(/^.*[\\\/]/, ''),
   filename: profileImage.path.replace(/^.*[\\\/]/, ''),
 }
 );
 console.log(imageData);
const config = {
  headers: {
    'Content-Type': 'multipart/form-data; charset=utf-8;',
  },
};
axios
  .post(
    'https://quiet-harbor-07900.herokuapp.com/register',
    imageData,
    config,
  )
  .then((resp)=> {
    if (resp.data.message !== '') {
      alert(resp.data.password);
     navigation.navigate('loginScreen');
    }
    console.log('response', resp.data);
    console.log('response received');
    return true;
  })
  .catch(function (error) {
    console.log('error', error);
    return false;
  });
}else{alert("Please fill the data correctly ")}
};
const empNameValidator = () => {
  if (name.length == 0) {
      setnameError('This feild is required');
    return false;
  } else {
    setnameError('');
    return true;
  }
};
const emailValidator = () => {
  if (email.length == 0) {
    setemailError('This feild is required');
    return false;
  } else {
    setemailError('');
    return true;
  }
};
const choosePhotoFromLibrary = () => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => { 
     console.log(image);
    setprofileImage(image);
  })
};
return (
    <View style={styles.container}>
    <View style={styles.title}>
    <Text  style={styles.text}>Enter New Developer</Text>
    <TextInput style={styles.input} placeholder="Employee Name*" value={name} onChangeText={text => setname(text)} onBlur={() => empNameValidator()}/>
    <Text style={{color: 'red'}}>{nameError}</Text>
    <TextInput style={styles.input} placeholder="Email*" value={email} onChangeText={text => setemail(text)} onBlur={() => emailValidator()} />
    <Text style={{color: 'red'}}>{emailError}</Text>
    <TouchableOpacity >
      <View style={styles.button}>
      <Text style={{color:'black'}}  onPress={() => choosePhotoFromLibrary()}  >Choose File</Text> 
      </View>
      <View style={styles.buttons}>
      <Text style={{color:'white'}}  onPress={onSubmit} >Submit</Text>
      </View> 
      </TouchableOpacity>
    </View>
    {/* <Image source={{profileImage}} style={{height:120,width:120,borderWidth:2,borderRadius:15,borderColor:'black'}}/> */}
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
    marginVertical: 20 ,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor : '#808080',
    height:30,
    width:100,
    marginRight:150,
    marginVertical:20
  },
  buttons:{
    backgroundColor :'#0000ff',
    height:30,
    width:60,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
  },
});
export default signupScreen;