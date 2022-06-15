import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  let TouchableCmd = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmd = TouchableNativeFeedback;
  }
  return (
    <TouchableCmd onPress={props.onViewDetail}>
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: props.image }} style={styles.image} />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={props.onViewDetail}
          />
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={props.onAddToCart}
          />
        </View>
      </View>
    </TouchableCmd>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
    paddingBottom: 10,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  item: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
});

export default ProductItem;
