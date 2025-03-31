import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import AuthContext from "../context/AuthContext";
// import WeatherComponent from "../components/weather";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const sun = require("../assets/images/weather/weather-sun.webp");
const cloud = require("../assets/images/weather/weather-cloud.webp");
const rain = require("../assets/images/weather/weather-rain.webp");
const scattered = require("../assets/images/weather/weather-scattered-clouds.webp");

const WeatherForecast = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherStatus, setWeatherStatus] = useState("");

  //Get weather and location
  const date = new Date();

  const { city } = useContext(AuthContext);

  //fetch current waether using user current location
  const fetchWeather = async () => {
    setLoading(true);
    // if (city.trim() === "") {
    //   return;
    // }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=747a566b3c00e9880209dabe6251d802&units=metric`
      );
      setWeather(response.data);
      setWeatherStatus(response.data.weather[0]);
    } catch (error) {
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View style={[styles.container]}>
      {loading && (
        <View>
          <Text>Weather Loading...</Text>
          <ActivityIndicator />
        </View>
      )}

      {weather && (
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Current Weather</Text>
          </View>
          <Text style={styles.weatherLocText}>
            <Ionicons name="location-outline" size={18} color="black" />
            {weather.name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={{ margin: 0, alignItems: "center" }}>
              {weatherStatus.main == "Clouds" ? (
                <Image source={cloud} style={styles.weatherImage} />
              ) : weatherStatus.main == "Rain" ? (
                <Image source={rain} style={styles.weatherImage} />
              ) : weatherStatus.main == "Sun" ? (
                <Image source={sun} style={styles.weatherImage} />
              ) : weatherStatus.main == "Clear" ? (
                <Image source={sun} style={styles.weatherImage} />
              ) : (
                <Image source={scattered} style={styles.weatherImage} />
              )}
              {/* <Image
                style={styles.weatherImage}
                source={{
                  uri: `http://openweathermap.org/img/wn/${weatherStatus.icon}@4x.png`,
                }}
              /> */}
            </View>
            <View style={{ marginTop: 35 }}>
              <Text style={styles.weatherTempText}>{weather.main.temp}°C</Text>
            </View>
          </View>

          <View style={styles.header}>
            <Text style={{ fontSize: 22 }}>{weatherStatus.description}</Text>
          </View>

          <View style={styles.statsSection}>
            <View style={[styles.stats, styles.shadowProp, styles.bgColor4]}>
              <Ionicons name="location-outline" size={22} color="#fff" />
              <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
                {weather.main.humidity}%
              </Text>
              <Text style={styles.statsCaption}>Humidity</Text>
            </View>
            <View style={[styles.stats, styles.shadowProp, styles.bgColor4]}>
              <MaterialCommunityIcons
                name="microphone-outline"
                size={24}
                color="#fff"
              />
              <Text style={{ fontWeight: "bold", color: "#fff" }}>
                {weather.main.feels_like}°C
              </Text>
              <Text style={[styles.statsCaption]}>Feels Like</Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20, color: "#c84b31" }}>
              Weekly Forecast
            </Text>
            {/* <Text style={{ fontSize: 14, textAlign: "center", marginTop: 20 }}>
              Loading...
            </Text> */}
            <View style={styles.eduSection}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  style={[
                    styles.stats,
                    styles.shadowProp,
                    styles.bgColor3,
                    styles.eduScroll,
                  ]}
                  onPress={() => router.navigate("/")}
                >
                  <Text style={styles.statsValue}>Sunday</Text>
                  <Text style={styles.statsCaption}>{weather.main.temp}°C</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.stats,
                    styles.shadowProp,
                    styles.bgColor3,
                    styles.eduScroll,
                  ]}
                >
                  <Text style={styles.statsValue}>Monday</Text>
                  <Text style={styles.statsCaption}>29.16°C</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.stats,
                    styles.shadowProp,
                    styles.bgColor3,
                    styles.eduScroll,
                  ]}
                >
                  <Text style={styles.statsValue}>Tuesday</Text>
                  <Text style={styles.statsCaption}>19.10°C</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.stats,
                    styles.shadowProp,
                    styles.bgColor3,
                    styles.eduScroll,
                  ]}
                >
                  <Text style={styles.statsValue}>Wednessday</Text>
                  <Text style={styles.statsCaption}>14.10°C</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.stats,
                    styles.shadowProp,
                    styles.bgColor3,
                    styles.eduScroll,
                  ]}
                >
                  <Text style={styles.statsValue}>Thursday</Text>
                  <Text style={styles.statsCaption}>26.21°C</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.stats,
                    styles.shadowProp,
                    styles.bgColor3,
                    styles.eduScroll,
                  ]}
                >
                  <Text style={styles.statsValue}>Friday</Text>
                  <Text style={styles.statsCaption}>18.2°C</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.stats,
                    styles.shadowProp,
                    styles.bgColor3,
                    styles.eduScroll,
                  ]}
                >
                  <Text style={styles.statsValue}>Saturday</Text>
                  <Text style={styles.statsCaption}>22.21°C</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
    borderRadius: 8,
    width: "100%",
    // margin: 10,
  },

  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  header: {
    // borderWidth: 1,
    alignItems: "center",
  },

  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#c84b31",
  },

  weatherContainer: {
    marginTop: 0,
  },
  weatherText: {
    fontSize: 18,
    textAlign: "center",
    color: "#012c05",
  },
  weatherLocText: {
    fontSize: 16,
    color: "#012c05",
    marginTop: 5,
    textAlign: "center",
  },
  weatherTempText: {
    fontSize: 26,
    color: "#012c05",
    fontWeight: "bold",
    marginTop: 15,
  },

  weatherImage: {
    width: 150,
    height: 150,
    marginRight: 25,
  },

  statsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,

    marginTop: 35,
  },

  stats: {
    width: "46%",
    backgroundColor: "#fff",
    padding: 20,
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
  },

  eduSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#fff",
  },
  eduScroll: {
    width: 120,
    height: 100,
    marginRight: 10, // Space between items
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  statsCaption: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bol",
  },

  statsValue: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bol",
  },
  bgColor1: {
    backgroundColor: "#f0604a",
  },
  bgColor2: {
    backgroundColor: "#0a990b",
  },
  bgColor3: {
    backgroundColor: "#48A6A7",
  },
  bgColor4: {
    backgroundColor: "#2973B2",
  },
  bgColor5: {
    backgroundColor: "#9DC08B",
  },
});

export default WeatherForecast;
