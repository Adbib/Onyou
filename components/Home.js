import React from "react";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  Animated,
  useWindowDimensions,
  ImageBackground,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  // Header,
  SearchBar,
  Icon,
  Avatar,
  ListItem,
  SocialIcon,
} from "react-native-elements";
import { data, catego } from "./data";
import ImagedCarouselCard from "react-native-imaged-carousel-card";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import { LinearGradient } from "expo-linear-gradient";
import OnHeader from "./comps/Header";
import Carousel1 from "./comps/Carousel1";
import { site } from "./data";
import { mainContext } from "./context/Context";
import Leatest from "./comps/Leatest";
import { EN, FR, ES } from "./context/langueges";

const onPressFunction = ({ navigation }) => {
  navigation.navigate("List", { name: "List" });
};
function Home({ navigation, ...rest }) {
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 60;
  // Initial value for opacity: 0
  const { width: windowWidth } = useWindowDimensions();
  const [search, setsearch] = useState("");
  // const URL = `${site}/wp-json/wp/v2/directorypress-category?per_page=100`;
  const URL = `${site}/auth.php`;

  // const icons = ["commute", "pets", "apartment", "park", "storefront"];
  const {
    setIsLoading,
    isLogged,
    setIsLogged,
    setUserProfile,
    catrespo,
    setcatrespo,
    Language,
    setLanguage,
  } = useContext(mainContext);
  const [prntCat, setprntCat] = useState([]);
  // const [Leatest, setLeatest] = useState(null);
  const getSearch = (e) => {
    fetch(`${site}/wp-json/wp/v2/dp_listing?search="${e}"&_embed`)
      .then((res) => res.json())
      .then((jso) => navigation.navigate("SearchResult", { data: jso }));
  };
  useEffect(() => {
    // console.log(catrespo.length);
    let formData = new FormData();
    formData.append("type", "prntCat");
    fetch(URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json.arr);
        setprntCat(json.arr);
        // AsyncStorage.setItem("categories", JSON.stringify(json));
      })
      .catch((error) => console.error(error));
    // .finally(() => setLoading(false));

    let formData1 = new FormData();
    formData1.append("type", "allCat");
    fetch(URL, {
      method: "POST",
      body: formData1,
    })
      .then((response) => response.json())
      .then((json) => {
        setcatrespo(json.arr);
      })
      .catch((error) => console.error(error));

    // fetch(`${site}/wp-json/wp/v2/dp_listing?per_page=100&_embed`)
    //   .then((res) => res.json())
    //   .then((json) => setLeatest(json));
  }, []);

  // useEffect(() => {
  //   // console.log(catrespo.length);
  //   let formData = new FormData();
  //   formData.append("type", "alltCat");
  //   fetch(URL, {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setcatrespo(json.arr);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  // useEffect(() => {
  //   AsyncStorage.getItem("userProfile").then((value) => {
  //     if (value) {
  //       setUserProfile(JSON.parse(value)),
  //         setIsLoading(false),
  //         setIsLogged(true);
  //     } else {
  //       setIsLoading(false), setIsLogged(false);
  //     }
  //   });
  // }, []);
  return (
    <>
      <SearchBar
        showCancel={true}
        onSubmitEditing={() => getSearch(search)}
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
        leftIconContainerStyle={{
          padding: 15,
        }}
        placeholder={Language.Screens.Home.Search}
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
          paddingTop: 7,
          paddingBottom: 7,
          // backgroundColor: "red",
        }}
        inputContainerStyle={{ backgroundColor: "#eee" }}
        containerStyle={{
          backgroundColor: "white",
          borderBottomWidth: 0,
          borderTopWidth: 0,
          marginBottom: 5,
          marginTop: 0,
        }}

        //    containerStyle={{backgroundColor:"white",borderColor:'red',margin:0,border:"5px solid"}}// "#ff7f50"
      />
      <ScrollView
        style={{ backgroundColor: "#eee" }}
        contentContainerStyle={{ alignItems: "center", alignContent: "center" }}
      >
        {/* Header */}
        {/* <OnHeader navigation={navigation} /> */}
        {/* Search Bar */}
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 23,
            textAlign: "center",
            color: "#f28a29",
            marginBottom: 10,
          }}
        >
          ONYOU Best Place For Ads in Canada
        </Text>
        {/* Carousel */}
        <Carousel1 navigation={navigation} />
        <Leatest navigation={navigation} />
        {/* {Leatest ? (
          Leatest.splice(0, 2).map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  flex: 1,
                  height: 350,
                  width: "80%",
                  marginTop: 20,
                  borderColor: "#fff",
                  borderWidth: 4,
                  backgroundColor: "white",
                  // alignItems: "center",
                  // alignContent: "center",
                  // textAlign: "center",
                }}
              >
                <ImageBackground
                  source={{
                    uri: "https://onyou.ca/wp-content/uploads/2021/07/onyou1.png",
                  }}
                  style={styles.card}
                ></ImageBackground>
                <View style={{ height: "30%", padding: 10 }}>
                  <Text
                    style={{ color: "#f28a29", marginBottom: 5, marginTop: 10 }}
                  >
                    {" "}
                    {item._embedded["wp:term"][0][0].name}{" "}
                  </Text>
                  <Text
                    style={{ fontWeight: "100", fontSize: 18, marginTop: 5 }}
                  >
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
                    <Icon name="phone" color="#f28a29" />
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
          })
        ) : (
          <Text>Wait</Text>
        )}
        <Text>hhhhhhhhhhhhhhhhhhhh</Text>
        {Leatest &&
          Leatest.map((item, index) => {
            return <Text key={index}>{item.title.rendered}</Text>;
          })} */}
      </ScrollView>
      <View
        style={{
          backgroundColor: "white",
          // padding: 10,
          paddingLeft: 10,
          padding: 3,
          flexDirection: "row",
          // flex: 1,
        }}
      >
        <View style={{ width: "20%" }}>
          <Icon
            name="menu"
            color="#ff7f50"
            raised
            onPress={() => navigation.toggleDrawer("DrawerRight")}
            // onPress={() => console.log(rest)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            justifyContent: "center",
            // backgroundColor: "red",
            alignItems: "center",
          }}
        >
          <SocialIcon
            style={{ backgroundColor: "#f28a29", borderRadius: 5, padding: 5 }}
            type="twitter"
            iconSize={15}
            // light
            raised={false}
          />
          <SocialIcon
            style={{ backgroundColor: "#f28a29", borderRadius: 5, padding: 5 }}
            type="facebook"
            iconSize={15}
            // light
            raised={false}
          />
          <SocialIcon
            style={{ backgroundColor: "#f28a29", borderRadius: 5, padding: 5 }}
            type="instagram"
            iconSize={15}
            // light
            raised={false}
          />
          <SocialIcon
            type="youtube"
            iconSize={15}
            // light
            style={{ backgroundColor: "#f28a29", borderRadius: 5, padding: 5 }}
            raised={false}
          />
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            width: "35%",
            // alignItems: "flex-end",
            // alignContent: "flex-end",
            justifyContent: "flex-end",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => setLanguage(EN)}>
            <Image
              style={{ width: 35, height: 20, margin: 2 }}
              source={require("../assets/Flags/usa.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setLanguage(ES)}>
            <Image
              style={{ width: 35, height: 20, margin: 2 }}
              source={require("../assets/Flags/es.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLanguage(FR)}>
            <Image
              style={{ width: 35, height: 20, margin: 2 }}
              source={require("../assets/Flags/fr.png")}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    backgroundColor: "green",
  },
});
{
  /* {respo.map((item, i) => (
  <ListItem
    key={item.id}
    style={{ margin: 5, borderRadius: 50 }}
    Component={TouchableScale}
    friction={90} //
    tension={100} // These props are passed to the parent component (here TouchableScale)
    activeScale={0.95} //
    linearGradientProps={{
      colors: ["#FF9800", "#F44336"],
      start: { x: 1, y: 0 },
      end: { x: 0.2, y: 0 },
    }}
    ViewComponent={LinearGradient}
    // Only if no expo
    onPress={() => navigation.navigate("List", { name: item.name })}
  >

    <Icon
      raised

      name={"home"}
      color="#00aced"
    />
    <ListItem.Content>
      <ListItem.Title style={{ color: "white", fontWeight: "bold" }}>
        {item.name}
      </ListItem.Title>
      <ListItem.Subtitle style={{ color: "white" }}>
        "{item.subtitle}"
      </ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Chevron color="white" />
  </ListItem>
))} */
}

{
  /* <ListItem
              key={i}
              style={{ margin: 5, borderRadius: 50 }}
              Component={TouchableScale}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
              linearGradientProps={{
                colors: ["#FF9800", "#F44336"],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 },
              }}
              ViewComponent={LinearGradient}
              // Only if no expo
              onPress={() =>
                navigation.navigate("List", {
                  name: l.name,
                  id: l.id,
                  parent: l.parent,
                })
              }
            >
              <Icon
                raised
                name={icons[Math.floor(Math.random() * icons.length)]}
                color="#00aced"
              />
              <ListItem.Content>
                <ListItem.Title style={{ color: "white", fontWeight: "bold" }}>
                  {l.name}
                </ListItem.Title>
                <ListItem.Subtitle style={{ color: "white" }}>
                  {l.description}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="white" />
            </ListItem> */
}
