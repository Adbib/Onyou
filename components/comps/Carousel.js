import { data, site } from "../data";
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Carousel from "react-native-snap-carousel";

export default function Carousel1({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(data);
  const ref = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  // const renderItem = useCallback(({ item, index }) => {
  //   return (
  //     <>
  //       <ImageBackground source={{ uri: item.imgUrl }} style={styles.card}>
  //         <View style={styles.textContainer}>
  //           <Text style={styles.infoText}>{item.title}</Text>
  //         </View>
  //       </ImageBackground>
  //     </>
  //   );
  // }, []);
  useEffect(() => {
    fetch(`${site}/wp-json/wp/v2/dp_listing?per_page=5&_embed`)
      .then((res) => res.json())
      .then((json) => setCarouselItems(json));
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SingleProduct", {
              name: "SingleProduct",
              infos: item,
            })
          }
        >
          <ImageBackground
            source={{
              uri: item._embedded["wp:featuredmedia"][0]
                ? item._embedded["wp:featuredmedia"][0].source_url
                : "https://onyou.ca/wp-content/uploads/2021/06/logoonyou-1.png",
            }}
            style={styles.card}
          >
            <View style={styles.textContainer}>
              <Text style={styles.infoText}>{item.title.rendered}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          // backgroundColor: "#F59A35",
          // marginLeft: 15,
          // marginRight: 15,
          // padding: 10,
          // paddingBottom: 20,
          // borderRadius: 20,
          // alignItems: "center",
        }}
      >
        <View>
          <Carousel
            layout="default"
            ref={ref}
            data={carouselItems}
            sliderWidth={windowWidth}
            itemWidth={300}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
            // onScroll={Animated.event(
            //   [
            //     {
            //       nativeEvent: {
            //         contentOffset: {
            //           x: scrollX,
            //         },
            //       },
            //     },
            //   ],
            //   { useNativeDriver: false }
            // )}
          />
        </View>
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
                // style={[styles.normalDot, { width }]} activeIndex
                style={{
                  height: 8,
                  width: activeIndex == imageIndex ? 18 : 8,
                  // borderRadius: 4,
                  backgroundColor: "#F59A35",
                  marginHorizontal: 4,
                  margin: 10,
                }}
              />
            );
          })}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    // flexDirection: "column",
    marginVertical: 4,
    // marginHorizonstal: 6,
    marginHorizontal: 1,
    // margin: 6,
    // marginRight: 5,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    resizeMode: "center",
    // borderBottomRightRadius: 10,/
    // resizeMode: "cover",
    // borderRadius: 10,
    // width: "100%",
    // alignSelf: "center",
    // backgroundColor: "red",
    // width: 35s0,
    // margin:5
    // backgroundColor: "red",
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
    backgroundColor: "black",
    marginHorizontal: 4,
    // marginBottom: 10,
    // zIndex: 1000,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 10,
  },
});
