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
  uri: `http://${process.env.REACT_APP_BACKEND_URL}:4000/graphql`,
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
