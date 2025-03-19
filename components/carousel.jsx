import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { data } from "./slideData";

const { width: screenWidth } = Dimensions.get("window");

export default function CarouselComponent() {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={screenWidth - 40}
        height={200}
        autoPlay={true}
        autoPlayInterval={3000}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.img} style={styles.image} />
            <Text style={[styles.title, { textAlign: "center" }]}>{item.title}</Text>
          </View>
        )}
        pagination={({ currentIndex, total }) => (
          <View style={styles.paginationContainer}>
            {Array.from({ length: total }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  currentIndex === i ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 200,
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 0,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    elevation: 0,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },

  title: {
    position: "absolute",
    top: "65%", // Center text vertically
    left: "15%", // Center text horizontally
    transform: [{ translateX: -50 }, { translateY: -50 }], // Adjusts for text center
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background for readability
    padding: 10,
    borderRadius: 5,
  },
  // description: {
  //   textAlign: "justify",
  //   marginTop: 5,
  //   lineHeight: 25,
  // },
  // paginationContainer: {
  //   flexDirection: "row",
  //   position: "absolute",
  //   bottom: 10,
  //   alignSelf: "center",
  // },
  // dot: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   marginHorizontal: 5,
  // },
  activeDot: {
    backgroundColor: "#333",
  },
  inactiveDot: {
    backgroundColor: "#ddd",
  },
});
