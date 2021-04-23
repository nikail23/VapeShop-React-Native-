import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/UI/HeaderButton";
import VapeItem from "../components/vape/VapeItem";
import * as vapeActions from "../store/actions/vapes";
import * as vapeSelector from "../store/selectors/vapes";

const UserProductsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const userVape = useSelector(vapeSelector.getUserVape);
  const settings = useSelector(vapeSelector.getSettings);
  const dispatch = useDispatch();

  const editVapeHandler = (id, location) => {
    props.navigation.navigate("EditVape", {
      vapeId: id,
      pickedLocation: location,
    });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          setIsLoading(true);
          dispatch(vapeActions.deleteVape(id));
          setIsLoading(false);
        },
      },
    ]);
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: settings.language === "eng" ? "Your Vapes" : "Твои вейпы",
      headerStyle: {
        backgroundColor: settings.bgColor,
      },
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="md-menu"
            newColor={settings.mainColor}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add"
            iconName="md-create"
            newColor={settings.mainColor}
            onPress={() => {
              props.navigation.navigate("EditVape");
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [settings]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (userVape.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No vapes found, maybe start adding some?</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: settings.bgColor }}
      data={userVape}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <VapeItem
          image={itemData.item.imageUrls[0]}
          title={itemData.item.title}
          price={itemData.item.price}
          description={itemData.item.description}
          settings={settings}
          onSelect={() => {
            editVapeHandler(itemData.item.id, itemData.item.location);
          }}
        >
          <View style={styles.buttonContainer}>
            <Button
              title="Edit"
              onPress={() => {
                editVapeHandler(itemData.item.id);
              }}
            />
            <Button
              title="Delete"
              onPress={deleteHandler.bind(this, itemData.item.id)}
            />
          </View>
        </VapeItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default UserProductsScreen;
