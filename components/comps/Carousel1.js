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
  const [prntCat, setprntCat] = useState([]);

  const URL = `${site}/auth.php`;
  useEffect(() => {
    let formData = new FormData();
    formData.append("type", "prntCat");
    fetch(URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json.arr);
        setCarouselItems(json.arr);
        // setprntCat(json.arr);
        // AsyncStorage.setItem("categories", JSON.stringify(json));
      })
      .catch((error) => console.error(error));
    // .finally(() => setLoading(false));

    // let formData1 = new FormData();
    // formData1.append("type", "allCat");
    // fetch(URL, {
    //   method: "POST",
    //   body: formData1,
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     // setcatrespo(json.arr);
    //   })
    //   .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item, index }) => {
    // console.log(item);
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("List", {
              name: item.name,
              id: item.id,
              parent: item.id,
            })
          }
          style={{
            height: 120,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={{
              uri: item.img
                ? item.img.src
                : "https://onyou.ca/wp-content/uploads/2021/06/logoonyou-1.png",
            }}
            style={styles.card}
          >
            {/* <View style={styles.textContainer}> */}
            {/* </View> */}
          </ImageBackground>
          <Text style={styles.infoText}>{item.name}</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View>
          <Carousel
            // autoplay={true}
            // enableMomentum={false}
            // loop={true}
            lockScrollWhileSnapping={true}
            layout="default"
            firstItem={5}
            ref={ref}
            data={carouselItems}
            sliderWidth={windowWidth}
            itemWidth={80}
            itemHeight={80}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
            slideStyle={{
              // borderLeftColor: "#ddd",
              // borderRightColor: "#ddd",
              // borderLeftWidth: 2,
              // borderRightWidth: 2,
              alignItems: "center",
              alignContent: "center",
              backgroundColor: "white",
              borderRadius: 10,
              // shadowColor: "#000",
              // shadowOffset: {
              //   width: 0,
              //   height: 2,
              // },
              // shadowOpacity: 0.25,
              // shadowRadius: 3.84,

              // elevation: 2,
              marginBottom: 10,
            }}
          />
        </View>
        {/* <View style={styles.indicatorContainer}>
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
        </View> */}
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
    alignContent: "center",
    height: 65,
    width: 65,
    resizeMode: "center",
    // backgroundColor: "red",
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
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 3,
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
