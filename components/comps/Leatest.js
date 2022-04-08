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
import { Icon, Tooltip } from "react-native-elements";

import Carousel from "react-native-snap-carousel";

export default function Leatest({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(data);
  const ref = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();
  const [prntCat, setprntCat] = useState([]);

  useEffect(() => {
    //   console.log(typeof Leatest);
    fetch(`${site}/wp-json/wp/v2/dp_listing?per_page=100&_embed`)
      .then((res) => res.json())
      .then((json) => setCarouselItems(json));
  }, []);

  const renderItem = ({ item, index }) => {
    // console.log(item);
    return (
      <>
        <TouchableOpacity
          key={index}
          style={{
            flex: 1,
            height: 350,
            // width: "70%",
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
            <Text style={{ color: "#f28a29", marginBottom: 5, marginTop: 10 }}>
              {" "}
              {item._embedded ? item._embedded["wp:term"][0][0].name : ""}{" "}
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
            autoplay={true}
            enableMomentum={false}
            loop={true}
            lockScrollWhileSnapping={true}
            layout="default"
            ref={ref}
            data={carouselItems.slice(0, 10)}
            sliderWidth={windowWidth}
            itemWidth={windowWidth - 220}
            itemHeight={100}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
            slideStyle={{
              flex: 1,
              //   padding: -50,
              // borderLeftColor: "#ddd",
              // borderRightColor: "#ddd",
              //   padding: 10,
              // borderLeftWidth: 2,
              // borderRightWidth: 2,
              // width: "70%",
              alignItems: "center",
              //   alignContent: "center",
              //   backgroundColor: "red",
              //   marginLeft: -10,
              //   marginRight: -10,
              //   width: windowWidth,
              //   borderRadius: 10,
              // shadowColor: "#000",
              // shadowOffset: {
              //   width: 0,
              //   height: 2,
              // },
              // shadowOpacity: 0.25,
              // shadowRadius: 3.84,
              //   padding: 0,
              //   margin: 0,
              //   width: "60%",
              // elevation: 2,
              marginBottom: 10,
              justifyContent: "center",
              //   marginHorizontal: 1,
              //   marginVertical: 1,
              //   backgroundColor: "red",
              //   alignSelf: "center",
            }}
          />
          <Carousel
            autoplay={true}
            enableMomentum={false}
            loop={true}
            lockScrollWhileSnapping={true}
            layout="default"
            ref={ref}
            data={carouselItems.slice(10, 20)}
            sliderWidth={windowWidth}
            itemWidth={windowWidth - 220}
            itemHeight={100}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
            slideStyle={{
              flex: 1,
              alignItems: "center",

              marginBottom: 10,
              justifyContent: "center",
            }}
          />

          <Carousel
            autoplay={true}
            enableMomentum={false}
            loop={true}
            lockScrollWhileSnapping={true}
            layout="default"
            ref={ref}
            data={carouselItems.slice(20, 30)}
            sliderWidth={windowWidth}
            itemWidth={windowWidth - 220}
            itemHeight={100}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
            slideStyle={{
              flex: 1,
              alignItems: "center",

              marginBottom: 10,
              justifyContent: "center",
            }}
          />
          <Carousel
            autoplay={true}
            enableMomentum={false}
            loop={true}
            lockScrollWhileSnapping={true}
            layout="default"
            ref={ref}
            data={carouselItems.slice(30, 40)}
            sliderWidth={windowWidth}
            itemWidth={windowWidth - 220}
            itemHeight={100}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
            slideStyle={{
              flex: 1,
              alignItems: "center",

              marginBottom: 10,
              justifyContent: "center",
            }}
          />
        </View>
      </SafeAreaView>
    </>
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
  //   textContainer: {
  //     // backgroundColor: "rgba(0,0,0, 0.7)",
  //     backgroundColor: "rgba(255, 127, 80,0.6)",
  //     paddingHorizontal: 74,
  //     paddingVertical: 15,
  //     borderRadius: 5,
  //   },
  //   infoText: {
  //     color: "black",
  //     fontSize: 16,
  //     fontWeight: "bold",
  //     textAlign: "center",
  //   },
  //   normalDot: {
  //     height: 8,
  //     width: 8,
  //     borderRadius: 4,
  //     backgroundColor: "black",
  //     marginHorizontal: 4,
  //     // marginBottom: 10,
  //     // zIndex: 1000,
  //   },
  //   indicatorContainer: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     // marginTop: 10,
  //   },
});
