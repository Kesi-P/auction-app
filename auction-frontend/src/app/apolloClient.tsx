import { ApolloClient, InMemoryCache } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCache } from 'apollo3-cache-persist';

// Create a new instance of InMemoryCache
const cache = new InMemoryCache();

// Persist cache to AsyncStorage
const persistApolloCache = async () => {
  try {
    await persistCache({
      cache,
      storage: AsyncStorage,
    });
    console.log('Apollo cache persisted successfully.');
  } catch (error) {
    console.error('Error persisting Apollo cache:', error);
  }
};

persistApolloCache(); // Call the function to persist the cache

// Create Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: cache, // Use the instantiated cache
});

export default client;
