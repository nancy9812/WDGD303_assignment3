import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Products from "./screens/Products";
import Cart from "./screens/Cart";

import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8chvgqGcj3-xBUtvSZVJyeLkSncmuRcg",
  authDomain: "wdgd-303-assignment3.firebaseapp.com",
  projectId: "wdgd-303-assignment3",
  storageBucket: "wdgd-303-assignment3.appspot.com",
  messagingSenderId: "871323519485",
  appId: "1:871323519485:web:1e43a44963ca154ae7b194"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Drawer = createDrawerNavigator();

// sign out button on sidebar
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        onPress={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              console.log("Sign out Success!");
              props.navigation.closeDrawer();
            })
            .catch((err) => alert(err.message));
        }}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Signup" component={Signup} />
      <Drawer.Screen name="Products" component={Products} />
      <Drawer.Screen name="Cart" component={Cart} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}