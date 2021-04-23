import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import ViewPager from "@react-native-community/viewpager";
import { useSelector } from "react-redux";

import MapPreview from "../components/UI/MapPreview";
import * as vapeSelector from "../store/selectors/vapes";

const VapeDetailScreen = (props) => {
  const vapeId = props.route.params.vapeId;
  const selectedVape = useSelector(vapeSelector.getVapeById(vapeId));
  const settings = useSelector(vapeSelector.getSettings);

  const selectedLocation = {
    lat: selectedVape.location.lat,
    lng: selectedVape.location.lng,
  };

  const showMapHandler = () => {
    props.navigation.navigate("Map", {
      readonly: true,
      initialLocation: selectedLocation,
    });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: settings.bgColor,
      },
    });
  }, [settings]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: settings.bgColor }}>
      <View>
        <Text
            style={{
              ...styles.name,
              fontSize: settings.sizeOfFont + 4,
              color: settings.mainColor,
            }}
          >
          {selectedVape.name}
        </Text>
        <ViewPager style={styles.viewPager} initialPage={0}>
          {selectedVape.imageUrls.map((imageUrl, index) => (
            <View style={styles.page} key={index}>
              <Image
                style={styles.image}
                source={{ uri: imageUrl }}
                resizeMode="contain"
              />
            </View>
          ))}
        </ViewPager>
        <View style={styles.mapPreviewContainer}>
        <Text
          style={{
            ...styles.wasCreated,
            fontSize: settings.sizeOfFont + 4,
            color: settings.mainColor,
          }}
        >
          Был создан в ...
        </Text>
          <MapPreview
            style={styles.mapPreview}
            location={selectedLocation}
            onPress={showMapHandler}
          />
        </View>

        <Text
          style={{
            ...styles.price,
            fontSize: settings.sizeOfFont + 4,
            color: settings.mainColor,
          }}
        >
          {selectedVape.price} р.
        </Text>
        <Text
          style={{
            ...styles.description,
            fontSize: settings.sizeOfFont,
            color: settings.mainColor,
          }}
        >
          Мощность батареи - {selectedVape.battery} мАч
        </Text>
        <Text
          style={{
            ...styles.description,
            fontSize: settings.sizeOfFont,
            color: settings.mainColor,
          }}
        >
          Вес - {selectedVape.weight} г.
        </Text>
        <Text
          style={{
            ...styles.description,
            fontSize: settings.sizeOfFont,
            color: settings.mainColor,
          }}
        >
          Описание: {selectedVape.description}
        </Text>
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Vape details",
  };
};

const styles = StyleSheet.create({
  name: {
    margin: 10,
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    fontWeight: "bold",
  },
  viewPager: {
    flex: 1,
    height: 200,
  },
  page: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  wasCreated: {
    color: "#888",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  mapPreviewContainer: {
    alignItems: "center",
    marginVertical: 10,
    overflow: "hidden",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 200,
    borderWidth: 2,
  },
  infoContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  price: {
    color: "#888",
    textAlign: "center",
    fontWeight: "bold",
  },
  description: {
    textAlign: "left",
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default VapeDetailScreen;
