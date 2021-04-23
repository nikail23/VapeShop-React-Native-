import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, SafeAreaView, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/actions/auth";

import VapesOverviewScreen from "../screens/VapeOverviewScreen";
import VapeDetailScreen, {
  screenOptions as vapeDetailScreenOptions,
} from "../screens/VapeDetailScreen";
import FiltersScreen from "../screens/FiltersScreen";
import SettingsScreen, {
  screenOptions as settingsScreenOptions,
} from "../screens/SettingsScreen";
import UserVapeScreen from "../screens/UserVapeScreen";
import EditVapeScreen from "../screens/EditVapeScreen";
import MapScreen from "../screens/MapScreen";
import AuthScreen, {
  screenOptions as authScreenOptions,
} from "../screens/AuthScreen";

import * as vapeSelector from "../store/selectors/vapes";

const VapesStackNavigator = createStackNavigator();

export const VapesNavigator = () => {
  const settings = useSelector(vapeSelector.getSettings);
  return (
    <VapesStackNavigator.Navigator
      screenOptions={{
        headerTintColor: settings.darkmode ? "white" : "black",
      }}
    >
      <VapesStackNavigator.Screen
        name="VapesOverview"
        component={VapesOverviewScreen}
      />
      <VapesStackNavigator.Screen
        name="VapeDetail"
        component={VapeDetailScreen}
        options={vapeDetailScreenOptions}
      />
      <VapesStackNavigator.Screen
        name="EditVape"
        component={EditVapeScreen}
      />
      <VapesStackNavigator.Screen name="Map" component={MapScreen} />
      <VapesStackNavigator.Screen name="Filters" component={FiltersScreen} />
    </VapesStackNavigator.Navigator>
  );
};

const SettingsStackNavigator = createStackNavigator();

export const SettingsNavigator = () => {
  const settings = useSelector(vapeSelector.getSettings);
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
  const settings = useSelector(vapeSelector.getSettings);
  return (
    <AdminStackNavigator.Navigator
      screenOptions={{
        headerTintColor: settings.darkmode ? "white" : "black",
      }}
    >
      <AdminStackNavigator.Screen
        name="userVape"
        component={UserVapeScreen}
      />
      <AdminStackNavigator.Screen
        name="EditVape"
        component={EditVapeScreen}
      />
      <VapesStackNavigator.Screen name="Map" component={MapScreen} />
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

const VapeAppDrawerNavigator = createDrawerNavigator();

export const VapeAppNavigator = (props) => {
  const settings = useSelector(vapeSelector.getSettings);
  const dispatch = useDispatch();
  return (
    <VapeAppDrawerNavigator.Navigator
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
      <VapeAppDrawerNavigator.Screen
        name="Vapes"
        component={VapesNavigator}
      />
      <VapeAppDrawerNavigator.Screen
        name="Settings"
        component={SettingsNavigator}
      />
      <VapeAppDrawerNavigator.Screen 
        name="Change catalog" 
        component={AdminNavigator} 
      />
    </VapeAppDrawerNavigator.Navigator>
  );
};

export default VapeAppNavigator;
