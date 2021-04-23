import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { ColorPicker } from "react-native-color-picker";
import HeaderButton from "../components/UI/HeaderButton";
import * as vapeActions from "../store/actions/vapes";
import * as vapeSelector from "../store/selectors/vapes";

const SettingsScreen = (props) => {
  let settings = useSelector(vapeSelector.getSettings);

  const [sizeOfFont, setFontSize] = useState(settings.sizeOfFont);
  const [mainColor, setMainColor] = useState(settings.mainColor);
  const [bgColor, setBgColor] = useState(settings.bgColor);
  const [language, setLanguage] = useState(settings.language);
  const [darkmode, setDarkmode] = useState(settings.darkmode);
  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    dispatch(
      vapeActions.setSettings({
        sizeOfFont,
        mainColor,
        bgColor,
        language,
        darkmode,
      })
    );
  }, [sizeOfFont, mainColor, bgColor, language, darkmode, dispatch]);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: language === "eng" ? "Settings" : "Настройки",
      headerTintColor: settings.mainColor,
      headerStyle: {
        backgroundColor: settings.bgColor,
      },
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName="md-save"
            onPress={saveFilters}
            newColor={settings.darkmode ? "white" : "black"}
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
            newColor={settings.darkmode ? "white" : "black"}
          />
        </HeaderButtons>
      ),
    });
  }, [saveFilters, settings]);

  return (
    <View style={{ ...styles.screen, backgroundColor: bgColor }}>
      <Text
        style={{ ...styles.title, fontSize: sizeOfFont + 6, color: mainColor }}
      >
        {language === "eng" ? "Available Settings" : "Доступные настройки"}
      </Text>
      <Text style={{ fontSize: sizeOfFont, color: mainColor }}>
        {language === "eng" ? "Font Size" : "Размер шрифта"}
      </Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={{ width: 200, height: 40 }}
          value={sizeOfFont}
          onValueChange={(value) => setFontSize(+value.toFixed())}
          minimumValue={10}
          maximumValue={28}
          minimumTrackTintColor="black"
          maximumTrackTintColor="blue"
        />
      </View>

      <Text style={{ fontSize: sizeOfFont, color: mainColor }}>
        {sizeOfFont}
      </Text>

      <Text style={{ fontSize: sizeOfFont, color: mainColor }}>
        {language === "eng" ? "Background Color" : "Цвет фона"}
      </Text>
      <ColorPicker
        onColorSelected={(color) => setBgColor(color)}
        style={{ width: "90%", height: 200 }}
      />

      <View style={{ width: "80%" }}>
        <Text
          style={{ ...styles.label, fontSize: sizeOfFont, color: mainColor }}
        >
          {language === "eng" ? "Type" : "Тип"}
        </Text>
        <Picker
          selectedValue={language}
          onValueChange={(value) => setLanguage(value)}
          itemStyle={{ color: "white" }}
        >
          <Picker.Item
            label={language === "eng" ? "English" : "Английский"}
            value="eng"
            key={0}
          />
          <Picker.Item
            label={language === "rus" ? "Русский" : "Russian"}
            value="rus"
            key={1}
          />
        </Picker>
      </View>
      <View style={styles.filterContainer}>
        <Text
          style={{ ...styles.label, fontSize: sizeOfFont, color: mainColor }}
        >
          Darkmode
        </Text>
        <Switch
          value={darkmode}
          onValueChange={(value) => {
            value ? setMainColor("white") : setMainColor("black");
            value ? setBgColor("#201d1d") : setBgColor("#F2F2F2");
            setDarkmode(value);
          }}
        />
      </View>
    </View>
  );
};

// export const screenOptions = (navData) => {
//   return {
//     headerLeft: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Menu"
//           iconName="ios-menu"
//           onPress={() => {
//             navData.navigation.toggleDrawer();
//           }}
//         />
//       </HeaderButtons>
//     ),
//   };
// };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  //   label: {
  //     fontSize: SizeOfFont,
  //   },
  sliderContainer: {
    flexDirection: "row",
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

export default SettingsScreen;
