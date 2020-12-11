import React, { useRef, useEffect, useState } from "react";
import { Animated, ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import extStyle from "../style/extStyle";
import firebase from "firebase";
import "@firebase/firestore";

export default Products = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [userInfo, setUserInfo] = useState(); //user info
  const [pname, setPname] = useState([]); //product name
  const [desc, setDesc] = useState([]); //product description
  const [image, setImage] = useState([]); //product image URL
  const [price, setPrice] = useState([]); //product price
  const [psize, setPsize] = useState([]); //product size in ml
  const [pquantity, setPquantity] = useState([]); //product quant
  const [subtotal, setSubtotal] = useState(); //cart subtotal
  const [loading, setLoading] = useState(); //loading
  var addPrice;
  var added = 0;

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
        setDesc(productData.desc);
        setImage(productData.image);
        setPrice(productData.price);
        setPsize(productData.psize);
      } else {
        setLoading(false); //don't leak the memory
        console.log("productRef doesn't exist.");
      }
    });
  }

  // update the item quantity to firestore
  const updateCart = (pquantity, uid, index) => {
    const _pquantity = [...pquantity];
    console.log("update: " + _pquantity);

    firebase.firestore().collection("Users").doc(uid).collection("Cart").doc("CartArray").update({
      pquantity: _pquantity,
    });
  };

  // update the subtotal to firestore
  const updateSubtotal = (added, uid) => {
    const _added = added;

    firebase.firestore().collection("Users").doc(uid).collection("Cart").doc("CartArray").update({
      subtotal: _added,
    });
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

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
    return () => fadeAnim.setValue(0), isFocused;
  }, [fadeAnim, userInfo, loading, navigation, pname, pquantity]);

  if (loading) {
    return (
      <View style={[extStyle.container, extStyle.loading]}>
        <ActivityIndicator color="#97a0b4" />
      </View>
    );
  }

  if (!userInfo) {
    return (
      <View style={extStyle.container}>
        <Text style={extStyle.text}>User Unknown.</Text>
      </View>
    );
  }

  return (
    <View style={[extStyle.container, extStyle.productsContainer]}>
      <ScrollView>
        <Text style={extStyle.textTitle}>Products</Text>
        <Text style={extStyle.text}>Shop for your daily skin care needs!</Text>

        <Animated.View
          style={{
            paddingBottom: 30,
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          }}
        >

          {/* loop through pname array */}
          {pname.map((pName, i) => (
            <View key={i} style={extStyle.productView}>
              <Text style={[extStyle.text, extStyle.textHeading]}>{pName}</Text>
              <Text style={[extStyle.text, extStyle.secondText]}>{psize[i]}ml</Text>
              <Image style={extStyle.image} source={{ uri: (image[i]) }} />
              <Text style={extStyle.text}>{desc[i]}</Text>

              {/* calculate price by multiplying price with quantity then add to added variable */}
              {addPrice = price[i] * pquantity[i],
                added += addPrice,
                console.log("Subtotal: " + added)}

              <TouchableOpacity
                style={[extStyle.btn, extStyle.centerBtn]}
                onPress={() => {
                  if (pquantity[i] == 1) { //if item is in cart, don't add quantity
                    Alert.alert("You can only buy one quantity.");
                  }
                  else {
                    pquantity[i] += 1; //add one to quantity
                    addPrice = price[i] * pquantity[i]; //add to added variable
                    added += addPrice;

                    updateCart(pquantity, userInfo.uid, i); //update user cart
                    updateSubtotal(added, userInfo.uid); //update subtotal

                    Alert.alert(pName + " added to cart");
                  }
                }}
              >
                <Text style={[extStyle.text, extStyle.boldText, extStyle.whiteText]}>
                  ${price[i]}
                </Text>
                {/* add to cart then grey out button or alert that you can only add one quant of the item */}
                <Text style={[extStyle.text, extStyle.whiteText]}>  Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}

          {updateSubtotal(added, userInfo.uid)}
        </Animated.View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Cart");
        }}
        style={[extStyle.btn, extStyle.centerBtn, extStyle.cartBtn]}
      >
        <Feather name="shopping-cart" size={17} color="#DBD9DB" />
        {/* items quant in cart */}
        {/* <Text style={[styles.text, styles.whiteText]}> {this.cartQuantity()}</Text> */}
      </TouchableOpacity>

    </View>
  );
}