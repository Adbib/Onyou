import React from "react";
import { useState } from "react";

import { View, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import OnHeader from "./comps/Header";

export default function AboutUs({ navigation }) {
  return (
    <>
      <View>
        <OnHeader navigation={navigation} />
      </View>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 10,
        }}
      >
        <Text h1> About Us</Text>
        <Text style={{ textAlign: "left" }}>
          ONYOU ONYOU is the number one in CANADA with over 1 billion monthly
          pageviews. We connect buyers and sellers in real-time to be able to
          sell, buy, get a service or a job.Onyou has over 20 team members and
          is entrusted by over 1 million unique people and businesses trading on
          our platform to sell over CAD worth of itemsannually and excluding the
          value of job openings and services being filled.We make the process of
          buying or selling substantially easier and faster than the norm, as
          the platform is built to be safe and accessible to everyone, whether
          you are a company or an individual.Since inception in 2019 and
          registration in 2020, Onyou continues to innovate andservice its
          customers by helping them to buy, sell or advertise a service or job
          opening.Onyou has become the canadian users first online marketplace
          Onyou strives to provide a safe and trusted online environment to
          connect directly sellers and buyers without the need of having a
          medium or to pay any kind of commission. We have over 120 categories
          such as Autos, cars, real estate, electronics, video games, cell
          phones, furniture, clothes and fashion items, books, magazines and all
          different kinds of services and sectors as well.Our VisionWe empower
          people and businesses to realize the economic opportunity, fulfill
          dreams and desires and improve society.How it Works?You can download
          our applications on iOS or Android for the best experience or use our
          website to buy or sell or apply for a job or get or provide a service.{" "}
        </Text>
      </ScrollView>
    </>
  );
}
