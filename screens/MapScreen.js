import React, { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as vapeSelector from "../store/selectors/vapes";

const MapScreen = (props) => {
  const settings = useSelector(vapeSelector.getSettings);
  const initialLocation = props.route.params
    ? props.route.params.initialLocation
    : null;
  const readonly = props.route.params ? props.route.params.readonly : null;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: selectedLocation ? selectedLocation.lat : 37.78,
    longitude: selectedLocation ? selectedLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  console.log(mapRegion);

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // could show an alert!
      return;
    }
    props.navigation.navigate("EditVape", {
      pickedLocation: selectedLocation,
    });
  }, [selectedLocation]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  useEffect(() => {
    if (readonly) {
      return;
    }
    props.navigation.setOptions({
      headerTitle: settings.language === "eng" ? "Map" : "Карта",
      headerStyle: {
        backgroundColor: settings.bgColor,
      },
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={savePickedLocationHandler}
        >
          <Text style={styles.headerButtonText}>
            {settings.language === "eng" ? "Save" : "Сохранить"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: "black",
  },
});

export default MapScreen;
