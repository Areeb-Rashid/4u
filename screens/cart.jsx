import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert, RefreshControl, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { auth } from './firebase';
import { getFirestore, doc, getDoc, collection, updateDoc } from 'firebase/firestore';

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  const fetchCartItems = async () => {
    try {
      const currentUser = auth.currentUser;
      const userId = currentUser.uid;
      const firestore = getFirestore();

      const userDocRef = doc(collection(firestore, 'users'), userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setCartItems(userData.cart || []);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      Alert.alert('Error', 'Could not fetch cart items');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Refresh indicator 
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCartItems();
    setRefreshing(false);
  };

  // Delete item from cart
  const deleteItemFromCart = async (itemToDelete) => {
    try {
      const currentUser = auth.currentUser;
      const userId = currentUser.uid;
      const firestore = getFirestore();
      
      const userDocRef = doc(collection(firestore, 'users'), userId);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const cartIndex = userData.cart.indexOf(itemToDelete);
        
        if (cartIndex) {
          userData.cart.splice(cartIndex); // Remove the item from the cart array
          await updateDoc(userDocRef, { cart: userData.cart }); // Update the user document with the modified cart array
          setCartItems(userData.cart);
          Alert.alert('Removed item from cart');
        } else {
          Alert.alert('Error', 'Item not found in cart');
        }
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      Alert.alert('Error', 'Could not delete item from cart');
    }
  };
  
  

  const handleDeletePress = (item) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => deleteItemFromCart(item) }
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white',
      paddingTop: height * 0.06
    },
    cartItem: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      alignItems: 'center', // Align items vertically centered
      justifyContent: 'space-between', // Distribute space between elements
    },
    cartImage: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    cartTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    cartPrice: {
      fontSize: 14,
      color: '#888',
    },
    deleteIcon: {
      padding: 10,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['red']}
          tintColor={'red'}
        />
      }
    >
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}>Your Cart</Text>
      {cartItems.length > 0 ? (
        cartItems.map((cartItem, index) => (
          <View key={index} style={styles.cartItem}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => navigation.navigate('AdDetails', { item: cartItem })}
            >
              <Image source={{ uri: cartItem.image1 }} style={styles.cartImage} />
              <View>
                <Text style={styles.cartTitle}>{cartItem.title}</Text>
                <Text style={styles.cartPrice}>Rs {cartItem.price}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeletePress(cartItem)}>
              <Ionicons name="close-circle" size={24} color="red" style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={{ textAlign: 'center', margin: 20 }}>Your cart is empty</Text>
      )}
    </ScrollView>
  );
};

export default Cart;
