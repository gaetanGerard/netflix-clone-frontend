/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import store from './redux/store';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Improve Server for retrieve with the token generated when the user logged in
// https://www.apollographql.com/docs/apollo-server/security/authentication/#outside-of-graphql

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// const GET_MOVIE = gql `
//   query Query {
//     getMovie(id: "181812") {
//       title
//     }
//   }
// `;

// function Movie() {
//   const { loading, error, data } = useQuery(GET_MOVIE);

//   if(loading) return <p>Loading...</p>
//   if(error) return <p>Error: {error.graphQLErrors[0].message}</p>

//   console.log(data);

//   return <p>There is some data, check console</p>
// }

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
