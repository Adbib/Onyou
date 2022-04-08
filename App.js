import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { View, Text, ScrollView, I18nManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HTML from "react-native-render-html";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./components/Home";
import {
  Icon,
  Avatar,
  ListItem,
  Divider,
  Button,
  Image,
} from "react-native-elements";
import RNRestart from "react-native-restart";
import { Restart } from "fiction-expo-restart";
import { Updates } from "expo";
import AboutUs from "./components/AboutUs";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PrivacyPolicy from "./components/PrivacyPolicy";
import List from "./components/List";
import subCategory from "./components/subCategory";
import Favorite from "./components/Favorite";
// import AddItem from "./components/AddItem";
import AddItem from "./components/AddItem";
import SingleProduct from "./components/SingleProduct";
import Animated from "react-native-reanimated";
import { mainContext } from "./components/context/Context";
import DropDownPicker from "react-native-dropdown-picker";
import { EN, FR, ES, AR, HI, CH } from "./components/context/langueges";
import SearchResult from "./components/SearchResult";
const Drawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();
const AppStack = createStackNavigator();

function Notifications() {
  const { userProfile } = useContext(mainContext);
  const [messages, setmessages] = useState({});
  useEffect(() => {
    setmessages({});
    fetch("https://onyou.ca/wp-json/wp/v2/difp_message")
      .then((rest) => rest.json())
      .then((json) => {
        setmessages(json);
        // json.map((msg,index)=>{
        //   if (msg._difp_participants==1){
        //     if (Object.keys(messages).length ==0){
        //       setmessages({index:msg})
        //       // console.log(Object.keys(messages).length)
        //     }
        //     else{
        //       setmessages({...messages,index:msg})
        //     }
        //     // console.log(messages)
        //   }else{console.log("no")}
        // })
      });
  }, []);

  if (Object.keys(messages).length > 0) {
    return (
      <ScrollView style={{ backgroundColor: "white", paddingTop: 50 }}>
        {messages.map((msg, index) => {
          const source = {
            html: `<h7 style="font-size:15;color:#666 "> ${msg.content.rendered}</h7>`,
          };
          if (msg._difp_participants == 1) {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: "#ebedef",
                  height: 100,
                  margin: 5,
                  borderRadius: 5,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 6,
                    height: 6,
                  },
                  shadowOpacity: 0.9,
                  shadowRadius: 3.84,

                  elevation: 2,
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    fontWeight: "bold",
                    fontSize: 18,
                    color: "#34495e",
                  }}
                >
                  {msg.title.rendered}
                </Text>
                {/* <Text> {} </Text> */}
                <View style={{ padding: 5 }}>
                  <HTML source={source} />
                </View>
              </View>
            );
          }
          {
            /* <Text>jjjjjh</Text>  */
          }
        })}
      </ScrollView>
      // </View>
    );
  }

  if (Object.keys(messages).length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#f28a29" }}>
          Hmmm! no messages yet.
        </Text>
      </View>
    );
  }
}

