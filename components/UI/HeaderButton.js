import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderButton = (props) => {
  const newColor = props.newColor ? props.newColor : "black"
  // console.log(props.color);
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={newColor}
    />
  );
};

export default CustomHeaderButton;
