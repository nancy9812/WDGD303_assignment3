import React, { useState } from "react";
import { Alert, Keyboard, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View } from "react-native";
import extStyle from "../style/extStyle";
import firebase from "firebase";

export default Login = ({ navigation }) => {

  const [loginForm, setLoginForm] = useState({
    // temp testing so don't need to keep putting in form info
    // email: "test@email.com",
    // password: "password",
  });

  // set login email
  const onChangeTextEmail = (email) => {
    setLoginForm({ ...loginForm, email, });
  };

  // set login password
  const onChangeTextPassword = (password) => {
    setLoginForm({ ...loginForm, password, });
  };

  // sign into firebase user and redirect to product page
  const loginHandler = () => {
    // make sure that the input fields are not empty
    if (loginForm.email === undefined) {
      Alert.alert("Please enter your email");
      return;
    }
    if (loginForm.password === undefined) {
      Alert.alert("Please enter your password");
      return;
    }
    return new Promise(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(loginForm.email, loginForm.password)
        .then((res) => {
          navigation.navigate("Products");
          console.log("Login Success!");
        })
        .catch((err) => { alert(err.message) }); //if there's an error logging in: alert me
    });
  };

  return (
    // keyboard disappears when you click out of the keyboard area
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={extStyle.container}>
        <Text style={extStyle.textTitle}>Login to Skincare+</Text>
        <TextInput
          style={extStyle.input}
          placeholder="Email"
          autoCapitalize="none"
          value={loginForm.email}
          onChangeText={onChangeTextEmail}
        />
        <TextInput
          style={extStyle.input}
          placeholder="Password"
          value={loginForm.password}
          secureTextEntry
          onChangeText={onChangeTextPassword}
        />
        <TouchableOpacity style={extStyle.btn} onPress={loginHandler}>
          <Text style={[extStyle.text, extStyle.whiteText, extStyle.boldText]}>Login</Text>
        </TouchableOpacity>

        <Text style={[extStyle.text, extStyle.smallText]}>
          Not part of the crew yet? {"\n"}{"\n"}
          <Text
            style={extStyle.linkText}
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            Click here to join the crew!
          </Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};