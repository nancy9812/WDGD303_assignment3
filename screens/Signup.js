import React, { useState } from "react";
import { Alert, Keyboard, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, View } from "react-native";
import extStyle from "../style/extStyle";
import firebase from "firebase";

export default Signup = ({ navigation }) => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onChangeTextEmail = (email) => {
    setSignupForm({ ...signupForm, email, });
  };

  const onChangeTextPassword = (password) => {
    setSignupForm({ ...signupForm, password, });
  };

  const onChangeTextName = (name) => {
    setSignupForm({ ...signupForm, name, });
  };

  const createAccount = () => {
    return new Promise(() => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(signupForm.email, signupForm.password)
        .then((res) => { //create User Collection
          firebase
            .firestore()
            .collection("Users")
            .doc(res.user.uid)
            .set({ //set uid, email, and name fields in each uid doc
              uid: res.user.uid,
              email: res.user.email,
              name: signupForm.name,
            })
            .then(() => { //create sub collection for each uid
              firebase
                .firestore()
                .collection("Users/" + res.user.uid + "/Cart")
                .doc("CartArray")
                .set({ //set the quantity of the products and subtotal to 0 in the CartArray doc
                  pquantity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  subtotal: 0,
                })
                .catch((err) => {
                  console.log(err);
                  alert("CartArray not created, Error:", err.message);
                });
            })
            .then(() => { //redirect to login when account is successfully created and fill in the email field
              console.log("New User Created!");
              Alert.alert("Sign up successful!");
              navigation.navigate("Login", {
                screen: "Products",
                params: { email: res.user.email },
              });
            })
            .catch((err) => {
              console.log(err);
              alert("Account not created, Error:", err.message);
            });
        })
        .catch((err) => alert(err.message));
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={extStyle.container}>
        <Text style={extStyle.textTitle}>Join the Skincare+ Crew</Text>
        <TextInput
          style={extStyle.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={onChangeTextEmail}
        />
        <TextInput
          style={extStyle.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={onChangeTextPassword}
        />
        <TextInput
          style={extStyle.input}
          placeholder="Name"
          onChangeText={onChangeTextName}
        />
        <TouchableOpacity
          style={extStyle.btn}
          onPress={createAccount}
        >
          <Text style={[extStyle.text, extStyle.whiteText, extStyle.boldText]}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={[extStyle.text, extStyle.smallText]}>
          Already part of the crew? {"\n"}{"\n"}
          <Text
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={extStyle.linkText}
          >
            Click here to login!
            </Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};