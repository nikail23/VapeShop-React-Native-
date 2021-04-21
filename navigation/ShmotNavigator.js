import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, SafeAreaView, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/actions/auth";

import ShmotsOverviewScreen from "../screens/ShmotOverviewScreen";
import ShmotDetailScreen, {
  screenOptions as shmotDetailScreenOptions,
} from "../screens/ShmotDetailScreen";
import FiltersScreen from "../screens/FiltersScreen";
import SettingsScreen, {
  screenOptions as settingsScreenOptions,
} from "../screens/SettingsScreen";
import UserShmotScreen from "../screens/UserShmotScreen";
import EditShmotScreen from "../screens/EditShmotScreen";
import MapScreen from "../screens/MapScreen";
import AuthScreen, {
  screenOptions as authScreenOptions,
} from "../screens/AuthScreen";

import * as shmotSelector from "../store/selectors/shmot";

const ShmotsStackNavigator = createStackNavigator();

export const ShmotsNavigator = () => {
  const settings = useSelector(shmotSelector.getSettings);
  return (
    <ShmotsStackNavigator.Navigator
      screenOptions={{
        headerTintColor: settings.darkmode ? "white" : "black",
      }}
    >
      <ShmotsStackNavigator.Screen
        name="ShmotsOverview"
        component={ShmotsOverviewScreen}
      />
      <ShmotsStackNavigator.Screen
        name="ShmotDetail"
        component={ShmotDetailScreen}
        options={shmotDetailScreenOptions}
      />
      <ShmotsStackNavigator.Screen
        name="EditShmot"
        component={EditShmotScreen}
      />
      <ShmotsStackNavigator.Screen name="Map" component={MapScreen} />
      <ShmotsStackNavigator.Screen name="Filters" component={FiltersScreen} />
    </ShmotsStackNavigator.Navigator>
  );
};

const SettingsStackNavigator = createStackNavigator();

export const SettingsNavigator = () => {
  const settings = useSelector(shmotSelector.getSettings);
  return (
    <SettingsStackNavigator.Navigator
      screenOptions={{
        headerTintColor: settings.darkmode ? "white" : "black",
      }}
    >
      <SettingsStackNavigator.Screen
        name="Settings"
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
    </SettingsStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  const settings = useSelector(shmotSelector.getSettings);
  return (
    <AdminStackNavigator.Navigator
      screenOptions={{
        headerTintColor: settings.darkmode ? "white" : "black",
      }}
    >
      <AdminStackNavigator.Screen
        name="userShmot"
        component={UserShmotScreen}
      />
      <AdminStackNavigator.Screen
        name="EditShmot"
        component={EditShmotScreen}
      />
      <ShmotsStackNavigator.Screen name="Map" component={MapScreen} />
    </AdminStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

const ShmotAppDrawerNavigator = createDrawerNavigator();

export const ShmotAppNavigator = (props) => {
  const settings = useSelector(shmotSelector.getSettings);
  const dispatch = useDispatch();
  return (
    <ShmotAppDrawerNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: settings.darkmode ? "white" : "#0098F4",
        inactiveTintColor: settings.darkmode ? "white" : "#0098F4",
      }}
      drawerStyle={{
        backgroundColor: settings.bgColor,
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <ShmotAppDrawerNavigator.Screen
        name="Shmot"
        component={ShmotsNavigator}
      />
      <ShmotAppDrawerNavigator.Screen
        name="Settings"
        component={SettingsNavigator}
      />
      <ShmotAppDrawerNavigator.Screen name="Admin" component={AdminNavigator} />
    </ShmotAppDrawerNavigator.Navigator>
  );
};

export default ShmotAppNavigator;
