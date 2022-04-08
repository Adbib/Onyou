import React from "react";
import { View, Text } from "react-native";
import OnHeader from "./comps/Header";

export default function Favorite({ navigation }) {
  return (
    <View>
      <OnHeader navigation={navigation} />
      <Text>Favorite</Text>
    </View>
  );
}
