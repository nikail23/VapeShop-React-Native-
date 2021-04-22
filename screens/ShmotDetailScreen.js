import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import ViewPager from "@react-native-community/viewpager";
import { useSelector } from "react-redux";

import MapPreview from "../components/UI/MapPreview";
import * as shmotSelector from "../store/selectors/shmot";

const ShmotDetailScreen = (props) => {
  const shmotId = props.route.params.shmotId;
  const selectedShmot = useSelector(shmotSelector.getShmotById(shmotId));
  const settings = useSelector(shmotSelector.getSettings);

  const selectedLocation = {
    lat: selectedShmot.location.lat,
    lng: selectedShmot.location.lng,
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
        <ViewPager style={styles.viewPager} initialPage={0}>
          {selectedShmot.imageUrls.map((imageUrl, index) => (
            <View style={styles.page} key={index}>
              <Image
                style={styles.image}
                source={{ uri: imageUrl }}
                resizeMode="contain"
              />
            </View>
          ))}
          <View style={styles.container} key="video">
            <Video
              style={styles.video}
              source={{
                uri: selectedShmot.videoUrl,
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
            />
          </View>
        </ViewPager>
        <View style={styles.mapPreviewContainer}>
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
          ${selectedShmot.price.toFixed(2)}
        </Text>
        <Text
          style={{
            ...styles.description,
            fontSize: settings.sizeOfFont,
            color: settings.mainColor,
          }}
        >
          {selectedShmot.description}
        </Text>
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.shmotTitle,
  };
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    height: 500,
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
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  mapPreviewContainer: {
    alignItems: "center",
    marginVertical: 20,
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
    marginVertical: 20,
  },
  price: {
    color: "#888",
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
});

export default ShmotDetailScreen;
