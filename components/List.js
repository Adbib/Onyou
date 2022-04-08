import React from "react";
import { useState, useEffect } from "react";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Modal,
  StyleSheet,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Header,
  ListItem,
  Avatar,
  Image,
  Rating,
  Chip,
  SearchBar,
  Tile,
  Icon,
  Badge,
} from "react-native-elements";

import { category, site, cat } from "./data";
import OnHeader from "./comps/Header";

export default function List({ navigation, route }) {
  const [respo, setrespo] = useState({ data: [], hasChilds: undefined });
  const [search, setsearch] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const icons = ["commute", "pets", "apartment", "park", "storefront"];
  const colors = ["red", "blue", "green"];

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
    let URL = `${site}/wp-json/wp/v2/directorypress-category?parent=${route.params.id}&_embed`;
    fetch(URL)
      .then(setisLoading(true))
      .then((response) => response.json())
      .then((json) => {
        if (json.length == 0) {
          let URL = `${site}/wp-json/wp/v2/dp_listing?directorypress-category=${route.params.id}&_embed&per_page=100`;
          //  let URL = `${site}/wp-json/wp/v2/dp_listing?directorypress-category=${route.params.id}`;$
          fetch(URL)
            .then((response) => response.json())
            .then((json) => {
              setrespo({ data: json, hasChilds: false });
              // console.log(respo);
            });
        } else {
          setrespo({ data: json, hasChilds: true });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setisLoading(false));
  }, [route.params.id]);

  const onRefresh = React.useCallback(() => {
    // let URL = `http://${site}:10015/wp-json/wp/v2/dp_listing?directorypress-category=${route.params.id}`;
    let URL = `${site}/wp-json/wp/v2/directorypress-category?parent=${route.params.id}`;
    fetch(URL)
      .then(setRefreshing(true))
      .then((response) => response.json())
      .then((json) => {
        if (json.length == 0) {
          let URL = `${site}/wp-json/wp/v2/dp_listing?directorypress-category=${route.params.id}&_embed&per_page=100`;
          fetch(URL)
            .then((response) => response.json())
            .then((json) => {
              setrespo({ data: json, hasChilds: false });
            });
        } else {
          setrespo({ data: json, hasChilds: true });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  }, []);

  const [Images, setImage] = useState(null);
  const getImage = (link) => {
    var image;
    // const res = await fetch(link["wp:featuredmedia"][0].href);
    // const jso = await res.json();
    // let image = JSON.stringify(jso.source_url);
    // console.log(image);
    return fetch(link["wp:featuredmedia"][0].href)
      .then((res) => res.json())
      .then((jso) => {
        // image = setImage(jso.source_url);
        // let image = jso.source_url;
        // console.log(image);
        const id = jso.id;
        setImage({ id: jso.source_url });
        // return jso.source_url;
      });
    // .catch((error) => setError("Error to get product image"));
    // console.log(image);
    // document.write(JSON.stringify(jso.source_url));
    return Image;
  };

  const getSearch = (e) => {
    fetch(`${site}/wp-json/wp/v2/dp_listing?search="${e}"&_embed`)
      .then((res) => res.json())
      .then((jso) => navigation.navigate("SearchResult", { data: jso }));
  };
  return (
    <>
      <View style={{ backgroundColor: "#ddd" }}>
        {/* <OnHeader navigation={navigation} /> */}
        <SearchBar
          onSubmitEditing={() => getSearch(search)}
          onK
          showCancel={true}
          // leftIconContainerStyle={{ color: "#ff7f50", backgroundColor: "red" }}
          searchIcon={() => (
            <Icon
              name="search"
              color="#ff7f50"
              onPress={() => getSearch(search)}
            />
          )}
          inputContainerStyle={{
            // backgroundColor: "rgba(143, 143, 143,0.5)",
            backgroundColor: "white",
            padding: 5,
          }}
          leftIconContainerStyle={{ padding: 15 }}
          placeholder="Search"
          onChangeText={(e) => setsearch(e)}
          value={search}
          round={true}
          // backgroundColor="rgba(500, 500, 500,0.7)"
          //    barStyle="light-content"
          //    lightTheme={true}
          backgroundColor="#eee"
          placeholderTextColor="#ff7f50"
          inputStyle={{
            // borderRadius: 5,
            paddingLeft: 10,
            paddingTop: 10,
            paddingBottom: 7,
            // backgroundColor: "red",
          }}
          inputContainerStyle={{ backgroundColor: "#eee" }}
          containerStyle={{
            backgroundColor: "white",
            borderBottomWidth: 0,
            borderTopWidth: 0,
            // marginBottom: 5,
            marginTop: 0,
          }}

          //    containerStyle={{backgroundColor:"white",borderColor:'red',margin:0,border:"5px solid"}}// "#ff7f50"
        />
      </View>

      {/* Content */}
      <Modal
        transparent={false}
        animationType={"slide"}
        visible={isLoading}
        style={{ zIndex: 1100 }}
        onRequestClose={() => {}}
        statusBarTranslucent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={isLoading}
              color={"red"}
              size="large"
            />
            <Text>Loading...</Text>
            {/* If you want to image set source here */}
            {/* <Image
              source={require('../assets/images/loader.gif')}
              style={{ height: 80, width: 80 }}
              resizeMode="contain"
              resizeMethod="resize"
            /> */}
          </View>
        </View>
      </Modal>

      <ScrollView
        style={{
          backgroundColor: "white",
          paddingTop: 10,
        }}
        refreshControl={
          <RefreshControl
            size="large"
            colors={colors}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {respo.hasChilds ? (
          <View
            style={{ marginTop: 10, marginLeft: 5, backgroundColor: "white" }}
          >
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#ff7f50" }}
            >
              Sub Category
            </Text>
            <View
              style={{
                // flexDirection: "row",
                // flexWrap: "wrap",
                // alignItems: "center",
                // justifyContent: "center",
                margin: 5,
              }}
            >
              {respo.data.map((l, i) => {
                return (
                  <ListItem
                    key={i}
                    style={{ margin: 5, borderRadius: 50 }}
                    Component={TouchableScale}
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    // linearGradientProps={{
                    //   colors: ["#FF9800", "#F44336"],
                    //   start: { x: 1, y: 0 },
                    //   end: { x: 0.2, y: 0 },
                    // }}
                    // ViewComponent={LinearGradient}
                    // Only if no expo
                    onPress={() =>
                      navigation.navigate("List", {
                        name: l.name,
                        id: l.id,
                        parent: l.parent,
                      })
                    }
                  >
                    {/* <Icon
                    raised
                    name={icons[Math.floor(Math.random() * icons.length)]}
                    color="#00aced"
                  /> */}
                    <Avatar
                      size={60}
                      rounded
                      source={{
                        uri: l._embedded["up"][0].directorypress_category_icon
                          .src,
                      }}
                    ></Avatar>

                    <ListItem.Content>
                      <ListItem.Title
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        {l.name}
                      </ListItem.Title>
                      <ListItem.Subtitle style={{ color: "#ccc" }}>
                        {l.description}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="#aaa" size={24} />
                  </ListItem>
                );
              })}
            </View>
          </View>
        ) : (
          <ScrollView
            // showsHorizontalScrollIndicator={true}
            // showsVerticalScrollIndicator={true}
            // vertical={true}
            contentContainerStyle={{
              flex: 1,
              flexDirection: "row",
              // // backgroundColor: "#ddd",
              // maxWidth: 300,
              flexWrap: "wrap",
              // width: "100%",
              // height: 1000,
              alignItems: "center",
              alignContent: "center",
              // alignItems: "flex-start",
              // alignItems: "flex-start",
            }}
            style={{
              // padding: 1,
              // alignItems: "center",
              backgroundColor: "#ddd",
              flexDirection: "row",
              flex: 1,
              flexWrap: "nowrap",
            }}
            // containerStyle={{
            //   alignItems: "center",
            //   alignContent: "center",
            // }}
          >
            {respo.data.map((l, i) => {
              {
                /* console.log(l._embedded["wp:featuredmedia"][0].source_url); */
              }
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    navigation.navigate("SingleProduct", {
                      name: "SingleProduct",
                      infos: l,
                    })
                  }
                  style={{
                    // flexBasis: "50%",
                    // width: 50,
                    height: 300, //Dimensions.get("window").height / 1.8,
                    width: Dimensions.get("window").width / 2.1,
                    margin: 4,
                    marginBottom: 10,
                    borderRadius: 20,
                    flexDirection: "column",
                    shadowColor: "#999",
                    shadowOffset: {
                      width: 310,
                      height: 310,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 20,

                    elevation: 50,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    backgroundColor: "white",
                  }}
                >
                  {/* <Text style={{}}>{l.title.rendered}</Text> */}
                  <Image
                    onPress={() =>
                      navigation.navigate("SingleProduct", {
                        name: "SingleProduct",
                        infos: l,
                      })
                    }
                    source={{
                      uri: l._embedded["wp:featuredmedia"][0].source_url,
                    }}
                    // resizeMode={"cover"}
                    style={{
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      width: "100%",
                      height: "70%",
                      // backgroundColor: "red",
                      // marginBottom: -50,
                      // paddingBottom: -50,
                      // aspectRatio: 1,
                    }}
                  />
                  <View style={{ padding: 5 }}>
                    <Text
                      // onPress={() =>
                      //   navigation.navigate("SingleProduct", {
                      //     name: "SingleProduct",
                      //     infos: l,
                      //   })
                      // }
                      style={{
                        marginTop: -60,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {l.title.rendered}
                    </Text>
                    <Text style={{ color: "#ccc", fontSize: 12 }}>
                      {route.params.name}
                    </Text>
                    <Rating
                      style={{
                        marginTop: 5,
                        marginBottom: 5,
                        alignSelf: "flex-start",
                      }}
                      imageSize={20}
                      fractions={1}
                      startingValue={3.3}
                    />
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      // alignContent: "center",
                      height: 10,
                      padding: 10,
                    }}
                  >
                    <Chip
                      style={{ width: "30%", backgroundColor: "red" }}
                      type="outline"
                      // size={5}
                      titleStyle={{ fontSize: 12 }}
                      title={
                        l._address_line_1.split(",")[0]
                          ? l._address_line_1.split(",")[0]
                          : "undefined"
                      }
                      containerStyle={{ marginTop: 5, width: "70%" }}
                      icon={{
                        name: "place",
                        size: 10,
                        // color: "white",
                      }}
                    />
                    <Text
                      style={{
                        width: "33%",
                        color: "#ff7f50",
                        alignItems: "center",
                        textAlign: "right",
                        fontWeight: "bold",
                        fontSize: 16,
                        // backgroundColor: "red",
                      }}
                    >
                      {l._field_9}$
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </ScrollView>
    </>
  );
}

//  <ListItem
//             key={i}
//             bottomDivider
//             containerStyle={{
//               backgroundColor: "white",
//               marginBottom: 10,
//               borderRadius: 5,
//               shadowColor: "#000",
//               shadowOffset: {
//                 width: 0,
//                 height: 3,
//               },
//               shadowOpacity: 0.27,
//               shadowRadius: 4.65,

//               elevation: 6,
//               flexDirection: "column",
//               //   flex: 1,
//               alignItems: "flex-start",
//             }}
//           >
//             <Image
//               source={{
// uri: l.avatar_url,
//               }}
//               style={{
//                 width: 200,
//                 height: 200,
//                 margin: 10,
//                 alignItems: "center",
//               }}
//             />
//             <ListItem.Content>
//               <ListItem.Title
//                 style={{
//                   color: "#ff7f50",
//                   fontWeight: "bold",
//                   fontSize: 18,
//                   textAlign: "left",
//                   //   alignSelf: "stretch",
//                   //   alignSelf: "flex-end",
//                   //   flex: 1,
//                   //   flexDirection: "row",
//                 }}
//               >
//                 {l.name}
//               </ListItem.Title>
//               <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
//               <Text>5000$</Text>
//               <Rating
//                 style={{ marginTop: 5, marginBottom: 5 }}
//                 imageSize={20}
//                 fractions="{1}"
//                 startingValue="{3.3}"
//               />
//               <Chip
//                 title="Category name"
//                 icon={{
//                   name: "place",
//                   size: 20,
//                   color: "white",
//                 }}
//               />
//             </ListItem.Content>
//           </ListItem>

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    // flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

{
  /* <ListItem
                    key={i}
                    style={{ margin: 5, borderRadius: 50 }}
                    Component={TouchableScale}
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    // linearGradientProps={{
                    //   colors: ["#FF9800", "#F44336"],
                    //   start: { x: 1, y: 0 },
                    //   end: { x: 0.2, y: 0 },
                    // }}
                    // ViewComponent={LinearGradient}
                    // Only if no expo
                    onPress={() =>
                      navigation.navigate("List", {
                        name: l.name,
                        id: l.id,
                        parent: l.parent,
                      })
                    }
                  >
                    <Avatar
                      size={60}
                      rounded
                      source={{ uri: l.directorypress_category_icon.src }}
                    ></Avatar>

                    <ListItem.Content>
                      <ListItem.Title
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        {l.name}
                      </ListItem.Title>
                      <ListItem.Subtitle style={{ color: "#ccc" }}>
                        {l.description}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="#aaa" size={24} />
                  </ListItem> */
}
