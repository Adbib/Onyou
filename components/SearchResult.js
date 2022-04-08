import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Icon, Tooltip } from "react-native-elements";
export default function SearchResult({ navigation, route }) {
  console.log(route.params.data);
  return (
    <ScrollView
      style={{ backgroundColor: "#eee" }}
      contentContainerStyle={{ alignItems: "center", alignContent: "center" }}
    >
      {route.params.data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              flex: 1,
              height: 350,
              width: "70%",
              marginTop: 50,
              borderColor: "#fff",
              borderWidth: 4,
              backgroundColor: "white",
              borderRadius: 10,
              // alignItems: "center",
              // alignContent: "center",
              // textAlign: "center",
            }}
            onPress={() =>
              navigation.navigate("SingleProduct", {
                name: "SingleProduct",
                infos: item,
              })
            }
          >
            <ImageBackground
              source={{
                uri:
                  item._embedded && item._embedded["wp:featuredmedia"]
                    ? item._embedded["wp:featuredmedia"][0].source_url
                    : "https://onyou.ca/wp-content/uploads/2021/07/onyou1.png",
              }}
              style={styles.card}
            >
              <View
                style={{
                  backgroundColor: "#f28a29",
                  padding: 5,
                  margin: 10,
                  // flex: 1,
                  width: "50%",
                }}
              >
                <Text style={{ color: "white" }}>Featured</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  height: "90%",
                  alignItems: "center",
                  // justifyContent: "flex-end",
                  // backgroundColor: "red",
                  // width: "100%",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#f28a29",
                    padding: 5,
                    margin: 10,
                    alignSelf: "flex-end",
                  }}
                >
                  <Text style={{ color: "white" }}>
                    {item._directorypress_rating_3
                      ? item._directorypress_rating_3 + " Stars"
                      : "0 rating"}
                  </Text>
                </View>

                {/* <View
                style={{
                  backgroundColor: "#f28a29",
                  padding: 5,
                  margin: 10,
                  alignSelf: "flex-end",
                }}
              >
                <Text style={{ color: "white" }}>Featured1</Text>
              </View> */}
              </View>
            </ImageBackground>
            <View style={{ height: "30%", padding: 10 }}>
              <Text
                style={{ color: "#f28a29", marginBottom: 5, marginTop: 10 }}
              >
                {" "}
                {item._embedded
                  ? item._embedded["wp:term"][0][0].name
                  : ""}{" "}
              </Text>
              <Text style={{ fontWeight: "100", fontSize: 18, marginTop: 5 }}>
                {" "}
                {item.title.rendered}{" "}
              </Text>
            </View>

            <View
              style={{
                borderColor: "#eee",
                borderTopWidth: 2,
                height: "20%",
                width: "100%",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  borderColor: "#eee",
                  borderRightWidth: 2,
                  alignItems: "center",
                  alignContent: "center",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  {item._field_9} $
                </Text>
              </View>

              <View
                style={{
                  width: "25%",
                  borderColor: "#eee",
                  borderRightWidth: 2,
                  alignItems: "center",
                  alignContent: "center",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <Tooltip popover={<Text>{item._field_6}</Text>}>
                  <Icon name="phone" color="#f28a29" />
                </Tooltip>
              </View>
              <View
                style={{
                  width: "25%",
                  // borderColor: "#eee",
                  // borderRightWidth: 2,
                  alignItems: "center",
                  alignContent: "center",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="favorite" />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    height: "100%",
    // padding: 0,
    resizeMode: "stretch",
    // backgroundColor: "green",
    // padding: 10,
    // marginVertical: 4,
    // marginHorizonstal: 6,
    // marginHori\zontal: 1,
    // margin: 6,
  },
});
