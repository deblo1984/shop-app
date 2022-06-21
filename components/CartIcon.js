import React from "react";
import { StyleSheet, Text } from "react-native";

import { connect } from "react-redux";

const CartIcon = (props) => {
  //console.log(props.cart);
  const cartItems = [];
  for (const key in props.cart.items) {
    cartItems.push({
      productId: key,
      productTitle: props.cart.items[key].productTitle,
      productPrice: props.cart.items[key].productPrice,
      quantity: props.cart.items[key].quantity,
      sum: props.cart.items[key].sum,
    });
  }
  //console.log(cartItems);
  return (
    <>
      {cartItems.length > 0 ? (
        <Text style={styles.badge}>{cartItems.length}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -10,
    right: -5,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    fontSize: 12,
    width: 100,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  const { cart } = state;
  return {
    cart: cart,
  };
};

export default connect(mapStateToProps)(CartIcon);
