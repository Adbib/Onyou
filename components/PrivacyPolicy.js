import React from "react";
import { View, Text, Image } from "react-native";
import { Header } from "react-native-elements";
import OnHeader from "./comps/Header";
export default function PrivacyPolicy({ navigation }) {
  return (
    <>
      <OnHeader navigation={navigation} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>PrivacyPolicy Screen</Text>
      </View>
    </>
  );
}
