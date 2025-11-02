import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

const GRAPHQL_URL = 'http://localhost:8080/storefront.graphql'

let apolloClient: ApolloClient

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    credentials: 'same-origin',
  })

  const errorLink = onError((error: any) => {
    const { graphQLErrors, networkError } = error
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }: any) =>
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      )
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`)
    }
  })

  const authLink = setContext((_, { headers }) => {
    // Add any auth headers here if needed
    return {
      headers: {
        ...headers,
        // Add authorization header if user is authenticated
        // 'authorization': token ? `Bearer ${token}` : '',
      }
    }
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Product: {
          fields: {
            images: {
              merge(_existing, incoming) {
                return incoming;
              },
            },
            inventory: {
              merge(existing, incoming) {
                return { ...existing, ...incoming };
              },
            },
          },
        },
        Cart: {
          fields: {
            totals: {
              merge(existing, incoming) {
                return { ...existing, ...incoming };
              },
            },
          },
        },
        CartItem: {
          fields: {
            product: {
              merge(existing, incoming) {
                return { ...existing, ...incoming };
              },
            },
          },
        },
        CheckoutSession: {
          fields: {
            cart: {
              merge(existing, incoming) {
                return { ...existing, ...incoming };
              },
            },
          },
        },
      },
    }),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  })
}

export function getApolloClient() {
  // Create a new client for server-side rendering
  if (typeof window === 'undefined') {
    return createApolloClient()
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient()
  }

  return apolloClient
}

// For server-side rendering with Next.js
export function initializeApollo(initialState = null) {
  const client = getApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    client.cache.restore(initialState)
  }

  return client
}
