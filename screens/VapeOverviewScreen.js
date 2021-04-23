import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import VapeItem from "../components/vape/VapeItem";
import HeaderButton from "../components/UI/HeaderButton";
import * as vapeActions from "../store/actions/vapes";
import * as vapeSelector from "../store/selectors/vapes";

const VapeOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const vape = useSelector(vapeSelector.getFilteredVape);
  const vapeLoading = useSelector(vapeSelector.getLoading);
  const settings = useSelector(vapeSelector.getSettings);

  const loadVape = () => {
    dispatch(vapeActions.fetchVape());
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadVape);

    return () => {
      unsubscribe();
    };
  }, [loadVape]);

  useEffect(() => {
    loadVape();
  }, [dispatch]);

  const selectVapeHandler = (id, title) => {
    props.navigation.navigate("VapeDetail", {
      vapeId: id,
      vapeTitle: title,
    });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: settings.language === "eng" ? "All Vapes" : "Все вейпы",
      headerStyle: {
        backgroundColor: settings.bgColor,
      },
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="menu"
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
            title="Cart"
            iconName="filter-outline"
            newColor={settings.mainColor}
            onPress={() => {
              props.navigation.navigate("Filters");
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [settings]);

  if (vapeLoading && vape.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (!vapeLoading && vape.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Vapes!</Text>
        <Button title="Reload" onPress={loadVape} />
      </View>
    );
  }
  return (
    <FlatList
      style={{ backgroundColor: settings.bgColor }}
      onRefresh={loadVape}
      refreshing={false}
      data={vape}
      renderItem={(itemData) => (
        <VapeItem
          name={itemData.item.name}
          image={itemData.item.imageUrls[0]}
          description={itemData.item.description}
          price={itemData.item.price}
          settings={settings}
          onSelect={() =>
            selectVapeHandler(itemData.item.id, itemData.item.title)
          }
        ></VapeItem>
      )}
      numColumns={1} 
    />
  );
};

export default VapeOverviewScreen;
