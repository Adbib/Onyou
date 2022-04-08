import React from "react";
import {
  View,
  Text,
  ScrollView,
  Animated,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useRef } from "react";
import { data } from "../data";
import { Icon } from "react-native-elements";
export default function ItemCarousel({ navigation, image }) {
  const images = [image, image, image, image];
  // let fruits = new Array(', );
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();
  return (
    <View>
      <ScrollView
        horizontal={true}
        style={{ marginTop: 2 }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                  // useNativeDriver: true,
                },
              },
            },
            // { useNativeDriver: true },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
        // style={{ marginLeft: 20 }}
      >
        {images.map((image, imageIndex) => {
          return (
            <View style={{ width: windowWidth, height: 350 }} key={imageIndex}>
              <ImageBackground source={{ uri: image }} style={styles.card}>
                {/* <View style={styles.textContainer}>
                    <Text
                      // onPress={() =>
                      //   navigation.navigate("List", { name: "List" })
                      // }
                      style={styles.infoText}
                    >
                      {image.title}
                    </Text>
                  </View> */}

                {imageIndex < images.length - 1 && (
                  <Icon
                    raised
                    name="navigate-next"
                    color="#517fa4"
                    containerStyle={{
                      position: "absolute",
                      right: 5,
                      opacity: 0.9,
                    }}
                    iconStyle={{ opacity: 1, fontSize: 40 }}
                  />
                )}

                {imageIndex >= 1 && (
                  <Icon
                    raised
                    name="navigate-before"
                    color="#517fa4"
                    containerStyle={{
                      position: "absolute",
                      left: 5,
                      opacity: 0.9,
                    }}
                    iconStyle={{ opacity: 1, fontSize: 40 }}
                  />
                )}
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.indicatorContainer}>
        {data.map((image, imageIndex) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (imageIndex - 1),
              windowWidth * imageIndex,
              windowWidth * (imageIndex + 1),
            ],
            outputRange: [8, 16, 8],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={imageIndex}
              style={[styles.normalDot, { width }]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    // marginVertical: 4,
    marginHorizontal: 1,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    // margin:5
  },
  textContainer: {
    // backgroundColor: "rgba(0,0,0, 0.7)",
    backgroundColor: "rgba(255, 127, 80,0.6)",
    paddingHorizontal: 74,
    paddingVertical: 15,
    borderRadius: 5,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#ff7f50",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
