{
  /* <ScrollView
   pagingEnabled={true}
    horizontal={true}
     style={{flexDirection: "row", width}}
     showsHorizontalScrollIndicator={false}
     alwaysBounceVertical={true}
     contentContainerStyle={styles.scrollContainer}
     >

 
      {data.map((item)=>(
      <ImagedCarouselCard
      key={item.id}
  width={320}
  height={300}
  shadowColor="#051934"
  // style={{margin:5,alignItems:"center",justifyContent:"center"}}
  style={styles.card}
  source={{
    uri: item.imgUrl,
  }}
/>
))}
  </ScrollView> */
}






<Tile
                onPress={() =>
                  navigation.navigate("SingleProduct", {
                    name: "SingleProduct",
                    infos: l,
                  })
                }
                featured={false}
                key={l.id}
                imageContainerStyle={{ height: 100 }}
                height={500}
                imageSrc={{
                  uri: l._embedded["wp:featuredmedia"][0].source_url,
                }}
                // {getImage(l._links)}
                title={l.title.rendered}
                // containerStyle={{
                //   backgroundColor: "white",
                //   paddingBottom: 20,
                // }}
                imageContainerStyle={{
                  borderRadius: 5,
                  // borderTopEndRadius: 10,
                }}
                containerStyle={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,

                  elevation: 6,
                  marginBottom: 10,
                  backgroundColor: "white",
                  // borderRadius: 10,
                  paddingBottom: 20,
                }}
              >
                <View
                  // width={100}
                  style={{ alignItems: "flex-start" }}
                >
                  <Text h1>{l.title.rendered}</Text>
                  {/* <Text>{l._field_9}$</Text> */}

                  <Rating
                    style={{ marginTop: 5, marginBottom: 5 }}
                    imageSize={20}
                    fractions={1}
                    startingValue={3.3}
                  />

                  <Badge
                    badgeStyle={{
                      backgroundColor: "#ff7f50",
                      padding: 30,
                      paddingLeft: 35,
                      paddingRight: 45,
                    }}
                    containerStyle={{
                      alignSelf: "flex-end",
                    }}
                    value={
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 23,
                        }}
                      >
                        {l._field_9}$
                      </Text>
                    }
                  />

                  <Chip
                    title={l._address_line_1}
                    containerStyle={{ marginTop: 5 }}
                    icon={{
                      name: "place",
                      size: 20,
                      color: "white",
                    }}
                  />
                </View>
              </Tile>









"index": Object 

{
  "_difp_delete_by_1": "",
  "_difp_email_sent": "",
  "_difp_last_reply_by": "3",
  "_difp_last_reply_id": "3787",
  "_difp_last_reply_time": "1623606269",
  "_difp_parent_read_by_1": "",
  "_difp_parent_read_by_3": "",
  "_difp_participants": "1",
  "_difp_read_by": "",
  "_edit_last": "",
  "_edit_lock": "",
  "_links": Object {
    "about": Array [
      Object {
        "href": "https://onyou.ca/wp-json/wp/v2/types/difp_message",
      },
    ],
    "author": Array [
      Object {
        "embeddable": true,
        "href": "https://onyou.ca/wp-json/wp/v2/users/3",
      },
    ],
    "collection": Array [
      Object {
        "href": "https://onyou.ca/wp-json/wp/v2/difp_message",
      },
    ],
    "curies": Array [
      Object {
        "href": "https://api.w.org/{rel}",
        "name": "wp",
        "templated": true,
      },
    ],
    "self": Array [
      Object {
        "href": "https://onyou.ca/wp-json/wp/v2/difp_message/3787",
      },
    ],
    "wp:attachment": Array [
      Object {
        "href": "https://onyou.ca/wp-json/wp/v2/media?parent=3787",
      },
    ],
  },
  "_listing_bid": "",
  "_listing_id": "",
  "_thumbnail_id": "",
  "_wp_desired_post_slug": "",
  "_wp_old_slug": "",
  "_wp_trash_meta_status": "",
  "_wp_trash_meta_time": "",
  "author": 3,
  "content": Object {
    "protected": false,
    "rendered": "<p>Hi i want this</p>
",
  },
  "date": "2021-06-13T17:44:29",
  "date_gmt": "2021-06-13T17:44:29",
  "guid": Object {
    "rendered": "https://onyou.ca/?post_type=difp_message&p=3787",
  },
  "id": 3787,
  "link": "https://onyou.ca/?post_type=difp_message&p=3787",
  "modified": "2021-06-13T17:44:29",
  "modified_gmt": "2021-06-13T17:44:29",
  "rs_page_bg_color": "",
  "slug": "samsung-galaxy-s8-plus",
  "status": "publish",
  "template": "",
  "title": Object {
    "rendered": "Samsung Galaxy S8 Plus",
  },
  "type": "difp_message",
},
}




fetch('https://aldana4gc.com/wp-json/jwt-auth/v1/token', {method: 'POST',body: JSON.stringify({username: 'yad',password: 'dev'}),
    headers: {
        'Content-Type': 'application/json'
    }})
    .then((res) => {
     	res.json()
    }).then(json=>console.log(json))
    .catch((err) => {
        console.log(err);
    });












    <View style={{ marginTop: 10, marginLeft: 5 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "#bbb",
              marginLeft: 5,
            }}
          >
            {Language.Screens.Home.AllCategories}
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
            {prntCat ? (
              prntCat.map((l, i) => (
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
                      parent: l.id,
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
                    source={{ uri: l.img.src }}
                  ></Avatar>

                  <ListItem.Content>
                    <ListItem.Title
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      {l.name}
                    </ListItem.Title>
                    {/* <ListItem.Subtitle style={{ color: "#ccc" }}>
                      {l.description}
                    </ListItem.Subtitle> */}
                  </ListItem.Content>
                  <ListItem.Chevron color="#aaa" size={24} />
                </ListItem>
              ))
            ) : (
              <Text>wait</Text>
            )}
          </View>
        </View>