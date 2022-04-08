import React from "react";
import { View, Text } from "react-native";
import {
  Header,
  ListItem,
  Avatar,
  Image,
  Rating,
  Chip,
  SearchBar,
  Tile,
} from "react-native-elements";
export default function Items() {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          size="large"
          colors={colors}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      style={{ padding: 10 }}
    >
      {respo.map((l, i) => (
        <Tile
          key={l.id}
          imageContainerStyle={{ height: 100 }}
          height={500}
          // imageSrc={{ uri: l.avatar_url }}
          title={l.title.rendered}
          containerStyle={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
            margin: 10,
            backgroundColor: "white",
            borderRadius: 10,
            paddingBottom: 20,
          }}
        >
          <View
            // width={100}
            style={{ alignItems: "flex-start" }}
          >
            <Text>5000$</Text>
            <Rating
              style={{ marginTop: 5, marginBottom: 5 }}
              imageSize={20}
              fractions="{1}"
              startingValue="{3.3}"
            />
            <Chip
              title="Place Name"
              style={{ backgroundColor: "red" }}
              icon={{
                name: "place",
                size: 20,
                color: "white",
              }}
            />
          </View>
        </Tile>
      ))}
    </ScrollView>
  );
}
