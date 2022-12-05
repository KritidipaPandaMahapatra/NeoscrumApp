import React,{useEffect, useState} from "react";
import axios from "axios";
import  AsyncStorage  from "@react-native-community/async-storage";
import {View , Text , StyleSheet ,ScrollView , TouchableOpacity, Image} from "react-native";
function profileScreen(props) {
    const {navigation}=props;
  const [taskItems, setTaskItems] = useState([]);
  const [Email, setEmail] = useState([]);
  const [userName, setName] = useState([]);
 const [userImage,setprofileimage] = useState([]);
  // console.log('usestate',Email);
  // console.log('usestate',taskItems);
    const getFeedback=(async(userData)=> {
      // console.log('getAsyctoken',allData);
        try {
          let userTokenData = await AsyncStorage.getItem("userToken",userData);
          let data =JSON.parse(userTokenData);
          let name=data.name;
          let email=data.email;
          let profileimage=data.image;
          let feadback=data.Feedback;
          // console.log('getAsycname',name);
          // console.log('getAsycname',email);
          // console.log('getAsycEmail',profileimage);
           setName(name);
           setEmail(email);
           setprofileimage(profileimage);
           setTaskItems(feadback);
           onSubmit();
          // let userFeedbackData = await AsyncStorage.getItem("userToken",Feadbacks);
          // let dataFeedback =JSON.parse(userFeedbackData);
          // console.log('getAsycfeedback',dataFeedback);
          // onSubmit(dataFeedback);
          // setTaskItems(dataFeedback);
          // addTask(dataFeedback);
          // addEmail(userEmail);
        } catch (error) {
          console.log("Something went wrong while retrieving user token!", error);
        }
      })
    useEffect(() => {
      getFeedback();
    }, []);
    const onSubmit = () => {
      console.log('submitted');
      axios
        .post(
         'https://quiet-harbor-07900.herokuapp.com/post_GetAllRecievers',
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
        <Text style={{color:'black',fontWeight:'bold'}}>{userName}</Text> 
         <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.Button} onPress={() => navigation.navigate('feedbackScreen')}>Add Feedback</Text>
        <Text style={styles.button}  onPress={() =>  onLogout()}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </View> 
    <ScrollView style={styles.scrollView}>
     <View style={styles.RectangleShapeView}>
         <View style={styles.rect1}>
         <Text style={styles.text}>Feedbacks</Text>
         <Text style={styles.text}>6 Hour</Text>
         </View>
         <View style={styles.rect2}  >
         <Text style={styles.feedback} >{taskItems}</Text>
         </View>
         <View style={styles.rect3}>
         <Text style={styles.sender}>send By:{Email}</Text>
         <Text style={styles.sender}>Posted On:17-December-2021</Text>
         </View>
     </View>
      </ScrollView>
  </View>
  ); 
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    height:60,
    backgroundColor:'#ffffff',
    borderBottomWidth:2,
    borderColor: '#c0c0c0',
 },
 box: {
    flex: 1,
    alignItems:'center'
  },
  RectangleShapeView: {
    marginTop: 20,
    width: 165*2 ,
    height: 250,
    borderWidth:2,
    marginHorizontal:20,
    },
  scrollView: {
    marginHorizontal: 10,
  },
  rect1:{
     flexDirection:'row',
     width:150*2,
     height: 30,
     backgroundColor:'#90ee90',
     marginTop:10,
     marginHorizontal:10,
     justifyContent:'space-between'
  },
  text:{
      color:'black',
      marginHorizontal:10,
      fontWeight:'bold'
  },
  rect2:{
    flexDirection:'row',
    width:150*2,
    height: 100,
    backgroundColor:'#808080',
    marginTop:10,
    marginHorizontal:10,
    justifyContent:'center',
    alignItems:'center'
 },
  feedback:{
     color:'white',
     marginHorizontal:10
 },
  rect3:{
    width:150*2,
    height: 50,
    backgroundColor:'#add8e6',
    marginTop:10,
    marginHorizontal:10,
 },
  sender:{
     color:'white',
    },
  headerelement:{
    flexWrap:'wrap',
    flexDirection:'row',
    alignItems:'center',
  },
    Button:{
    backgroundColor:'#0000ff',
    color:'white',
    width:95,
    height:25,
    marginHorizontal:110,
    borderRadius:7,
    marginRight:20
    },
    button:{
    backgroundColor:'#ff0000',
    color:'white',
    width:55,
    height:25,
    borderRadius:7,
    }
});
export default profileScreen;