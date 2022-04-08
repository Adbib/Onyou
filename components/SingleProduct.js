import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import ItemCarousel from "./comps/ItemCarousel";
import HTML from "react-native-render-html";
import { Button, Input, Icon, Divider } from "react-native-elements";
import { site } from "./data";
import { mainContext } from "./context/Context";

export default function SingleProduct({ navigation, route }) {
  //   console.log(route.params.infos._embedded["wp:featuredmedia"][0].source_url);
  const { isLogged, userProfile, UserId } = useContext(mainContext);
  useEffect(() => {
    navigation.setOptions({
      title: route.params.infos.title.rendered,
    });
  }, []);

  const SendMessage = (title, msg, author, sender) => {
    console.log(title, msg, author, sender);
    if (title.length > 5 && msg.length > 5 && author > 0 && sender > 0) {
      let formData = new FormData();
      formData.append("type", "SendMessage");
      formData.append("title", title);
      formData.append("msg", msg);
      formData.append("author", author);
      formData.append("sender", sender);

      fetch(`${site}/auth.php`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((jso) => console.log(jso));
    } else {
      console.log("try again");
    }
  };

  const Infos = route.params.infos;
  // console.log(Infos._embedded["author"][0].name);
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState({
    Title: Infos.title.rendered,
    Msg: "",
  });
  return (
    <>
      <ScrollView>
        <Modal
          transparent={false}
          animationType={"slide"}
          visible={ShowMessage}
          style={{ zIndex: 1100 }}
          onRequestClose={() => {}}
          statusBarTranslucent={true}
          //   style={{ opacity: 0.8 }}
          //   transparent="0.5"
        >
          <View>
            <View
              style={{
                // backgroundColor: "red",
                alignItems: "flex-end",
                padding: 10,
                paddingRight: 20,
                marginTop: 20,
              }}
            >
              <Icon
                name="close"
                size={34}
                color="black"
                onPress={() => setShowMessage(false)}
                containerStyle={{
                  backgroundColor: "#eee",
                  padding: 7,
                  borderRadius: 5,
                }}
              />
            </View>
            <View style={{ marginTop: 50 }}>
              <Input
                placeholder={Infos.title.rendered}
                leftIcon={<Icon name="title" size={24} color="black" />}
                onChangeText={(e) => setMessage({ ...Message, Title: e })}
                value={Message.Title}
              />

              <Input
                placeholder="Your Message"
                multiline
                numberOfLines={10}
                leftIcon={<Icon name="message" size={24} color="black" />}
                onChangeText={(e) => setMessage({ ...Message, Msg: e })}
                value={Message.Msg}
              />
              <Button
                //   raised
                // type="outline"
                icon={{ name: "send", color: "white" }}
                iconLeft
                title="Send"
                buttonStyle={{ margin: 10, padding: 10 }}
                onPress={() =>
                  SendMessage(
                    Message.Title,
                    Message.Msg,
                    Infos.author,
                    userProfile.data.user_id
                  )
                }
                // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>

      <ScrollView>
        <ItemCarousel
          navigation={navigation}
          image={
            Infos._embedded && Infos._embedded["wp:featuredmedia"]
              ? Infos._embedded["wp:featuredmedia"][0].source_url
              : "https://onyou.ca/wp-content/uploads/2021/07/onyou1.png"
          }
          // title
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginTop: 10,
            marginLeft: 5,
          }}
        >
          {Infos.title.rendered}
        </Text>

        <View
          style={{
            backgroundColor: "#f28a29",
            padding: 20,
            margin: 2,
            marginTop: 10,
            //   marginBottom: 10,
            alignItems: "center",
            alignContent: "center",
            zIndex: 0,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 28 }}>
            {Infos._field_9} $
          </Text>
        </View>

        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Categories :
            </Text>
            <View
              style={{
                paddingLeft: 5,
                // backgroundColor: "red",
                width: "70%",
              }}
            >
              <Text
                style={{
                  fontWeight: "100",
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                {Infos._embedded["wp:term"][0][0].name},{" "}
                {/* {Infos._embedded["wp:term"][0][1].name &&
                  Infos._embedded["wp:term"][0][1].name} */}
              </Text>
            </View>
          </View>

          <Divider
            style={{ marginTop: 5, marginBottom: 5 }}
            inset={true}
            insetType="middle"
          />

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Address :</Text>
            <View
              style={{
                // backgroundColor: "red",
                paddingLeft: 5,
                // backgroundColor: "red",
                width: "70%",
                // width: "100%",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "900", fontSize: 15 }}>
                {Infos._address_line_1}
                {/* {!Infos._embedded["wp:term"][1][0].name
                  ? Infos._embedded["wp:term"][1][0].name
                  : console.log("non")} */}
              </Text>
            </View>
          </View>

          <Divider
            style={{ marginTop: 5, marginBottom: 5 }}
            inset={true}
            insetType="middle"
          />

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Owner :</Text>
            <View
              style={{
                // backgroundColor: "red",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "900", fontSize: 15 }}>
                {Infos._embedded["author"][0].name}
              </Text>
            </View>
          </View>

          <Divider
            style={{ marginTop: 5, marginBottom: 5 }}
            inset={true}
            insetType="middle"
          />

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Phone :</Text>
            <View
              style={{
                // backgroundColor: "red",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "900", fontSize: 15 }}>
                {" "}
                {Infos._field_6}{" "}
              </Text>
            </View>
          </View>

          {Infos._field_21.length > 0 && (
            <>
              <Divider
                style={{ marginTop: 5, marginBottom: 5 }}
                inset={true}
                insetType="middle"
              />
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Color :
                </Text>
                <View
                  style={{
                    // backgroundColor: "red",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "900", fontSize: 15 }}>
                    {" "}
                    {Infos._field_21}{" "}
                  </Text>
                </View>
              </View>
            </>
          )}
          {/* {Infos._field_23.length > 1 && <Text>{Infos._field_23}</Text>} */}
          {Infos._field_23.length > 0 && (
            <>
              <Divider
                style={{ marginTop: 5, marginBottom: 5 }}
                inset={true}
                insetType="middle"
              />
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Camera :
                </Text>
                <View
                  style={{
                    // backgroundColor: "red",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "900", fontSize: 15 }}>
                    {" "}
                    {Infos._field_23}{" "}
                  </Text>
                </View>
              </View>
            </>
          )}
          {Infos._field_22.length > 0 && (
            <>
              <Divider
                style={{ marginTop: 5, marginBottom: 5 }}
                inset={true}
                insetType="middle"
              />
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Memory :
                </Text>
                <View
                  style={{
                    // backgroundColor: "red",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "900", fontSize: 15 }}>
                    {" "}
                    {Infos._field_22}{" "}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        <ScrollView contentContainerStyle={{ padding: 10 }}>
          <HTML source={{ html: Infos.content.rendered }} />
        </ScrollView>
      </ScrollView>

      {isLogged && (
        <View
          style={{
            backgroundColor: "#34495e",
            alignItems: "center",
            justifyContent: "center",
            borderTopColor: "#40b0fe",
            borderTopWidth: 4,
            padding: 10,
          }}
        >
          <Button
            //   raised
            type="outline"
            icon={{ name: "message", color: "white" }}
            iconLeft
            title="Contact Seller"
            buttonStyle={{ width: 200, margin: 10, padding: 10 }}
            onPress={() => setShowMessage(true)}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    // flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#rgba(0, 0, 0, 0.5)",
    // zIndex: 1000,
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
