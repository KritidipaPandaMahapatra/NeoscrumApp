import React, { useState ,useEffect} from "react";
import axios from "axios";
import  AsyncStorage  from "@react-native-community/async-storage";
import {View , Text , StyleSheet ,ScrollView , TouchableOpacity,  TextInput ,Image} from "react-native";
function feedbackScreen(props) {
  const {navigation}=props;
 const [Feadbacks, setFeadbacks] = useState('');
 const [userName, setName] = useState([]);
 const [userEmail, setEmail] = useState([]);
 const [userImage,setprofileimage] = useState([]);
    const getToken=(async(allData)=> {
      // console.log('getAsyctoken',allData);
        try {
          let userTokenData = await AsyncStorage.getItem("userToken",allData);
          let data =JSON.parse(userTokenData);
          // console.log('getAsyctoken',data.token);
          // console.log('getAsycEmail',data.email);
          let name=data.name;
          let email=data.email;
          let profileimage=data.profile;
          //console.log('getAsycname',name);
           setName(name);
           setEmail(email);
           setprofileimage(profileimage);
           fetchApi(data);
        } catch (error) {
          console.log("Something went wrong while retrieving user token!", error);
        }
      })
      useEffect(() => {
        getToken();
      }, []);
      const userData={name:userName,email:userEmail,image:userImage,Feedback:Feadbacks};
     // console.log('userData',userData);
      const  storeFeedback=async(userData)=> {
        try {
           await AsyncStorage.setItem("userToken",JSON.stringify(userData));
           console.log('AsycFeedback',userData.Feadbacks);
           alert("Feedback Saved Successfully");
           navigation.navigate('profileScreen');
        } catch (error) {
          console.log("Something went wrong while storing user token!", error);
        }
      }
  const fetchApi = (data) => {
    console.log('submitted');
    var token=data.token;
    var email=data.email;
    //console.log(token);
    const config = {
      headers: {Authorization: 'Bearer ${token}'},
    };
    axios
      .post(
       'https://quiet-harbor-07900.herokuapp.com/post_addFeadback',
        {
          token,
          email,
          feadback:Feadbacks,
          config
        }
      )
      .then((resp)=> {
        console.log('response', resp.data);
        console.log('response received');
        return true;
      })
      .catch(function (error) {
        console.log('error', error);
        return false;
      });
    }
    const onLogout= async()=>{
      try {
          await AsyncStorage.clear();
          console.log('Done');
        } catch (error) {
          console.log(error);
        }
        navigation.navigate('loginScreen');
      }
return (
  <View style={styles.container}>
    <View style={styles.header}>
    <TouchableOpacity style={styles.headerelement}>
       <Image style={{height:40,width:40,borderRadius:20,  marginHorizontal:5,marginTop:10,}} source ={{uri:`https://quiet-harbor-07900.herokuapp.com${userImage}`}} />
        <Text style={{color:'black',fontWeight:'bold',marginTop:10 }}>{userName}</Text>
        <Text style={styles.button}  onPress={() =>  onLogout()}>Log Out</Text>
      </TouchableOpacity>
    </View> 
    <ScrollView>
     <View style={styles.RectangleShapeView} >
     <Image style={{height:80,width:80,}} source ={{uri:`https://quiet-harbor-07900.herokuapp.com${userImage}`}} />
     <Text style={styles.text}>{userName}</Text>
     <TextInput style={styles.input} value={Feadbacks} onChangeText={text => setFeadbacks(text)}/>
     <TouchableOpacity style={styles.item}>
     <Text style={styles.buton} onPress={() => storeFeedback(userData)} >Submit Feedback</Text>
     </TouchableOpacity>
     </View>
     </ScrollView>
  </View>
  ); 
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#b0e0e6'
  },
  header:{
    height:60,
    backgroundColor:'#ffffff',
 },
 box: {
    flex: 1,
    alignItems:'center'
  },
  RectangleShapeView: {
    flexDirection:'column',
    marginTop: 20,
    width: 170*2 ,
    height: 280,
    borderWidth:2,
    borderColor:'#5f9ea0',
    marginHorizontal:20,
    backgroundColor:'white',
    borderRadius:3,
    justifyContent:'center',
    alignItems:'center'
    },
  scrollView: {
    marginHorizontal: 10,
  },
  headerelement:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
    button:{
    backgroundColor:'#ff0000',
    marginLeft:200,
    marginTop:10,
    color:'white',
    width:55,
    height:25,
    borderRadius:5,
    },
    circle:{
    width: 60,
    height: 60,
    marginHorizontal:130,
    marginTop:45,
    backgroundColor: '#8a2be2',
    borderRadius: 40,
    borderWidth: 0.5, 
    },
    text:{
      marginHorizontal:100,
      color:'black',
      fontWeight:'bold',
      fontSize:15,
      padding:10
    },
    input:{
      width:130*2,
      height: 50,
      borderWidth: 2,
      borderColor: '#c0c0c0',
      marginTop:10,
      marginHorizontal:35,
    },
    item:{
    padding:20,
    marginLeft:160,
    justifyContent:'center',
    alignItems:'center'
    },
    buton:{
      backgroundColor:'#0000ff',
      color:'white',
      height: 25,
      borderRadius:5,
    }
});
export default feedbackScreen;