import { Stack, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ApolloProvider } from "@apollo/client";
import { PaperProvider } from 'react-native-paper';
import client from "../apollo/client";
import "../global.css";
import AuthLoader from "../components/authLoader"

export default function RootLayout() {

  return (
    <Provider store={store}>
      <PaperProvider>
      <ApolloProvider client={client}>
        <AuthLoader />
        <StatusBar style="auto" />
        <Slot />
      </ApolloProvider>
      </PaperProvider>
    </Provider>
  );
}

