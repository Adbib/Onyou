import React, { useState, useContext } from "react";
import { ScrollView } from "react-native";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import OnHeader from "./comps/Header";
import { Input, Button, Image } from "react-native-elements";
import { site } from "./data";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { mainContext } from "./context/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";

export default function SignUp({ navigation }) {
  const [userData, setuserData] = useState({
    name: null,
    lastname: null,
    username: null,
    email: null,
    password: null,
    repass: null,
  });
  const [Error, setError] = useState(null);
  const [Status, setStatus] = useState({ User_Created: false });
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
  } = useContext(mainContext);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const doLogin = async (email, password) => {
    setloggingIn(true);
    // setError(null);
    let formData = new FormData();
    formData.append("type", "login");
    formData.append("email", email);
    formData.append("password", password);
    try {
      let response = await fetch(`${site}/auth.php`, {
        method: "POST",
        body: formData,
      });
      let json = await response.json();
      if (json.status != false) {
        // setError(null);
        try {
          await AsyncStorage.setItem(
            "userProfile",
            JSON.stringify({
              isLoggedIn: json.status,
              authToken: json.token,
              id: json.data.id,
              name: json.data.user_login,
              avatar: json.avatar,
            })
          );
        } catch {
          setError("Error storing data on device");
        }
        setUserProfile({
          isLoggedIn: json.status,
          authToken: json.token,
          id: json.data.id,
          name: json.data.user_login,
          avatar: json.avatar,
        });
        setIsLogged(true);
        setUserProfile(json);
        setUserToken(json.token);
      } else {
        setIsLogged(false);
        setError("Invalid Information");
      }
      setloggingIn(false);
    } catch (error) {
      //console.error(error);
      setError("Error connecting to server");
      setloggingIn(false);
    }
  };

  const CreateUser = (userData) => {
    if (
      userData.username &&
      userData.email &&
      userData.password &&
      userData.name &&
      userData.lastname
    ) {
      if (userData.password === userData.repass) {
        const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (userData.email.match(regEmail)) {
          setloggingIn(true);
          setError(null);
          let formData = new FormData();
          formData.append("type", "CreateUser");
          formData.append("name", userData.name);
          formData.append("lastname", userData.lastname);
          formData.append("username", userData.username);
          formData.append("email", userData.email);
          formData.append("password", userData.password);

          fetch(`${site}/auth.php`, {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((jso) => {
              setStatus(jso);
              if (!jso.User_Valid) {
                setError("Alredy used Username");
                // setloggingIn(false);
              }
              if (!jso.Email_Valid) {
                setError("Alredy used Email");
                // setloggingIn(false);
              }
              // else if (jso.User_Valid && jso.Email_Valid) {
              // }
            })
            .catch((error) => setError("Error connecting to server"))
            .finally(() => {
              setloggingIn(false);
              // console.log(Status);
            });
        } else {
          setError("Invalid Email");
          // setloggingIn(false);
        }
      } else {
        setError("Not Same Password");
      }
    } else {
      setError("Please fill all forms");
      // console.log(userData);
    }
  };
  const [PassVisible, setPassVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: "EN",
      value: "apple",
      // icon: <Image source={{ uri: require("./assets/logo.png") }} />,
    },
    {
      label: "FR",
      value: "banana",
      // icon: <Image source={{ uri: require("./assets/logo.png") }} />,
    },
  ]);
  return (
    <>
      {/* <View>
        <OnHeader navigation={navigation} />
        <Text>SignUp</Text>
      </View> */}

      <Modal
        transparent={false}
        animationType={"slide"}
        visible={loggingIn}
        style={{ zIndex: 1100 }}
        onRequestClose={() => {}}
        statusBarTranslucent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={loggingIn}
              color={"red"}
              size="large"
            />
            <Text>Loading...</Text>
          </View>
        </View>
      </Modal>

      {!isLogged && (
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            // marginTop: 30,
            justifyContent: "center",
            backgroundColor: "white",
            paddingTop: 20,
          }}
        >
          {/* <Input
            leftIcon={{ name: "person", color: "#ff7f50" }}
            placeholder="Your Name"
            // errorStyle={{ color: "red" }}
            // errorMessage="ENTER A VALID ERROR HERE"
            inputContainerStyle={{
              borderBottomColor: "rgba(255, 127, 80,0.6)",
              borderBottomWidth: 1.5,
            }}
            
          /> */}
          <Image
            source={require("../assets/logo.png")}
            style={{
              width: 300,
              height: 90,
              margin: 10,
              marginBottom: 50,
              marginTop: 30,
            }}
            // PlaceholderContent={<ActivityIndicator />}
          />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              // backgroundColor: "red",
              width: "100%",
              // paddingRight: 95,
              // paddingLeft: 95,
              alignItems: "center",
              alignContent: "center",
              // marginLeft:10
            }}
          >
            <Input
              leftIcon={{ name: "person", color: "#ff7f50" }}
              placeholder={Language.Screens.SignUp.FirstName}
              containerStyle={{ width: "50%" }}
              inputContainerStyle={{
                // backgroundColor: "red",

                borderBottomWidth: 0,
                backgroundColor: "#eee",
                borderRadius: 10,
                paddingLeft: 10,
                paddingTop: 3,
                paddingBottom: 3,
                alignItems: "center",
                alignContent: "center",
              }}
              // value={loginData.email}
              onChangeText={(e) => setuserData({ ...userData, name: e })}
            />
            <Input
              containerStyle={{ width: "50%" }}
              leftIcon={{ name: "person", color: "#ff7f50" }}
              placeholder={Language.Screens.SignUp.LastName}
              inputContainerStyle={{
                // backgroundColor: "red",
                borderBottomWidth: 0,
                backgroundColor: "#eee",
                borderRadius: 10,
                paddingLeft: 10,
                paddingTop: 3,
                paddingBottom: 3,
                // alignItems: "center",
                // alignContent: "center",
              }}
              // value={loginData.email}
              onChangeText={(e) => setuserData({ ...userData, lastname: e })}
            />
          </View>
          <Input
            leftIcon={{ name: "person", color: "#ff7f50" }}
            placeholder={Language.Screens.SignUp.Username}
            inputContainerStyle={{
              // backgroundColor: "red",
              borderBottomWidth: 0,
              backgroundColor: "#eee",
              borderRadius: 10,
              paddingLeft: 10,
              paddingTop: 3,
              paddingBottom: 3,
              alignItems: "center",
              alignContent: "center",
            }}
            // value={loginData.email}
            onChangeText={(e) => setuserData({ ...userData, username: e })}
          />
          <Input
            leftIcon={{ name: "email", color: "#ff7f50" }}
            placeholder={Language.Screens.SignUp.Email}
            inputContainerStyle={{
              // backgroundColor: "red",
              borderBottomWidth: 0,
              backgroundColor: "#eee",
              borderRadius: 10,
              paddingLeft: 10,
              paddingTop: 3,
              paddingBottom: 3,
              alignItems: "center",
              alignContent: "center",
            }}
            // value={loginData.email}
            onChangeText={(e) => setuserData({ ...userData, email: e })}
          />
          <Input
            placeholder={Language.Screens.SignUp.Password}
            secureTextEntry={PassVisible}
            leftIcon={{ name: "lock", color: "#ff7f50" }}
            rightIcon={{
              name: "visibility",
              color: "#ff7f50",
              onPress: () => setPassVisible(!PassVisible),
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: "#eee",
              borderRadius: 10,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 3,
              paddingBottom: 3,
              alignItems: "center",
              alignContent: "center",
            }}
            // value={loginData.pass}
            onChangeText={(e) => setuserData({ ...userData, password: e })}
          />
          <Input
            placeholder={Language.Screens.SignUp.ConfermPass}
            secureTextEntry={PassVisible}
            leftIcon={{ name: "lock", color: "#ff7f50" }}
            // rightIcon={{
            //   name: "visibility",
            //   color: "#ff7f50",
            //   onPress: () => setPassVisible(!PassVisible),
            // }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: "#eee",
              borderRadius: 10,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 3,
              paddingBottom: 3,
              alignItems: "center",
              alignContent: "center",
            }}
            // value={loginData.pass}
            onChangeText={(e) => setuserData({ ...userData, repass: e })}
          />

          {Error && <Text style={{ color: "red", margin: 5 }}>{Error}</Text>}
          <View style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
            <DropDownPicker
              theme="LIGHT"
              dropDownDirection="TOP"
              listItemLabelStyle={{ color: "#ff7f50" }}
              dropDownContainerStyle={{
                backgroundColor: "#fff",
                width: "100%",
                // alignItems: "center",
                alignSelf: "center",
                borderWidth: 0,
                color: "#ff7f50",
              }}
              placeholder={Language.Screens.SignUp.Province}
              style={{
                width: "100%",
                alignSelf: "center",
                // backgroundColor: "#ff7f50",
                borderWidth: 0,
                borderBottomColor: "#ddd",
                borderBottomWidth: 1,
                color: "red",
              }}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>

          <Button
            icon={{ name: "login", color: "white" }}
            iconLeft
            title={Language.Screens.SignUp.SignUp}
            buttonStyle={{ width: 200, margin: 10 }}
            onPress={() => CreateUser(userData)}
            containerStyle={{ width: "100%" }}
            buttonStyle={{
              width: "90%",
              alignSelf: "center",
              backgroundColor: "#ff7f50",
              padding: 13,
              borderRadius: 10,
            }}
          />

          <Text style={{ color: "#555", marginBottom: 50, marginTop: 30 }}>
            {Language.Screens.SignUp.AlreadyHave} ?<Text> </Text>
            <Text
              style={{
                color: "#ff7f50",
                // padding: 1000,
                fontWeight: "bold",
                // backgroundColor: "green",
                // paddingLeft: 5,
              }}
              onPress={() =>
                navigation.navigate("Sign In", {
                  name: "SignIn",
                  withAnimation: true,
                })
              }
            >
              SignIn
            </Text>
          </Text>
        </ScrollView>
      )}

      {Status.User_Created && <Text>yeeees</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
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
