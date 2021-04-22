import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Button,
  Image,
  TouchableHighlight,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/UI/HeaderButton";
import LocationPicker from "../components/UI/LocationPicker";
import * as shmotActions from "../store/actions/shmot";
import * as shmotSelector from "../store/selectors/shmot";

const EditProductScreen = (props) => {
  const shmotId = props.route.params ? props.route.params.shmotId : null;
  const editedShmot = useSelector(shmotSelector.getShmotById(shmotId));
  const settings = useSelector(shmotSelector.getSettings);
  const dispatch = useDispatch();

  let pickedLocation = props.route?.params?.pickedLocation
    ? props.route.params.pickedLocation
    : null;

  const [name, setName] = useState(editedShmot ? editedShmot.name : "");

  const [imageUrls, setImageUrls] = useState(
    editedShmot ? editedShmot.imageUrls : []
  );
  const [videoUrl, setVideoUrl] = useState(
    editedShmot ? editedShmot.videoUrl : ""
  );
  const [selectedLocation, setSelectedLocation] = useState(
    editedShmot ? editedShmot.location : ""
  );
  const [price, setPrice] = useState(editedShmot ? editedShmot.price.toString() : "");
  const [description, setDescription] = useState(
    editedShmot ? editedShmot.description : ""
  );
  const [weight, setWeight] = useState(editedShmot ? editedShmot.weight.toString() : "");
  const [battery, setBattery] = useState(editedShmot ? editedShmot.battery.toString() : "");

  console.log(editedShmot);

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const submitHandler = async () => {
    try {
      if (editedShmot) {
        await dispatch(
          shmotActions.updateShmot(
            shmotId,
            name,
            imageUrls,
            videoUrl,
            selectedLocation,
            description,
            weight,
            battery
          )
        );
      } else {
        await dispatch(
          shmotActions.createShmot(
            name,
            imageUrls,
            videoUrl,
            selectedLocation,
            +price,
            description,
            +weight,
            +battery
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    (async () => {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "error",
          "Sorry, we need camera roll permissions to make this work!",
          ["ok"]
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUrls((state) => [...state, ...[result.uri]]);
    }
  };

  const removeImage = (imageUrl) => {
    setImageUrls((state) => state.filter((imgUrl) => imgUrl !== imageUrl));
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: shmotId
        ? settings.language === "eng"
          ? "Edit Shmot"
          : "Редактируй Шмот"
        : settings.language === "eng"
        ? "Add Shmot"
        : "Добавляй Шмот",
      headerStyle: {
        backgroundColor: settings.bgColor,
      },
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName="md-checkmark"
            newColor={settings.mainColor}
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

  return (
    <ScrollView style={{ backgroundColor: settings.bgColor }}>
      <View style={styles.form}>
        <View>
          <Text
            style={{
              ...styles.label,
              fontSize: settings.sizeOfFont,
              color: settings.mainColor,
            }}
          >
            {settings.language === "eng" ? "Title" : "Название"}
          </Text>
          <TextInput
            style={{
              ...styles.input,
              fontSize: settings.sizeOfFont - 2,
              color: settings.mainColor,
            }}
            value={name}
            onChangeText={(value) => setName(value)}
            autoCapitalize="none"
          />

          <Text
            style={{
              ...styles.label,
              fontSize: settings.sizeOfFont,
              color: settings.mainColor,
            }}
          >
            {settings.language === "eng" ? "Images" : "Фотографии"}
          </Text>
          {imageUrls.map((imageUrl, index) => (
            <View key={index} style={styles.imageRow}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: imageUrl }}
                  resizeMode="contain"
                />
              </View>
              <TouchableHighlight
                style={styles.removeButton}
                onPress={() => removeImage(imageUrl)}
                underlayColor="#9A9A9A"
              >
                <AntDesign name="delete" size={30} color={settings.mainColor} />
              </TouchableHighlight>
            </View>
          ))}
          <Button title="Add Image" onPress={pickImage} />
          <Text
            style={{
              ...styles.label,
              fontSize: settings.sizeOfFont,
              color: settings.mainColor,
            }}
          >
            {settings.language === "eng" ? "Video Url" : "Ссылка на видос"}
          </Text>
          <TextInput
            style={{
              ...styles.input,
              fontSize: settings.sizeOfFont - 2,
              color: settings.mainColor,
            }}
            value={videoUrl}
            onChangeText={(value) => setVideoUrl(value)}
            autoCapitalize="none"
          />
          <Text
            style={{
              ...styles.label,
              fontSize: settings.sizeOfFont,
              color: settings.mainColor,
            }}
          >
            {settings.language === "eng" ? "Price" : "Цена"}
          </Text>
          <TextInput
            style={{
              ...styles.input,
              fontSize: settings.sizeOfFont - 2,
              color: settings.mainColor,
            }}
            value={price}
            onChangeText={(value) => setPrice(value)}
            autoCapitalize="none"
          />
          <Text
            style={{
              ...styles.label,
              fontSize: settings.sizeOfFont,
              color: settings.mainColor,
            }}
          >
            {settings.language === "eng" ? "Weight" : "Вес"}
          </Text>
          <TextInput
            style={{
              ...styles.input,
              fontSize: settings.sizeOfFont - 2,
              color: settings.mainColor,
            }}
            value={weight}
            onChangeText={(value) => setWeight(value)}
            autoCapitalize="none"
          />
          <Text
            style={{
              ...styles.label,
              fontSize: settings.sizeOfFont,
              color: settings.mainColor,
            }}
          >
            {settings.language === "eng" ? "Battery power" : "Мощность батареи"}
          </Text>
          <TextInput
            style={{
              ...styles.input,
              fontSize: settings.sizeOfFont - 2,
              color: settings.mainColor,
            }}
            value={battery}
            onChangeText={(value) => setBattery(value)}
            autoCapitalize="none"
          />
          <Text
            style={{
              ...styles.label,
              fontSize: settings.sizeOfFont,
              color: settings.mainColor,
            }}
          >
            {settings.language === "eng" ? "Location" : "Локация"}
          </Text>
          <LocationPicker
            navigation={props.navigation}
            pickedLocation={pickedLocation}
            onLocationPicked={locationPickedHandler}
          />
          {editedShmot ? null : (
            <View>
              <Text
                style={{
                  ...styles.label,
                  fontSize: settings.sizeOfFont,
                  color: settings.mainColor,
                }}
              >
                {settings.language === "eng" ? "Price" : "Цена"}
              </Text>
              <TextInput
                style={{
                  ...styles.input,
                  fontSize: settings.sizeOfFont - 2,
                  color: settings.mainColor,
                }}
                value={price}
                onChangeText={(value) => setPrice(value)}
                keyboardType="decimal-pad"
              />
            </View>
          )}
          <Text
            style={{
              ...styles.label,
              fontSize: settings.sizeOfFont,
              color: settings.mainColor,
            }}
          >
            {settings.language === "eng" ? "Description" : "Описание"}
          </Text>
          <TextInput
            style={{
              ...styles.input,
              fontSize: settings.sizeOfFont - 2,
              color: settings.mainColor,
            }}
            value={description}
            onChangeText={(value) => setDescription(value)}
            autoCapitalize="none"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  label: {
    marginVertical: 8,
  },
  input: {
    height: 30,
    paddingHorizontal: 2,
    paddingVertical: 5,
    marginVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  error: {
    fontSize: 12,
    color: "red",
    marginBottom: 5,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageContainer: {
    marginLeft: 40,
    width: "100%",
  },
  image: {
    width: "65%",
    height: 200,
  },
  removeButton: {
    width: 40,
    height: 40,
    marginRight: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
