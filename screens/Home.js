import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import extStyle from "../style/extStyle"; //external stylesheet

export default Home = ({ navigation }) => {
  return (
    <View style={extStyle.container}>
      <Text style={[extStyle.text, extStyle.textTitle]}>Skincare+</Text>
      <Text style={extStyle.text}>Shop for your daily skin care needs!</Text>

      {/* Buttons to go to Login and Signup */}
      <TouchableOpacity
        style={extStyle.btn}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={[extStyle.text, extStyle.whiteText, extStyle.boldText]}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[extStyle.btn, extStyle.secondBtn]}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text style={[extStyle.text, extStyle.whiteText, extStyle.boldText]}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}