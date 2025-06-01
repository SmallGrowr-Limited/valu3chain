
import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from "@apollo/client";
import {AsyncStorage} from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext(async (_, { headers }) => {
  // Get the authentication token from AsyncStorage if it exists
  //const token = await AsyncStorage.getItem("token");

  const token = "TEST_TOKEN"

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", 
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});


export default client;
