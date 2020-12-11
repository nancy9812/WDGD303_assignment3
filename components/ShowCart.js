import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import extStyle from "../style/extStyle";
import firebase from "firebase";
import "@firebase/firestore";

// set the quantity back to 0 and update firestore
const removeItem = (pquantity, uid) => {
  const _pquantity = [...pquantity];

  firebase.firestore().collection("Users").doc(uid).collection("Cart").doc("CartArray").update({
    pquantity: _pquantity,
  });
}

const ShowCart = ({ pname, price, pquantity, i, uid, subtotal }) => {
  if (subtotal == 0) { //if the subtotal is 0 then show that the cart is empty
    if (i == 0) {
      return (
        <View style={extStyle.showCartContainer}>
          <Text style={[extStyle.textLeftAlign, extStyle.textHeading]}>Your Cart is Empty.</Text>
        </View>
      )
    } else {
      return (null)
    }
  }
  else {
    if (pquantity[i] == 1) { //if item quantity is 1, display in cart
      return (
        <View style={extStyle.showCartContainer}>
          <Text style={[extStyle.textLeftAlign, extStyle.textHeading]}>{pname[i]}</Text>
          <Text style={extStyle.textLeftAlign}>${price[i]}</Text>

          <TouchableOpacity
            style={extStyle.removeBtn}
            onPress={() => {
              pquantity[i] = 0;
              console.log("pQuant: " + pquantity[i]);
              removeItem(pquantity, uid);
              Alert.alert(pname[i] + " removed from cart. \n Please go back to products page to refresh cart.")
            }}
          >
            <Text style={[extStyle.textLeftAlign, extStyle.removeText]}>X</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (null)
    }
  }
}

export default ShowCart;