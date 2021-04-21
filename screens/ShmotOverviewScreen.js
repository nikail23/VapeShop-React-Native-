import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ShmotItem from "../components/shmot/ShmotItem";
import HeaderButton from "../components/UI/HeaderButton";
import * as shmotActions from "../store/actions/shmot";
import * as shmotSelector from "../store/selectors/shmot";

const ShmotOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const shmot = useSelector(shmotSelector.getFilteredShmot);
  const shmotLoading = useSelector(shmotSelector.getLoading);
  const settings = useSelector(shmotSelector.getSettings);

  const loadShmot = () => {
    dispatch(shmotActions.fetchShmot());
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadShmot);

    return () => {
      unsubscribe();
    };
  }, [loadShmot]);

  useEffect(() => {
    loadShmot();
  }, [dispatch]);

  const selectShmotHandler = (id, title) => {
    props.navigation.navigate("ShmotDetail", {
      shmotId: id,
      shmotTitle: title,
    });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: settings.language === "eng" ? "All Shmot" : "Весь Шмот",
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

  if (shmotLoading && shmot.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (!shmotLoading && shmot.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Shmot!</Text>
        <Button title="Reload" onPress={loadShmot} />
      </View>
    );
  }
  return (
    <FlatList
      style={{ backgroundColor: settings.bgColor }}
      onRefresh={loadShmot}
      refreshing={false}
      data={shmot}
      renderItem={(itemData) => (
        <ShmotItem
          title={itemData.item.title}
          image={itemData.item.imageUrls[0]}
          description={itemData.item.description}
          price={itemData.item.price}
          settings={settings}
          onSelect={() =>
            selectShmotHandler(itemData.item.id, itemData.item.title)
          }
        ></ShmotItem>
      )}
      numColumns={2} 
    />
  );
};

export default ShmotOverviewScreen;
