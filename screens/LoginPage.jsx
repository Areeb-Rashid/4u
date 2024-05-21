import * as React from "react";
import { GestureHandlerRootView, ScrollView} from "react-native-gesture-handler";
import { Image } from "expo-image";
import { StyleSheet, View, Text, ViewBase, Alert, ActivityIndicator } from "react-native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { TextInput, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { CommonActions } from "@react-navigation/routers";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({navigation}) => {


  const [email,setEmail] = React.useState();
  const [pass,setPass] = React.useState();
  const [loading, setLoading] = React.useState(false);


  const handleLoginPress = async ()=>{
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth,email,pass).then((userCredential)=>{
        const user = userCredential.user;
        AsyncStorage.setItem('user', JSON.stringify(user.uid))
        console.log(JSON.stringify(user.uid))
        setLoading(false)
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'BottomNavigation' }],
          })
        );

      }
    )
    } catch (error) {
      setLoading(false)
      Alert.alert(error.message)
    }

  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Lottie */}
    <LottieView 
      source={require('../assets/lottie/login.json')}
      style = {{flex:0.45 ,  backgroundColor: Color.background, paddingTop:30 }}
      autoPlay
      loop
    />
    <ScrollView style={{flex:1}} >
    <View style={styles.loginPage}>

      {/* Email Text field */}

      <View style={[styles.textFieldordinaryactivated, styles.textLayout]}>
        <View style={styles.textChildShadowBox} />
        <Ionicons name="mail-open-outline" size={25} style={{marginLeft:35, marginTop:18}} />
         <TextInput 
         style={styles.emailField}
         value= {email}
         onChangeText={setEmail}
         placeholder="Email"
         placeholderTextColor={'black'}
         />

         {/* Password text field */}
      </View>
      <View style={[styles.textFieldordinaryinactive, styles.textLayout]}>
        <View style={styles.textChildShadowBox} /> 
        <Ionicons name="lock-closed-outline" size={20} color={'black'} style={{marginTop:20,marginLeft:34}} />
        <TextInput 
         style={{marginLeft:15, width:'100%'}}
         value= {pass}
         onChangeText={setPass}
         placeholder="Password"
         secureTextEntry={true}
         placeholderTextColor={'black'}
         />      
         </View>


       {/* Login Button  */}

      <TouchableOpacity style={styles.buttonprimaryinactivebig} onPress={handleLoginPress}>
        <View style={styles.rectangle} />
        {
          loading? (<ActivityIndicator size={'large'} color={'white'} style={{top:5,left:20}} />)
          :
          (<Text style={[styles.login, styles.loginTypo]}>LOGIN</Text>)
        }
        
     </TouchableOpacity>

      {/* Google Button  */}

      <Image
        style={[styles.buttonsocialinactivegoogleIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/buttonsocialinactivegoogle.png")}
      />
    


      {/* Forget Password */}
      <Text style={[styles.forgotYourPassword, styles.headlineClr]}>
        Forgot your password?
      </Text>


      {/* Facebook Button  */}

      <Image
        style={[styles.buttonsocialinactivefacebooIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/buttonsocialinactivefacebook.png")}
      />
      <Image
        style={styles.roundArrowRightAlt24pxIcon}
        contentFit="cover"
        source={require("../assets/roundarrow-right-alt24px.png")}
      />
      <View
        style={[styles.navigationBarbigHeadline, styles.navigationPosition]}
      >

        {/* Login Text */}
        <Text style={[styles.headline, styles.headlineClr]}>LOGIN</Text>
        
        <View style={[styles.navigationBar, styles.navigationPosition]}>
          <View
            style={[styles.statusBarOnLight, styles.leftActionIconPosition]}
          >
           
          </View>

          {/* For back button */}

          {/* <Image
            style={[styles.leftActionIcon, styles.leftActionIconPosition]}
            contentFit="cover"
            source={require("../assets/left-action.png")}
          /> */}
        </View>
      </View>

    </View>
    </ScrollView>
    </GestureHandlerRootView>

  );
};

const styles = StyleSheet.create({
  navigationPosition: {
    width: 375,
    left: 0,
    position: "absolute",
  },
  textLayout: {
    height: 64,
    width: 343,
    left: 16,
    position: "absolute",
  },
  loginTypo: {
    fontFamily: FontFamily.description,
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.description_size,
    position: "absolute",
  },
  emailField:{
    marginLeft:10,
    width:'100%'
  },
  // emailTypo: {
  //   color: Color.gray,
  //   textAlign: "left",
  //   fontFamily: FontFamily.description,
  //   left: "5.83%",
  //   position: "absolute",
  //   alignItems:'center',
  //   justifyContent:'center'
  // },
  iconLayout1: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  iconLayout: {
    width: 92,
    top: 501,
    height: 64,
    position: "absolute",
  },
  headlineClr: {
    color: Color.black,
    fontFamily: FontFamily.description,
    position: "absolute",
  },
  leftActionIconPosition: {
    height: 44,
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  homeIndicatorOnLight: {
    top: 778,
    height: 34,
  },
  textChildShadowBox: {
    backgroundColor: Color.white,
    borderRadius: Border.br_9xs,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    left: "5%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  muffinsweetgmailcom: {
    top: "45.31%",
    color: Color.colorDarkslategray,
    textAlign: "left",
    left: "5.83%",
    fontFamily: FontFamily.description,
  },
  email: {
    top: "21.88%",
    fontSize: FontSize.font_size,
  },
  outlineCheck24pxIcon: {
    height: "37.5%",
    width: "7%",
    top: "31.25%",
    right: "6.12%",
    bottom: "31.25%",
    left: "86.88%",
  },
  textFieldordinaryactivated: {
    top: 213,
    flexDirection:'row'
    
  },
  // password: {
  //   top: "34.38%",
  //   fontWeight: "500",
  //   lineHeight: 20,
  //   fontSize: FontSize.description_size,
  // },
  textFieldordinaryinactive: {
    top: 285,
    flexDirection:'row'
  },
  rectangle: {
    shadowColor: "rgba(211, 38, 38, 0.25)",
    borderRadius: Border.br_6xl,
    backgroundColor: Color.primary,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    left: "5%",
    position: "absolute",
    width: "100%",
  },
  login: {
    top: "29.17%",
    left: "50%",
    color: Color.white,
    textAlign: "center",
  },
  buttonprimaryinactivebig: {
    top: 417,
    height: 48,
    width: 343,
    left: 16,
    position: "absolute",
  },
  buttonsocialinactivegoogleIcon: {
    left: 88,
  },
  orLoginWith: {
    top: 659,
    left: 95,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.description_size,
  },
  forgotYourPassword: {
    top: 365,
    left: 200,
    textAlign: "right",
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.description_size,
  },
  buttonsocialinactivefacebooIcon: {
    left: 196,
  },
  roundArrowRightAlt24pxIcon: {
    top: 363,
    left: 350,
    width: 24,
    height: 24,
    position: "absolute",
    overflow: "hidden",
  },
  headline: {
    top: 90,
    left: 14,
    fontSize: FontSize.headline_size,
    fontWeight: "700",
    textAlign: "left",
    
  },
 
  statusBarOnLight: {
    top: 0,
  },
  leftActionIcon: {
    top: 44,
    maxWidth: "100%",
    height: 44,
    overflow: "hidden",
  },
  navigationBar: {
    height: 88,
    top: 0,
    overflow: "hidden",
  },
  navigationBarbigHeadline: {
    height: 160,
    top: 0,
    overflow: "hidden",
  },
  loginPage: {
    backgroundColor: Color.background,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",

  },
});

export default LoginPage;
