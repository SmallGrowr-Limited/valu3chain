import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [allProduct, setAllProduct] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [loanId, setLoanId] = useState("");
  const router = useRouter();

  const [city, setCity] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0); // count number of items in cart
  const [selected, setSelected] = useState({}); // holds details of a selected product

  //get user location
  const userLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      
      let { coords } = await Location.getCurrentPositionAsync();

      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        //console.log(response);
        for (let item of response) {
          let address = `${item.city}`;

          setCity(address);
        }
      }
    } catch (error) {}
  };

  const loadCart = async () => {
    const storedCart = await AsyncStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  };

  const removeItem = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`${key} removed successfully`);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  };

  // Example usage
  //removeItem("userToken");

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("All AsyncStorage data cleared successfully!");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };

  // Call the function to clear storage

  useEffect(() => {
    //clearStorage();
    // const checkLoggedInStatus = async () => {
    //   const role = await AsyncStorage.getItem("role");
    //   if (role !== null) {
    //     setIsLoggedIn(true);
    //   }
    // };
    userLocation();
    
    
  }, []);

  return (
    <AuthContext.Provider
      value={{
        city,
        setCity,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