function CustomDrawerContent({ progress, ...rest }) {
  // console.log(rest.navigation);
  const navigation = useNavigation();
  const {
    isLoading,
    setIsLoading,
    isLogged,
    setIsLogged,
    userToken,
    setUserToken,
    userProfile,
    setUserProfile,
    loggingIn,
    setloggingIn,
    Language,
    setLanguage,
    setselectedLang,
  } = useContext(mainContext);
  const doLogout = async () => {
    try {
      setIsLogged(false);
      await AsyncStorage.removeItem("userProfile");
      setloggingIn(true);
      setUserProfile(null);
      setloggingIn(false);
      return true;
    } catch (exception) {
      return false;
    }
  };
  const translateX = Animated.interpolateNode(
    progress,
    {
      inputRange: [0, 1],
      outputRange: [10, 0],
      // useNativeDriver: true,
    },
    { useNativeDriver: true }
  );

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    {
      label: "French",
      value: "FR",
      // icon: <Image source={{ uri: require("./assets/logo.png") }} />,
    },
    {
      label: "English",
      value: "EN",
      // icon: <Image source={{ uri: require("./assets/logo.png") }} />,
    },
    {
      label: "Espagnol",
      value: "ES",
      // icon: <Image source={{ uri: require("./assets/logo.png") }} />,
    },
    {
      label: "Arabic",
      value: "AR",
      // icon: <Image source={{ uri: require("./assets/logo.png") }} />,
    },
    {
      label: "Hindi",
      value: "HI",
      // icon: <Image source={{ uri: require("./assets/logo.png") }} />,
    },
    {
      label: "Chinese",
      value: "CH",
      // icon: <Image source={{ uri: require("./assets/logo.png") }} />,
    },
  ]);

  return (
    <>
      <DrawerContentScrollView {...rest} initialRouteName="Favorite">
        <Animated.View style={{ transform: [{ translateX }] }}>
          {isLogged && (
            <>
              <View>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "column",
                    paddingTop: 20,
                    // paddingBottom: 10,
                  }}
                >
                  <Avatar
                    // title={userProfile.name}
                    rounded
                    size="large"
                    source={{ uri: userProfile.avatar }}
                    avatarStyle={{
                      borderColor: "#f28a29",
                      borderWidth: 2,
                    }}
                  />
                  <Text style={{ margin: 5, fontWeight: "bold", fontSize: 18 }}>
                    {userProfile.name}
                  </Text>
                </View>
                <View
                  style={{
                    // flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    flex: 1,
                    paddingBottom: 10,
                  }}
                >
                  <View
                    style={{
                      // flexDirection: "row",
                      // alignItems: "center",
                      // alignContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      alignContent: "center",
                      flex: 1,
                    }}
                  >
                    <Button
                      icon={<Icon name="add" color="#f28a29" />}
                      title={Language.Menu.AddItem}
                      buttonStyle={{
                        margin: 5,
                        borderColor: "#f28a29",
                        color: "#f28a29",
                      }}
                      type="outline"
                      onPress={() =>
                        navigation.navigate("AddItem", { name: "AddItem" })
                      }
                      titleStyle={{ color: "#f28a29" }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      alignContent: "center",
                      flex: 1,
                    }}
                  >
                    <Button
                      icon={<Icon name="logout" color="#fe5440" />}
                      title={Language.Menu.Logout}
                      buttonStyle={{ margin: 5, borderColor: "#fe5440" }}
                      titleStyle={{ color: "#fe5440" }}
                      type="outline"
                      onPress={() => doLogout()}
                    />
                  </View>
                </View>
                <Divider
                  style={{
                    backgroundColor: "#f28a29",
                    height: 1,
                    // width: 250,
                    opacity: 0.5,
                  }}
                />
              </View>
            </>
          )}
          <DrawerItemList {...rest} />
        </Animated.View>

        {/* <View
          style={{
            flexDirection: "row",
            // alignItems: "center",
            // alignContent: "center",
            // textAlign: "center",
            // flex: 1,
            // width: "90%",
            // marginBottom: 10,
            // padding: 10,
            paddingTop: 20,
            paddingLeft: 10,
            paddingBottom: 5,
            marginTop: 100,
            // backgroundColor: "red",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
              color: "#f28a29",
            }}
          >
            Language :{" "}
          </Text>
          <View>
            <DropDownPicker
              onChangeValue={(value) => {
                console.log(value);
              }}
              theme="DARK"
              dropDownDirection="TOP"
              dropDownContainerStyle={
                {
                  // backgroundColor: "#dfdfdf",
                  // width: "50%",
                  // alignItems: "center",
                  // alignSelf: "center",
                }
              }
              placeholder="Select"
              style={
                {
                  // width: "50%",
                  // alignSelf: "center",
                }
              }
              open={true}
              // value={value}
              items={items}
              // setOpen={setOpen}
              // setValue={setValue}
              // setItems={setItems}
            />
          </View>
        </View> */}
      </DrawerContentScrollView>
      <View
        style={{
          // borderTopColor: "#f28a29",
          // borderTopWidth: 5,
          padding: 10,
          paddingTop: open ? 80 : 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
              color: "#f28a29",
            }}
          >
            {Language.Menu.Language} :{" "}
          </Text>
        </View>
        <View>
          <DropDownPicker
            onChangeValue={(value) => {
              setselectedLang(value);
              if (value == "FR") {
                setLanguage(FR);
              }
              if (value == "EN") {
                setLanguage(EN);
              }
              if (value == "ES") {
                setLanguage(ES);
              }
              if (value == "AR") {
                setLanguage(AR);
              }
              if (value == "HI") {
                setLanguage(HI);
              }
              if (value == "CH") {
                setLanguage(CH);
              }
            }}
            theme="DARK"
            dropDownDirection="TOP"
            dropDownContainerStyle={{
              width: "50%",
              alignSelf: "center",
            }}
            placeholder="Select"
            style={{
              width: "50%",
              alignSelf: "center",
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
      </View>
    </>
  );
}

