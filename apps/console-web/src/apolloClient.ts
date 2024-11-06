// src/apollo-client.ts
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Define URIs for the live and mock servers
const LIVE_SERVER_URI = "https://3.28.123.127/graphql";
const MOCK_SERVER_URI = "http://localhost:4000/graphql";

// Create the base HTTP link (we'll dynamically change the URI in `setContext`)
const httpLink = new HttpLink({
  uri: LIVE_SERVER_URI, // Default to live server
});

// Set up context to dynamically choose between live and mock server
const authLink = setContext((_, prevContext) => {
  // Check if `useMockServer` is set in the operation's context
  const useMockServer = prevContext.useMockServer;
  const uri = useMockServer ? MOCK_SERVER_URI : LIVE_SERVER_URI;

  // Get the authentication token from localStorage if it exists
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "", // Add Bearer token if available
    },
    // Override URI based on `useMockServer`
    uri,
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Use authLink with httpLink
  cache: new InMemoryCache(),
});

export default client;
