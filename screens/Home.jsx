import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Text, StyleSheet, Dimensions, View, RefreshControl, TouchableOpacity, Alert } from "react-native";
import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "./firebase";
import { collection, getFirestore, doc, getDoc } from "firebase/firestore";

const Home = ({navigation}) => {
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;

  const [refreshing, setRefreshing] = useState(false);
  const [seller, setSeller] = useState(false);

  const checkSeller = async ()=>{
    const user = auth.currentUser;
    const uid = user.uid;
    const firestore = getFirestore();
    const userDocRef = doc(collection(firestore,'users'), uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()){
      const userData = userDoc.data();
      const accountType = userData.accountType;
      if(accountType == 'Seller' ){
        setSeller(true)
      }else{
        setSeller(false)
      }
    }else{
      Alert.alert('User does not exist ')
    }

  }

  useEffect(()=>{
    checkSeller()
  },[])

  const handleFAB = ()=>{
    navigation.navigate('AddItem')
  }
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000); 
  };

  const Row1Data = [
    { key: 1, text: "Morning Dress", imageUrl: require("../assets/photo4.png") },
    { key: 2, text: "Evening Dress", imageUrl: require("../assets/photo.png") },
    { key: 3, text: "Night Dress", imageUrl: require("../assets/photo2.png") },
    { key: 4, text: "Sport Dress", imageUrl: require("../assets/photo7.png") }
  ];

  const Row2Data = [
    { key: 1, text: "Morning", imageUrl: require("../assets/photo5.png") },
    { key: 2, text: "Evening", imageUrl: require("../assets/photo6.png") },
    { key: 3, text: "Night", imageUrl: require("../assets/photo17.png") },
    { key: 4, text: "Sport", imageUrl: require("../assets/photo6.png") }
  ];

  const CategoriesData = [
    { key: 1, text: "Kids", imageUrl: require("../assets/photo5.png") },
    { key: 2, text: "Vehicles", imageUrl: require("../assets/photo5.png") },
    { key: 3, text: "Mobiles", imageUrl: require("../assets/photo5.png") },
    { key: 4, text: "Jeans", imageUrl: require("../assets/photo5.png") },
    { key: 5, text: "Clothes", imageUrl: require("../assets/photo5.png") },

  ]

  const Row1Render = ({ item }) => {
    return (
      <View style={styles.rowItem1}>
        <Image style={styles.imageRow1} source={item.imageUrl} resizeMode="center" />
        <Text style={styles.textR1}>{item.text}</Text>
      </View>
    );
  };

  const Row2Render = ({ item }) => {
    return (
      <View style={styles.rowItem2}>
        <Image style={styles.imageRow2} source={item.imageUrl} resizeMode="center" />
        <Text style={styles.textR2}>{item.text}</Text>
      </View>
    );
  };

  const CategoriesRender = ({ item }) => {
    return (
      <View style={{marginRight:10, width:width*0.3, height:height*0.35}}>
        <Image style={styles.cateImage} source={item.imageUrl} resizeMode="cover" />
        <Text style={styles.categoriesItemText}>{item.text}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    firstBanner: {
      width: width,
      // height:height
    },
    firstBannerText: {
      top:height*0.18,
      position: "absolute",
      color: "white",
      fontSize: 23,
      fontWeight: "bold",
    },
    container: {
      flex: 1,
    },
    row1: {
      width: width,
      // height:height*0.30 
      // backgroundColor:'red',
      height:height*0.4
    },
    rowItem1: {
      width: width * 0.3,
      marginHorizontal: 20,
      height: height * 0.7
    },
    textR1: {
      fontSize: 16,
      textAlign: "center",
      top: height * 0.34,
      fontWeight: 'bold'
    },
    imageRow1: {
      position: 'absolute',
      top: height * 0.09,
      height: height * 0.23,
      width: width * 0.4,
      overflow: 'hidden',
    },
    womenText: {
      position: 'absolute',
      top: height * 0.04,
      fontWeight: 'bold',
      fontSize: 30,
      left: 15
    },
    menText: {
      position: 'absolute',
      top: height * 0.001,
      fontWeight: 'bold',
      fontSize: 30,
      left: 15
    },
    imageRow2: {
      position: 'absolute',
      top: height * 0.06,
      height: height * 0.23,
      width: width * 0.4,
      overflow: 'hidden',
    },
    textR2: {
      fontSize: 16,
      textAlign: "center",
      top: height * 0.27,
      fontWeight: 'bold'
    },
    row2: {
      width: width,
    },
    rowItem2: {
      width: width * 0.3,
      marginHorizontal: 20,
      height: height *0.32
    },
    cateImage:{
      position: 'absolute',
      top: height * 0.12,
      height: 100,
      width: 100,
      overflow: 'hidden',
      borderRadius:50
    },
    category:{
      width:width,

    },
    categoriesText:{
      top:height*0.045,
      fontWeight: 'bold',
      fontSize: 30,
      marginLeft: 15,
      position:"absolute",

    },
    categoriesItemText: {
      position:'absolute',
      top:height*0.24,
      padding:20,
      fontWeight:'bold',
      paddingLeft:40
      
    },
    fab: {
      position: 'absolute',
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      right: 20,
      bottom: 30,
      backgroundColor: 'red',
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    fabIcon: {
      fontSize: 24,
      color: 'white',
    },
    
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container} >
      <ScrollView 
      style={{flex:1}}
      showsVerticalScrollIndicator={false} 
       refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#0000ff']} 
          tintColor={'#0000ff'} 
        />
      }

      >
        <SafeAreaView >
          {/* First Image  */}
          <Image style={styles.firstBanner} source={require("../assets/small-banner.png")} />
          <Text style={styles.firstBannerText}>Street Clothes</Text>

          {/* Row 1 */}
          <View style={styles.row1}>
            <Text style={styles.womenText}>
              Women (Coffee)
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false} 
              data={Row1Data}
              renderItem={Row1Render}
              keyExtractor={(item) => item.key.toString()}
            />
          </View>

          {/* Row 2 */}
          <View style={styles.row2}>
            <Text style={styles.menText}>
              Men's Collection
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false} 
              data={Row2Data}
              renderItem={Row2Render}
              keyExtractor={(item) => item.key.toString()}
            />
          </View>

          {/* Categories  */}
          <View style={styles.category}>
          <Text style={styles.categoriesText}>
             Categories
          </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false} 
          data={CategoriesData}
          renderItem={CategoriesRender}
          keyExtractor={(item) => item.key.toString()}
        />
          </View>
        </SafeAreaView>
      </ScrollView>
      {seller && (
    <TouchableOpacity style={styles.fab} onPress={handleFAB}>
    <Ionicons name="add" style={styles.fabIcon} />
    </TouchableOpacity>
)}


      </View>
    </GestureHandlerRootView>
  );
};

export default Home;
