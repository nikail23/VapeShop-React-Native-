import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";

const VapeItem = (props) => {
  const settings = props.settings;
  return (
    <View style={styles.touchable}>
      <TouchableNativeFeedback onPress={props.onSelect} useForeground>
        <View style={{...styles.vapeContainer, height: 400 + (settings.sizeOfFont - 16) * 10}}>
          <View style={styles.title}>
            <Text
              style={{ ...styles.titleText, fontSize: settings.sizeOfFont + 2 }}
            >
              {props.name}
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.image }} />
          </View>
          <View style={styles.description}>
            <Text
              style={{
                ...styles.descriptionText,
                fontSize: settings.sizeOfFont,
              }}
              numberOfLines={1}
            >
              {props.description}
            </Text>
          </View>
          <View style={styles.price}>
            <Text
              style={{ ...styles.priceText, fontSize: settings.sizeOfFont }}
            >
              {props.price}$
            </Text>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    margin: 5,
    elevation: 5,
  },
  vapeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  titleText: {
    marginVertical: 2,
  },
  imageContainer: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  description: {
    width: "60%",
    margin: 10,
  },
  descriptionText: {
    marginVertical: 2,
  },
  price: {
    // height: 500,
    color: "#888",
    textAlign: "center",
  },
  actions: {
    position: "absolute",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    width: "100%",
    bottom: 20,
  },
});

export default VapeItem;
