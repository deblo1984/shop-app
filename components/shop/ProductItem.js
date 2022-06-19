import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
} from "react-native";
import Card from "../ui/Card";

import ProgressiveImage from "../ProgressiveImage";

const w = Dimensions.get("window");

const ProductItem = (props) => {
  let TouchableCmd = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmd = TouchableNativeFeedback;
  }

  const preview =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABSgAwAEAAAAAQAAAB4AAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIAB4AFAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAIDAwMEAwQFBQQGBgYGBggIBwcICA0JCgkKCQ0TDA4MDA4MExEUEQ8RFBEeGBUVGB4jHRwdIyolJSo1MjVFRVz/2wBDAQIDAwMEAwQFBQQGBgYGBggIBwcICA0JCgkKCQ0TDA4MDA4MExEUEQ8RFBEeGBUVGB4jHRwdIyolJSo1MjVFRVz/3QAEAAL/2gAMAwEAAhEDEQA/ALOh3epWNxbXSSfvIriVlJ+VfvBgMDpj1r6O8Wa7a6pYT30FvJay6hCpmhLBj5iP98dtrYr59i09fObaSqsSC2M7Q7fpxXsWp6Hexz2aJbS7PshDDaSQFJ+ckdA3pXv+0Sla+rWhyez0vbRbnIa1qksFzEivL/qlY7QCMsST+tc3/blx/fuPyFbl7FdRzBcRLhRkOw3Cs7bdf3rb/vof4Vt7XzM/ZI//0Ps248J3v2i7iitI2VZIokOQC7AfOWJ5PtXe3Xh69PiOxtHZoEWFVZlkyJt6k7WA6+w6V9Vr4R003EjlQELh1UcYfu3HrUc/hK0l1Jbpjn5QGB6nHfNa4h86jZtNSTua4eSg5XWji0fMl14b0pZTHLps+Y/lBaLcSB0yc1T/AOEc0P8A6Bs3/fj/AOvX2s+m27uWYZJ6nAqP+yrT+7+ldft49jj5H3P/2Q==";

  return (
    <TouchableCmd onPress={props.onSelect}>
      <Card style={styles.product}>
        <View style={styles.imageContainer}>
          <ProgressiveImage
            thumbnailSource={{
              uri: preview,
            }}
            source={{
              uri: props.image,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>{props.children}</View>
      </Card>
    </TouchableCmd>
  );
};

const styles = StyleSheet.create({
  product: {
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
