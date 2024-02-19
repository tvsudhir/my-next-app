import { ApolloClient, InMemoryCache } from '@apollo/client';

export default function createApolloClient() {
  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
  });

  return client;
}

export const apolloClient = createApolloClient();
