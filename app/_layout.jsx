import { Stack, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "../redux/store";
// import { ApolloProvider } from "@apollo/client";
// import client from "../apollo/client";

import { ApolloClient, InMemoryCache, ApolloProvider,  } from '@apollo/client';

const client = new ApolloClient({
  //TODO: update uri on production
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <StatusBar style="auto" />
        <Slot />
      </ApolloProvider>
    </Provider>
  );
}

/* <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, title: "Home" }}
          />
          <Stack.Screen
            name="onboarding"
            options={{ headerShown: false, title: "Onboarding" }}
          />
          <Stack.Screen
            name="onboarding1"
            options={{ headerShown: true, title: "" }}
          />
          <Stack.Screen
            name="onboarding2"
            options={{ headerShown: true, title: "" }}
          />
          <Stack.Screen
            name="home"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="auth/userType"
            options={{ headerShown: true, title: "" }}
          />
          <Stack.Screen
            name="auth/signupAgent"
            options={{ headerShown: true, title: "" }}
          />
          <Stack.Screen
            name="auth/signupPartner"
            options={{ headerShown: true, title: "Ecosystem Partner" }}
          />
          <Stack.Screen
            name="auth/signupPartner2"
            options={{ headerShown: true, title: "Ecosystem Partner" }}
          />
          <Stack.Screen
            name="auth/signupPartner3"
            options={{ headerShown: true, title: "Ecosystem Partner" }}
          />
          <Stack.Screen
            name="auth/login"
            options={{ headerShown: true, title: "" }}
          />
          <Stack.Screen
            name="auth/verifyPhone"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="qrcode"
            options={{ headerShown: true, title: "Scane QR Code" }}
          />
          <Stack.Screen
            name="weather"
            options={{ headerShown: true, title: "Weather" }}
          />
          <Stack.Screen
            name="agent"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="partners"
            options={{ headerShown: false, title: "" }}
          />
          
        </Stack> */
