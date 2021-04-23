import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, TextInput } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import HeaderButton from "../components/UI/HeaderButton";
import * as vapeActions from "../store/actions/vapes";
import * as vapeSelector from "../store/selectors/vapes";

const FiltersScreen = (props) => {
  const filters = useSelector(vapeSelector.getVapeFilters);
  const settings = useSelector(vapeSelector.getSettings);

  const [price, setPrice] = useState(+filters.price);
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [imagesCount, setImagesCount] = useState(filters.imagesCount);
  const [descriptionSize, setDescriptionSize] = useState(
    filters.descriptionSize
  );

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    dispatch(
      vapeActions.setFilters({
        minPrice,
        price,
        imagesCount,
        descriptionSize,
      })
    );
  }, [
    minPrice,
    price,
    imagesCount,
    descriptionSize,
    dispatch,
  ]);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle:
        settings.language === "eng" ? "Filters" : "Фильтры",
      headerStyle: {
        backgroundColor: settings.bgColor,
      },
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName="md-save"
            newColor={settings.mainColor}
            onPress={saveFilters}
          />
        </HeaderButtons>
      ),
    });
  }, [saveFilters]);

  return (
    <View style={{ ...styles.screen, backgroundColor: settings.bgColor }}>
      <Text
        style={{
          ...styles.title,
          fontSize: settings.sizeOfFont + 6,
          color: settings.mainColor,
        }}
      >
        {settings.language === "eng"
          ? "Filters"
          : "Фильтры"}
      </Text>
      <Text
        style={{
          ...styles.label,
          fontSize: settings.sizeOfFont,
          color: settings.mainColor,
        }}
      >
        {settings.language === "eng" ? "Price" : "Цена"}
      </Text>
      <View style={styles.sliderContainer}>
        <TextInput
          style={{ ...styles.textInput, color: settings.mainColor }}
          value={minPrice.toString()}
          onChangeText={(value) => setMinPrice(+value)}
        />
        <TextInput
          style={{ ...styles.textInput, color: settings.mainColor }}
          value={price.toString()}
          onChangeText={(value) => setPrice(+value)}
        />
      </View>

      <View style={{ width: "80%" }}>
        <Text
          style={{
            ...styles.label,
            fontSize: settings.sizeOfFont,
            color: settings.mainColor,
          }}
        >
          {settings.language === "eng"
            ? "Min images count"
            : "Минимальное количество фото"}
        </Text>
        <Picker
          selectedValue={imagesCount}
          onValueChange={(value) => setImagesCount(value)}
        >
          <Picker.Item label="-" value="0" key={0} />
          <Picker.Item label="1" value="1" key={1} />
          <Picker.Item label="2" value="2" key={2} />
          <Picker.Item label="3" value="3" key={3} />
          <Picker.Item label="4+" value="4" key={4} />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  sliderContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },
  textInput: {
    textAlign: "center",
    borderBottomWidth: 1,
    width: 60,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
  title: {
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
});

export default FiltersScreen;
