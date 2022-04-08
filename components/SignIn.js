import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
import {
  Input,
  Image,
  Header,
  Button,
  Avatar,
  Icon,
} from "react-native-elements";
import image from "../assets/icon.png";
import OnHeader from "./comps/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import base64 from "react-native-base64";
import { mainContext } from "./context/Context";
import { site } from "./data";
export default function SignIn({ navigation }) {
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
    UserId,
    setUserId,
    Language,
  } = useContext(mainContext);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isLogged, setIsLogged] = useState(false);
  // const [userToken, setUserToken] = useState(null);
  // const [userProfile, setUserProfile] = useState(null);
  // const [loggingIn, setloggingIn] = useState(false);
  const [error, setError] = useState(null);
  const [loginData, setloginData] = useState({ email: null, pass: null });

  // useEffect(() => {
  //   AsyncStorage.getItem("userProfile").then((value) => {
  //     if (value) {
  //       setUserProfile(JSON.parse(value)),
  //         setIsLoading(false),
  //         setIsLogged(true);
  //       console.log("yes");
  //     } else {
  //       setIsLoading(false), setIsLogged(false);
  //       console.log("no");
  //     }
  //   });
  // }, []);

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
      console.log(json);
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
          // console.log(json);
          setUserId(json.data.id);
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
        navigation.navigate("Home", {
          // name: "SignUp",
          withAnimation: true,
        });
      } else {
        setIsLogged(false);
        setError("Invalid Information");
      }
      setloggingIn(false);
    } catch (error) {
      // console.error(error);
      console.log(error);
      setError("Error connecting to server");
      setloggingIn(false);
    }
  };

  const doLogout = async () => {
    try {
      setloggingIn(true);
      setIsLogged(false);
      await AsyncStorage.removeItem("userProfile");
      setUserProfile(null);
      setloggingIn(false);
      return true;
    } catch (exception) {
      return false;
    }
  };

  const updateData = async () => {
    let formData = new FormData();
    formData.append("type", "create");

    fetch(`${site}/auth.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((jso) => console.log(jso));
  };
  const [PassVisible, setPassVisible] = useState(true);
  return (
    <>
      <View>
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
      </View>

      {/* <View>
        <OnHeader navigation={navigation} />
      </View> */}
      {isLogged ? (
        <>
          <View style={{ backgroundColor: "white" }}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "column",
                paddingTop: 20,
                paddingBottom: 10,
              }}
            >
              <Avatar
                // title={userProfile.name}
                rounded
                size="xlarge"
                source={{ uri: userProfile.avatar }}
                avatarStyle={{
                  borderColor: "#ff7f50",
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
                {/* <Button
                  icon={<Icon name="add" color="#ff7f50" />}
                  title="Add item"
                  buttonStyle={{
                    margin: 5,
                    borderColor: "#ff7f50",
                    color: "#ff7f50",
                  }}
                  type="outline"
                  titleStyle={{ color: "#ff7f50" }}
                /> */}
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  alignContent: "center",
                  flex: 1,
                }}
              >
                {/* <Button
                  icon={<Icon name="logout" color="#fe5440" />}
                  title="Logout"
                  buttonStyle={{ margin: 5, borderColor: "#fe5440" }}
                  titleStyle={{ color: "#fe5440" }}
                  type="outline"
                  onPress={() => doLogout()}
                  updateData
                /> */}
                <Button
                  icon={<Icon name="add" color="#fe5440" />}
                  title="add"
                  buttonStyle={{ margin: 5, borderColor: "#fe5440" }}
                  titleStyle={{ color: "#fe5440" }}
                  type="outline"
                  onPress={() => updateData()}
                />
              </View>
            </View>
          </View>
          <Button
            icon={<Icon name="logout" color="#fe5440" />}
            title="Logout"
            buttonStyle={{ margin: 5, borderColor: "#fe5440" }}
            titleStyle={{ color: "#fe5440" }}
            type="outline"
            onPress={() => doLogout()}
          />
          {/* <View>
            <Button
              icon={{ name: "login", color: "white" }}
              iconLeft
              title="update"
              buttonStyle={{ width: 200, margin: 10 }}
              onPress={() => updateData()}
            />
          </View> */}
        </>
      ) : (
        <ScrollView
          style={{ paddingTop: 20, backgroundColor: "white" }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/logo.png")}
            style={{
              width: 300,
              height: 90,
              margin: 10,
              marginBottom: 40,
              marginTop: 30,
            }}
            // PlaceholderContent={<ActivityIndicator />}
          />
          {/* <Text style={{ fontSize: 30, marginBottom: 20 }}>SignIn</Text> */}
          <Input
            leftIcon={{ name: "email", color: "#ff7f50" }}
            placeholder={Language.Screens.SignIn.Username}
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
            // errorStyle={{ color: "red" }}
            // errorMessage={
            //   (error.Email_Valid ? "" : console.log(error.Email_Valid),
            //   "ENTER A VALID ERROR HERE")
            // }
            // er
            // inputContainerStyle={{
            //   borderBottomColor: "rgba(255, 127, 80,0.6)",
            //   borderBottomWidth: 1.5,
            // }}
            value={loginData.email}
            onChangeText={(e) => setloginData({ ...loginData, email: e })}
          />
          <Input
            placeholder={Language.Screens.SignIn.Password}
            secureTextEntry={PassVisible}
            leftIcon={{ name: "security", color: "#ff7f50" }}
            rightIcon={{
              name: "visibility",
              color: "#ff7f50",
              onPress: () => setPassVisible(!PassVisible),
            }}
            // inputContainerStyle={{
            //   borderBottomColor: "rgba(255, 127, 80,0.6)",
            //   borderBottomWidth: 1.5,
            // }}
            inputContainerStyle={{
              // backgroundColor: "red",
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
            value={loginData.pass}
            onChangeText={(e) => setloginData({ ...loginData, pass: e })}
          />
          {error && <Text style={{ color: "red", margin: 5 }}>{error}</Text>}
          <Button
            icon={{ name: "login", color: "white" }}
            iconLeft
            title={Language.Screens.SignIn.Login}
            buttonStyle={{ width: 200, margin: 10 }}
            onPress={() => doLogin(loginData.email, loginData.pass)}
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
            {Language.Screens.SignIn.dontHaveAccount} ?<Text> </Text>
            <Text
              style={{
                color: "#ff7f50",
                margin: 50,
                fontWeight: "bold",
                // paddingLeft: 5,
              }}
              onPress={() =>
                navigation.navigate("SignUp", {
                  // name: "SignUp",
                  withAnimation: true,
                })
              }
            >
              {Language.Screens.SignIn.Create}
            </Text>
          </Text>
        </ScrollView>
      )}
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

// console.log(email + "..." + password);
// console.log
// setloggingIn(true);
// setError(null);
// let formData = new FormData();
// formData.append("type", "login");
// formData.append("email", email);
// formData.append("password", password);

// fetch("http://192.168.2.176:10015/auth.php", {
//   method: "POST",
//   body: formData,
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json))
//   .catch((error) => console.error(error))
//   .finally(() => setisLoading(false));
