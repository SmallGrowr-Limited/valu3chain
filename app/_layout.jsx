import { Stack, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ApolloProvider } from "@apollo/client";
import { PaperProvider } from 'react-native-paper';
import client from "../apollo/client";
import "../global.css";
// import { ApolloClient, InMemoryCache, ApolloProvider,  } from '@apollo/client';
import AuthLoader from "../components/authLoader"

// export const client = new ApolloClient({
//   //TODO: update uri on production
//   uri: "http://localhost:4000",
//   cache: new InMemoryCache(),
//   credentials: "include",
// });

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

