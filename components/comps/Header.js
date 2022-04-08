import React from "react";
import { Header, Image } from "react-native-elements";

export default function OnHeader({ navigation }) {
  return (
    <Header
      backgroundColor="#ff7f50"
      leftComponent={{
        // text: "Menu",
        icon: "menu",
        size: 40,
        color: "white",
        onPress: () => navigation.openDrawer("RightDrawer"),
        // iconStyle: { size: 50 },
      }}
      centerComponent={
        <Image
          style={{
            height: 30,
            width: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
          source={require("../../assets/logo.png")}
        />
        // { text: "ADS Publish", style: { color: "white" } }
      }
      rightComponent={{
        icon: "home",
        color: "white",
        size: 40,
        style: { color: "#fff" },
        onPress: () => navigation.navigate("Home", { name: "Home" }),
      }}
      containerStyle={{ paddingBottom: 20, paddingTop: 20 }}
    />
  );
}
