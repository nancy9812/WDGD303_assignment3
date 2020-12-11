import { StyleSheet } from "react-native";

const extStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingBottom: 70,
    backgroundColor: "#DBD9DB",
    alignItems: "center",
    justifyContent: "center",
  },

  textLeftAlign: {
    color: "#363537",
    fontSize: 17,
  },

  text: {
    color: "#363537",
    fontSize: 17,
    textAlign: "center",
  },

  whiteText: {
    color: "#E5EBEA",
  },

  boldText: {
    fontWeight: "700",
  },

  smallText: {
    fontSize: 15,
    marginTop: 27,
  },

  linkText: {
    color: "#B098A4",
    fontWeight: "700",
  },

  textTitle: {
    color: "#B098A4",
    marginTop: 70,
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },

  textHeading: {
    fontSize: 21,
  },

  btn: {
    backgroundColor: "#B098A4",
    borderRadius: 17,
    marginTop: 17,
    padding: 17,
    width: 200,
  },

  secondBtn: {
    backgroundColor: "#97a0b4",
  },

  centerBtn: {
    margin: 7,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  input: {
    backgroundColor: "#defdef",
    padding: 20,
    marginTop: 17,
    width: 300,
    borderRadius: 17,
    marginBottom: 10,
  },

  // ShowCart.js specific styles
  showCartContainer: {
    flex: 1,
    backgroundColor: "#DBD9DB",
    marginBottom: 27,
  },

  removeText: {
    color: "#EA5252",
    fontSize: 17,
    fontWeight: "700",
  },

  removeBtn: {
    padding: 7,
    width: 27,
    position: "absolute",
    top: -2,
    right: 0,
  },

  //Cart.js specific styles
  cartContainer: {
    flex: 1,
    paddingBottom: 70,
    padding: 17,
    backgroundColor: "#DBD9DB",
  },

  innerContainer: {
    borderTopColor: "#B098A4",
    borderTopWidth: 2,
    padding: 0,
    paddingTop: 17,
  },

  cartTextTitle: {
    marginTop: 50,
    marginBottom: 17,
  },

  // Products.js specific styles
  productsContainer: {
    paddingTop: 0,
    paddingBottom: 0,
  },

  secondText: {
    color: "#97a0b4",
    fontWeight: "500",
  },

  loading: {
    alignItems: "center",
    justifyContent: "center",
  },

  productView: {
    borderColor: "#97a0b4",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    padding: 7,
    margin: 17,
  },

  cartBtn: {
    position: "absolute",
    padding: 12,
    width: 50,
    top: 27,
    right: 7,
    alignSelf: 'flex-end',
    zIndex: 100, //keep this on top of everything 
  },

  image: {
    width: "100%",
    height: undefined,
    marginTop: 17,
    marginBottom: 17,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
})

export default extStyle;