import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import extStyle from "../style/extStyle";
import ShowCart from "../components/ShowCart";
import firebase from "firebase";
import "@firebase/firestore";

export default Cart = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(); //user info
  const [pname, setPname] = useState([]); //product name
  const [price, setPrice] = useState([]); //product price
  const [pquantity, setPquantity] = useState([]); //product quant
  const [subtotal, setSubtotal] = useState(); //cart subtotal
  const [loading, setLoading] = useState(); //loading
  const tax = subtotal * 0.13;
  var total = subtotal + tax;

  const getData = (uid) => {
    const userRef = firebase.firestore().collection("Users").doc(uid); //user collection ref by id doc
    const cartRef = firebase.firestore().collection("Users").doc(uid).collection("Cart").doc("CartArray"); //cart collection under user collection
    const productRef = firebase.firestore().collection("Products").doc("ProductArray"); //product collection ref

    userRef.get().then(function (doc) {
      // if the user exist then grab data and place in const
      if (doc.exists) {
        const userData = doc.data();
        setUserInfo(userData);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } else {
        setLoading(false); //don't leak the memory
        console.log("User doesn't exist.");
      }
    });

    cartRef.get().then(function (doc) {
      if (doc.exists) {
        const cartData = doc.data();
        setPquantity(cartData.pquantity);
        setSubtotal(cartData.subtotal);
      } else {
        setLoading(false); //don't leak the memory
        console.log("cartRef doesn't exist.");
      }
    })

    productRef.get().then(function (doc) {
      if (doc.exists) {
        const productData = doc.data();
        setPname(productData.pname);
        setPrice(productData.price);
      } else {
        setLoading(false); //don't leak the memory
        console.log("productRef doesn't exist.");
      }
    });
  }

  useEffect(() => {
    const isFocused = navigation.addListener("focus", () => {
      setLoading(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) { //check if user is logged in
          getData(user.uid);
        } else { //if not, go to login page
          setUserInfo(null);
          setLoading(false); //don't load
          navigation.navigate("Login"); //redirect to login
        }
      });
    });
    return isFocused;
  }, [userInfo, loading, navigation, pname]);

  if (loading) {
    return (
      <View style={[extStyle.cartContainer, extStyle.loading]}>
        <ActivityIndicator color="#97a0b4" />
      </View>
    );
  }

  if (!userInfo) {
    return (
      <View style={extStyle.cartContainer}>
        <Text style={extStyle.text}>User Unknown.</Text>
      </View>
    );
  }

  return (
    <View style={extStyle.cartContainer}>
      <ScrollView style={extStyle.cartContainer}>
        <Text style={[extStyle.textTitle, extStyle.cartTextTitle]}>Cart</Text>

        {pname.map((pName, i) => ( 
          // looping through the pname go to ShowCart component
          <ShowCart pname={pname} price={price} pquantity={pquantity} i={i} uid={userInfo.uid} subtotal={subtotal} />
        ))}

        <View style={[extStyle.cartContainer, extStyle.innerContainer]}>
          {/* show prices to fixed 2 decimal places */}
          <Text style={extStyle.textLeftAlign}>Subtotal: ${subtotal.toFixed(2)}</Text>
          <Text style={extStyle.textLeftAlign}>Tax: ${tax.toFixed(2)} (13%)</Text>
          <Text style={extStyle.textLeftAlign}>Total: ${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={[extStyle.btn, extStyle.centerBtn]}
          onPress={() => {
            navigation.navigate("Products");
          }}
        >
          <Text style={[extStyle.textLeftAlign, extStyle.whiteText, extStyle.boldText]}>Back to Shopping</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}