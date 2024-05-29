import * as React from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { Query, doc, collection, getDoc, getFirestore } from "firebase/firestore";
import { auth } from "./firebase";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { CommonActions } from "@react-navigation/routers";

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      name: 'Loading....',
      email: 'Loading....',
    };
  }

  componentDidMount() {
    this.getImage();
  }

  getImage = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const firestore = getFirestore();
        const userDocRef = doc(collection(firestore, 'users'), userId);
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          this.setState({
            image: userData.image,
            name: userData.name,
            email: userData.email,
          });
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("No user is currently signed in.");
      }
    } catch (error) {
      console.error("Error fetching user image:", error);
    }
  };

  handleLogout = () => {
    Alert.alert('Logout', "Sure want to logout?",
      [
        { text: 'No' },
        { text: "Yes", onPress: this.logout }
      ]
    );
  };

  logout = () => {
    const { navigation } = this.props;
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'OnBoardPage' }]
      })
    );
  };

  render() {
    const { image, name, email } = this.state;

    return (
      <GestureHandlerRootView style={{ flex: 1 }} >
        <View style={styles.myProfile}>
          <View style={[styles.navigationBarbigHeadline, styles.barPosition]}>
            <Text style={[styles.headline, styles.labelTypo2]}>Your profile</Text>
          </View>

          <View style={[styles.tabBar, styles.barPosition]}></View>
          <Image
            style={[styles.avaIcon, styles.avaIconPosition]}
            contentFit="cover"
            source={{ uri: image }}
          />
          <Text style={[styles.matildaBrown]}>
            {name}
          </Text>
          <Image
            style={[styles.baselineLocalShipping24pxIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/baselinelocal-shipping24px.png")}
          />
          <Text style={[styles.matildabrownmailcom, styles.labelTypo]}>
            {email}
          </Text>
          <View style={[styles.parent, styles.groupParentLayout]}>
            <View style={styles.view}>
              <Text style={[styles.shippingAddresses, styles.labelTypo2]}>
                Shipping addresses
              </Text>
              <Text style={[styles.ddresses, styles.haveTypo]}>3 ddresses</Text>
            </View>
            <View style={[styles.divider, styles.barPosition]} />
            <Image
              style={[styles.chevronRightIcon, styles.reviewsFor4Position]}
              contentFit="cover"
              source={require("../assets/chevron-right.png")}
            />
          </View>
          <View style={[styles.group, styles.groupParentLayout]}>
            <View style={[styles.view1, styles.viewPosition]}>
              <Text style={[styles.shippingAddresses, styles.labelTypo2]}>
                Promocodes
              </Text>
            </View>
            <View style={[styles.divider, styles.barPosition]} />
            <Image
              style={[styles.chevronRightIcon, styles.reviewsFor4Position]}
              contentFit="cover"
              source={require("../assets/chevron-right.png")}
            />
          </View>
          <TouchableOpacity onPress={this.handleLogout}>
            <View style={[styles.container, styles.groupParentLayout]}>
              <View style={[styles.view2, styles.viewPosition]}>
                <Text style={[styles.shippingAddresses, styles.labelTypo2]}>
                  Logout
                </Text>
              </View>
              <Image
                style={[styles.chevronRightIcon, styles.reviewsFor4Position]}
                contentFit="cover"
                source={require("../assets/chevron-right.png")}
              />
            </View>
          </TouchableOpacity>
          <View style={[styles.lineView, styles.groupParentLayout]}>
            <View style={[styles.view3, styles.viewPosition]}>
              <Text style={[styles.shippingAddresses, styles.labelTypo2]}>
                My reviews
              </Text>
              <Text style={[styles.reviewsFor4, styles.reviewsFor4Position]}>
                Reviews for 4 items
              </Text>
            </View>
            <View style={[styles.divider, styles.barPosition]} />
            <Image
              style={[styles.chevronRightIcon, styles.reviewsFor4Position]}
              contentFit="cover"
              source={require("../assets/chevron-right.png")}
            />
          </View>
          <View style={[styles.dividerParent, styles.groupParentLayout]}>
            <View style={[styles.divider, styles.barPosition]} />
            <View style={[styles.view4, styles.viewPosition]}>
              <Text style={[styles.shippingAddresses, styles.labelTypo2]}>
                Payment methods
              </Text>
              <Text style={[styles.youHaveSpecial, styles.reviewsFor4Position]}>
                Visa **34
              </Text>
            </View>
            <Image
              style={[styles.chevronRightIcon, styles.reviewsFor4Position]}
              contentFit="cover"
              source={require("../assets/chevron-right.png")}
            />
          </View>
          <View style={[styles.dividerGroup, styles.groupParentLayout]}>
            <View style={[styles.divider, styles.barPosition]} />
            <View style={styles.view5}>
              <Text style={[styles.shippingAddresses, styles.labelTypo2]}>
                My orders
              </Text>
              <Text style={[styles.alreadyHave12, styles.haveTypo]}>
                Already have 12 orders
              </Text>
            </View>
            <Image
              style={[styles.chevronRightIcon, styles.reviewsFor4Position]}
              contentFit="cover"
              source={require("../assets/chevron-right.png")}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    );
  }
}

const styles = StyleSheet.create({
  barPosition: {
    width: 375,
    left: 0,
    position: "absolute",
  },
  labelTypo2: {
    textAlign: "left",
    fontFamily: FontFamily.description,
  },
  batteryIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  textPosition: {
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  iconLayout: {
    height: 24,
    width: 24,
  },
  tabbarPosition: {
    top: "0%",
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  tabsLayout: {
    height: 42,
    position: "absolute",
  },
  profilePosition: {
    height: 30,
    width: 30,
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  labelTypo1: {
    fontSize: FontSize.size_3xs,
    top: 32,
  },
  labelTypo: {
    color: Color.gray,
    textAlign: "left",
    fontFamily: FontFamily.description,
    position: "absolute",
  },
  heartPosition: {
    left: 7,
    height: 30,
    width: 30,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  tab3BagLayout: {
    width: 30,
    height: 42,
    top: 0,
    position: "absolute",
  },
  avaIconPosition: {
    top: 164,
    position: "absolute",
    borderRadius: 100,
    // right:0 
  },
  groupParentLayout: {
    height: 72,
    width: 375,
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  haveTypo: {
    fontSize: FontSize.font_size,
    color: Color.gray,
    textAlign: "left",
    fontFamily: FontFamily.description,
  },
  reviewsFor4Position: {
    top: 24,
    position: "absolute",
  },
  viewPosition: {
    height: 35,
    top: 19,
    left: 15,
    position: "absolute",
  },
  headline: {
    top: 106,
    left: 14,
    fontSize: FontSize.headline_size,
    fontWeight: "700",
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.description,
    position: "absolute",
  },
  batteryIcon: {
    width: "6.49%",
    right: "4.61%",
    left: "88.89%",
    bottom: "24.14%",
    top: "17.24%",
    height: "58.62%",
    position: "absolute",
  },
  text: {
    height: "100%",
    top: "0%",
    fontSize: FontSize.size_xs,
    color: Color.gray,
    textAlign: "left",
    fontFamily: FontFamily.description,
  },
  text1: {
    width: "40.27%",
    top: "15.52%",
    left: "59.73%",
    height: "70%",
    textAlign: "left",
    fontFamily: FontFamily.description,
    fontSize: FontSize.size_xs,
    color: Color.gray,
    position: "absolute",
  },
  statusBar: {
    height: 22,
    top: 0,
    left: 0,
    position: "absolute",
    overflow: "hidden",
    width: 375,
  },
  myProfile: {
    backgroundColor: Color.white,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
  navigationBarbigHeadline: {
    height: 148,
    top: 0,
    left: 0,
    width: 375,
    position: "absolute",
  },
  tabBar: {
    top: 740,
    height: 72,
    left: 0,
    width: 375,
    position: "absolute",
  },
  avaIcon: {
    left: 30,
    width: 100,
    height: 100,
  },
  matildaBrown: {
    left: 145,
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.description,
    top:190
  },
  baselineLocalShipping24pxIcon: {
    top: 498,
    left: 25,
    position: "absolute",
  },
  matildabrownmailcom: {
    top: 212,
    left: 145,
    fontSize: FontSize.size_xl,
  },
  shippingAddresses: {
    fontSize: FontSize.font_size,
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.description,
    position: "absolute",
    left: 0,
    top: 0,
  },
  ddresses: {
    top: 17,
    left: 0,
    position: "absolute",
  },
  view: {
    height: 35,
    top: 19,
    left: 15,
    position: "absolute",
  },
  divider: {
    height: 1,
    backgroundColor: Color.whitesmoke,
    left: 0,
    width: 375,
    top: 0,
    position: "absolute",
  },
  chevronRightIcon: {
    left: 333,
    width: 24,
    height: 24,
  },
  parent: {
    top: 405,
  },
  view1: {
    height: 35,
    top: 19,
    left: 15,
    position: "absolute",
  },
  group: {
    top: 477,
  },
  view2: {
    top: 20,
  },
  container: {
    top: 621,
  },
  reviewsFor4: {
    fontSize: FontSize.font_size,
    color: Color.gray,
    textAlign: "left",
    fontFamily: FontFamily.description,
    left: 0,
  },
  view3: {
    height: 35,
    top: 19,
    left: 15,
    position: "absolute",
  },
  lineView: {
    top: 549,
  },
  youHaveSpecial: {
    fontSize: FontSize.font_size,
    color: Color.gray,
    textAlign: "left",
    fontFamily: FontFamily.description,
    left: 0,
  },
  view4: {
    height: 35,
    top: 19,
    left: 15,
    position: "absolute",
  },
  dividerParent: {
    top: 333,
  },
  alreadyHave12: {
    top: 17,
    left: 0,
    position: "absolute",
  },
  view5: {
    height: 35,
    top: 19,
    left: 15,
    position: "absolute",
  },
  dividerGroup: {
    top: 261,
  },
});

export default MyProfile;
