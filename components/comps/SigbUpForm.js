import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Input, Icon, Button, Image } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";

export default function SigbUpForm({ items, setItems, userData, setuserData }) {
  const [PassVisible, setPassVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  return (
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
        source={require("../../assets/logo.png")}
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
          backgroundColor: "white",
          // width: "50%",
          paddingRight: 90,
          paddingLeft: 90,
        }}
      >
        <Input
          leftIcon={{ name: "person", color: "#ff7f50" }}
          placeholder="First Name"
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
          leftIcon={{ name: "person", color: "#ff7f50" }}
          placeholder="Last Name"
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
          onChangeText={(e) => setuserData({ ...userData, lastname: e })}
        />
      </View>
      <Input
        leftIcon={{ name: "person", color: "#ff7f50" }}
        placeholder="Username"
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
        placeholder="Email"
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
        placeholder="Password"
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
        placeholder="Confirm Password"
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
          placeholder="Province"
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
        title="Login"
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

      <Text style={{ color: "#555", padding: 20 }}>
        Already Have an Account ?<Text> </Text>
        <Text
          style={{
            color: "#ff7f50",
            margin: 50,
            fontWeight: "bold",
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
  );
}