export function MyDrawer({ navigation }) {
  const { isLogged, Language, selectedLang, setLanguage, setselectedLang } =
    useContext(mainContext);

  // I18nManager.allowRTL(false);
  // else setLanguage(Language);
  // I18nManager.forceRTL(false);
  // if (I18nManager.isRTL) setLanguage(AR);
  if (!I18nManager.isRTL) {
    if (selectedLang == "AR") {
      I18nManager.forceRTL(true);
      setselectedLang("");
      Restart();
      // setLanguage(AR);
    }
    console.log("1");
  }
  if (I18nManager.isRTL) {
    if (
      selectedLang == "EN" ||
      selectedLang == "FR" ||
      selectedLang == "ES" ||
      selectedLang == "HI" ||
      selectedLang == "CH"
    ) {
      I18nManager.forceRTL(false);
      setselectedLang("");
      Restart();
    }
  }

  useEffect(() => {
    if (I18nManager.isRTL) setLanguage(AR);
    if (!I18nManager.isRTL) setLanguage(Language);
    // else setLanguage(EN);
  }, []);

  console.log(selectedLang);

  return (
    <Drawer.Navigator
      // drawerPosition="right"
      drawerContentOptions={{
        activeTintColor: "white",
        activeBackgroundColor: "#f28a29",
        // inactiveTintColor: "blue",
        inactiveBackgroundColor: "white",
        labelStyle: {
          // marginLeft: 5,
          // fontFamily: "BalsamiqSans_400Regular",
          // textAlign: selectedLang == "AR" ? "center" : "left",
          fontSize: selectedLang == "AR" ? 15.5 : 15,
          fontSize: selectedLang == "HI" || selectedLang == "CH" ? 16 : 15,
          fontWeight: "bold",
          // color: "white",
          // justifyContent: "center",
          // alignItems: "center",
          // alignContent: "center",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      // initialRouteName="Favorite"
      // initialRouteName="RightDrawer"
      // drawerPosition="left"
    >
      {/* <Drawer.Screen name="RightDrawer" component={MyDrawerRight} /> */}
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          cardShadowEnabled: true,
          headerTransparent: true,
          headerShown: true,
          title: Language.Menu.Home,
          drawerIcon: ({ focused, size }) => (
            <Icon name="home" color="#f28a29" raised />
          ),
          headerStyle: {
            backgroundColor: "white", //"#f28a29",
            padding: 20,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            // fontSize: 30,
          },
          headerTitleStyle: {
            alignSelf: "center",
            color: "#f28a29",
            fontSize: 18,
            // fontSize: 30,
          },
          headerRight: () => (
            <Icon
              name="photo-camera"
              color="#f28a29"
              onPress={() =>
                navigation.navigate(isLogged ? "AddItem" : "Sign In")
              }
            />
          ),
          headerLeft: () => (
            <Image
              style={{
                height: 25,
                width: 85,
                alignItems: "center",
                justifyContent: "center",
              }}
              source={require("./assets/logo.png")}
            />
          ),
        }}
      />
      {isLogged && (
        <>
          <Drawer.Screen
            name="AddItem"
            component={AddItem}
            options={{
              title: Language.Menu.AddItem,
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f28a29",
              },
              drawerIcon: ({ focused, size }) => (
                <Icon name="add" color="#f28a29" raised />
              ),
            }}
          />
          <Drawer.Screen
            name="Favorite"
            component={Favorite}
            options={{
              title: Language.Menu.Favorite,
              drawerIcon: ({ focused, size }) => (
                <Icon name="favorite" color="#f28a29" raised />
              ),
            }}
          />
          <Drawer.Screen
            name="Messages"
            component={Notifications}
            options={{
              title: Language.Menu.Messages,
              drawerIcon: ({ focused, size }) => (
                <Icon name="message" color="#f28a29" raised />
              ),
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f28a29",
              },
            }}
          />
        </>
      )}
      {!isLogged && (
        <>
          <Drawer.Screen
            name="Sign In"
            component={SignIn}
            options={{
              title: Language.Menu.SignIn,
              drawerIcon: ({ focused, size }) => (
                <Icon raised name="login" color="#f28a29" />
              ),
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f28a29",
              },
              headerLeft: () => (
                <Icon
                  name="arrow-back"
                  onPress={() => navigation.goBack()}
                  style={{ paddingLeft: 20 }}
                  iconStyle={{ padding: 10 }}
                  // size={27}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: Language.Menu.SignUp,
              drawerIcon: ({ focused, size }) => (
                <Icon raised name="login" color="#f28a29" />
              ),
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f28a29",
              },
              headerLeft: () => (
                <Icon
                  name="arrow-back"
                  onPress={() => navigation.goBack()}
                  style={{ paddingLeft: 20 }}
                  iconStyle={{ padding: 10 }}
                  // size={27}
                />
              ),
            }}
          />
        </>
      )}

      <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{
          title: Language.Menu.AboutUs,
          drawerIcon: ({ focused, size }) => (
            <Icon name="groups" color="#f28a29" raised />
          ),
        }}
      />

      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicy}
        options={{
          title: Language.Menu.PrivacyPolicy,
          drawerIcon: ({ focused, size }) => (
            <Icon name="gavel" color="#f28a29" raised />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export function MyDrawerRight({ navigation }) {
  return (
    <RightDrawer.Navigator
      // drawerContent={(props) => <CustomDrawerContent {...props} />}
      // initialRouteName="Favorite"
      initialRouteName="Home"
      drawerPosition="right"
    >
      <RightDrawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicy}
        options={{
          title: "Privacy Policy",
          drawerIcon: ({ focused, size }) => (
            <Icon name="gavel" color="#f28a29" raised />
          ),
        }}
      />
    </RightDrawer.Navigator>
  );
}

const MyStack = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <AppStack.Screen name="Drawer" component={MyDrawer} />
      <AppStack.Screen name="RightDrawer" component={MyDrawerRight} />
      <AppStack.Screen
        name="List"
        component={List}
        options={{
          title: "Items List",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#f28a29",
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <AppStack.Screen name="subCategory" component={subCategory} />
      <AppStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "SignUp",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#f28a29",
          },
        }}
      />

      <AppStack.Screen
        name="SingleProduct"
        component={SingleProduct}
        options={{
          title: "Products Infos",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#f28a29",
          },
        }}
      />

      <AppStack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{
          title: "Search Result",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#f28a29",
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
    </AppStack.Navigator>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [UserId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loggingIn, setloggingIn] = useState(false);
  const [catrespo, setcatrespo] = useState([]);
  const [Language, setLanguage] = useState(EN);
  const [selectedLang, setselectedLang] = useState("");

  return (
    <mainContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isLogged,
        setIsLogged,
        userToken,
        setUserToken,
        userProfile,
        setUserProfile,
        loggingIn,
        setloggingIn,
        UserId,
        setUserId,
        catrespo,
        setcatrespo,
        Language,
        setLanguage,
        selectedLang,
        setselectedLang,
      }}
      initialRouteName="Favorite"
    >
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </mainContext.Provider>
  );
}
