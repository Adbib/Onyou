import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Modal,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Input, Image, Button, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import OnHeader from "./comps/Header";
import { MyDrawer } from "../App";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { site } from "./data";
import * as FileSystem from "expo-file-system";
import { mainContext } from "./context/Context";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddItem({ navigation, ...rest }) {
  const {
    isLogged,
    userProfile,
    loggingIn,
    UserId,
    catrespo,
    setcatrespo,
    Language,
  } = useContext(mainContext);
  const [UpImage, setUpImage] = useState(null);
  const [Error, setError] = useState(null);
  const pickImage = async (type, e) => {
    if (type == "file") {
      // let result = await ImagePicker.launchImageLibraryAsync({
      //   mediaTypes: ImagePicker.MediaTypeOptions.All,
      //   allowsEditing: true,
      //   aspect: [4, 3],
      //   quality: 1,
      // });
      let result = await ImagePicker.launchImageLibraryAsync();
      const base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: "base64",
      });
      const image = "data:image/png;base64," + base64;
      setListing({ ...Listing, img: image });
    } else if (type == "camera") {
      let result = await ImagePicker.launchCameraAsync();
      const base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: "base64",
      });
      const image = "data:image/png;base64," + base64;
      console.log(image);
      setListing({ ...Listing, img: image });
    }
  };

  // const test = async (e) => {
  //   console.log(e);
  //   let formData = new FormData();
  //   formData.append("type", "testos");
  //   formData.append("arr", JSON.stringify(e));
  //   fetch(`${site}/auth.php`, {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((jso) => console.log(jso));
  // };

  const CreateItem = async (
    title,
    des,
    img,
    price,
    catId,
    adress,
    phone,
    usrid
  ) => {
    console.log(title, des, price, catId, adress, phone, usrid);
    if (title && des && img && price && adress && phone && usrid) {
      if (Number.isInteger(Number(price))) {
        setisLoading(true);
        let formData = new FormData();
        formData.append("type", "create");
        formData.append("title", title);
        formData.append("file", img);
        formData.append("description", des);
        formData.append("price", price);
        formData.append("catId", JSON.stringify(catId));
        formData.append("adress", adress);
        formData.append("phone", phone);
        formData.append("userId", usrid);

        fetch(`${site}/auth.php`, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((jso) => console.log(jso))
          .finally(() => setisLoading(false));
      } else {
        setError("The price is not a number");
      }
    } else {
      setError("Please ! fill all forms");
    }
  };
  const [Listing, setListing] = useState({
    title: "",
    des: "",
    img: "",
    catId: 133,
    price: 123,
    address: "",
    phone: "",
    userId: userProfile.data.user_id,
  });
  const [isLoading, setisLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([{ label: "dsfsdf", value: "sdffs" }]);

  // const URL = `${site}/auth.php`;
  // useEffect(() => {
  //   // console.log(catrespo.length);
  //   let formData = new FormData();
  //   formData.append("type", "allCat");
  //   fetch(URL, {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setcatrespo(json.arr);
  //       // console.log(json.arr.length);
  //       // let bb = [];
  //       // if (json.arr) {
  //       //   catrespo.map((cat, index) => {
  //       //     bb = [...bb, { label: cat.name, value: cat.id }];
  //       //     console.log(bb);
  //       //     setItems(bb);
  //       //   });
  //       // } else {
  //       //   console.log("no");
  //       // }
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => {
  //       let bb = [];
  //       if (catrespo) {
  //         catrespo.map((cat, index) => {
  //           bb = [...bb, { label: cat.name, value: cat.id }];
  //           // setItems(bb);
  //         });
  //       } else {
  //         console.log("no");
  //       }
  //       console.log(bb);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch("https://onyou.ca/wp-json/wp/v2/directorypress-category?per_page=100")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setcate(json);
  //       // console.log(json);
  //     })
  //     // .finally(() => {
  //     //   cate.map((cat, index) => {
  //     //     setItems([...items, { label: cat.name, value: cat.id }]);
  //     //     // console.log(items);
  //     //   });
  //     // });
  //     .finally(() => {
  //       // console.log(cate.name);
  //       let bb = [];
  //       cate.map((cat, index) => {
  //         // console.log(cat.id);
  //         bb = [...bb, { label: cat.name, value: cat.id }];
  //         setItems(bb);
  //       });
  //       // console.log(items);
  //     });
  // }, []);

  useEffect(() => {
    let bb = [];
    if (catrespo) {
      catrespo.map((cat, index) => {
        bb = [...bb, { label: cat.name, value: cat.id }];
        setItems(bb);
      });
    } else {
      console.log("no data");
    }
  }, []);
  DropDownPicker.setListMode("SCROLLVIEW");
  return (
    <>
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
          </View>
        </View>
      </Modal>

      <ScrollView
        style={{ backgroundColor: "white" }}
        nestedScrollEnabled={true}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 300, height: 90, margin: 10, marginBottom: 30 }}
        />
        <Input
          leftIcon={{ name: "title", color: "#ff7f50" }}
          placeholder={Language.Screens.AddItem.Name}
          // onPress={(e)}
          onChangeText={(e) => setListing({ ...Listing, title: e })}
          // errorStyle={{ color: "red" }}
          // errorMessage="ENTER A VALID ERROR HERE"
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
        />

        <Input
          leftIcon={{ name: "description", color: "#ff7f50" }}
          placeholder={Language.Screens.AddItem.Description}
          onChangeText={(e) => setListing({ ...Listing, des: e })}
          // errorStyle={{ color: "red" }}
          // errorMessage="ENTER A VALID ERROR HERE"
          multiline
          numberOfLines={5}
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
        />
        <Input
          leftIcon={{ name: "attach-money", color: "#ff7f50" }}
          placeholder={Language.Screens.AddItem.Price}
          // onPress={(e)}
          onChangeText={(e) => setListing({ ...Listing, price: e })}
          // errorStyle={{ color: "red" }}
          // errorMessage="ENTER A VALID ERROR HERE"
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
        />
        <View
          // statusBarTranslucent={true}
          style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 20 }}
        >
          <DropDownPicker
            listMode="SCROLLVIEW"
            onChangeValue={(e) => setListing({ ...Listing, catId: e })}
            // onChangeValue={(e) => test(e)}
            searchable={true}
            closeAfterSelecting={true}
            dropDownDirection="BOTTOM"
            modalProps={{
              animationType: "fade",
            }}
            multiple={true}
            min={1}
            max={5}
            labelStyle={{
              fontWeight: "bold",
            }}
            textStyle={{
              fontWeight: "bold",
            }}
            placeholderStyle={{ fontWeight: "bold", color: "#ff7f50" }}
            placeholder={Language.Screens.AddItem.Category}
            style={{
              borderColor: "#ff7f50",
              borderWidth: 2,
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
        <Text style={{ color: "#ff7f50", fontWeight: "bold", margin: 5 }}>
          {Language.Screens.AddItem.Pick} :
        </Text>
        <View style={{ alignItems: "center", alignContent: "center" }}>
          <Image
            source={{
              uri:
                Listing.img.length > 0
                  ? Listing.img
                  : "https://onyou.ca/wp-content/uploads/2021/06/logoonyou-1.png",
            }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 50,
              resizeMode: "center",
            }}
          />
        </View>
        <Button
          title={Language.Screens.AddItem.PickStorage}
          onPress={(e) => pickImage("file", e)}
          buttonStyle={{ margin: 5 }}
        />
        <Button
          title={Language.Screens.AddItem.PickCamera}
          onPress={() => pickImage("camera")}
          buttonStyle={{ margin: 5, marginBottom: 20 }}
        />
        <Input
          leftIcon={{ name: "my-location", color: "#aaa" }}
          placeholder="Canada"
          value="Canada"
          disabled
          // onChangeText={(e) => setListing({ ...Listing, address: e })}
          inputContainerStyle={{
            borderBottomWidth: 0,
            backgroundColor: "#eee",
            borderRadius: 10,
            paddingLeft: 10,
            paddingTop: 3,
            paddingBottom: 3,
            alignItems: "center",
            alignContent: "center",
          }}
        />

        <Input
          leftIcon={{ name: "my-location", color: "#ff7f50" }}
          placeholder={Language.Screens.AddItem.Address}
          onChangeText={(e) => setListing({ ...Listing, address: e })}
          inputContainerStyle={{
            borderBottomWidth: 0,
            backgroundColor: "#eee",
            borderRadius: 10,
            paddingLeft: 10,
            paddingTop: 3,
            paddingBottom: 3,
            alignItems: "center",
            alignContent: "center",
          }}
        />

        <Input
          leftIcon={{ name: "phone", color: "#ff7f50" }}
          placeholder={Language.Screens.AddItem.Phone}
          onChangeText={(e) => setListing({ ...Listing, phone: e })}
          inputContainerStyle={{
            borderBottomWidth: 0,
            backgroundColor: "#eee",
            borderRadius: 10,
            paddingLeft: 10,
            paddingTop: 3,
            paddingBottom: 3,
            alignItems: "center",
            alignContent: "center",
          }}
        />

        {/* <Button
          icon={<Icon name="add" color="#fe5440" />}
          title="add"
          buttonStyle={{ margin: 5, borderColor: "#fe5440" }}
          titleStyle={{ color: "#fe5440" }}
          type="outline"
          onPress={() => CreateItem(Listing.title, Listing.des,Listing.img,Listing.price,Listing.address,Listing.phone)}
        /> */}
        {Error && (
          <Text style={{ color: "red", margin: 5, textAlign: "center" }}>
            {Error}
          </Text>
        )}

        <Button
          icon={<Icon name="add" color="white" />}
          iconLeft
          title={Language.Screens.AddItem.AddItem}
          buttonStyle={{ width: 200, margin: 10 }}
          onPress={() =>
            CreateItem(
              Listing.title,
              Listing.des,
              Listing.img,
              Listing.price,
              Listing.catId,
              Listing.address,
              Listing.phone,
              Listing.userId
            )
          }
          containerStyle={{ width: "100%" }}
          buttonStyle={{
            width: "90%",
            alignSelf: "center",
            backgroundColor: "#ff7f50",
            padding: 13,
            borderRadius: 10,
            marginBottom: 20,
          }}
        />

        {/* <ScrollView nestedScrollEnabled={true}>
          <DropDownPicker
            scrollViewProps={{
              decelerationRate: "fast",
            }}
            listMode="SCROLLVIEW"
            onChangeValue={(value) => {
              console.log(value);
            }}
            // theme="DARK"
            dropDownDirection="BOTTOM"
            // dropDownContainerStyle={{
            //   width: "50%",
            //   height: 500,
            //   alignSelf: "center",
            // }}
            placeholder="Select"
            // style={{
            //   width: "50%",
            //   alignSelf: "center",
            // }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </ScrollView> */}
      </ScrollView>
    </>
  );
}

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
