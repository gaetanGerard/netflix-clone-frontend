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

// Pour un usage local ajouter le fichier .env à la racine du projet et ajouter après REACT_APP_BACKEND_URL= l'url de votre backend
// ensuite ajouter le port avant /graphql (le port est en 4000)
// changer https par http
// example: `http://${process.env.REACT_APP_BACKEND_URL}:4000/graphql`
// ou REACT_APP_BACKEND_URL= soit localhost si le backend tourne sur la machine soit l'ip du serveur sur lequel il tourne
const httpLink = createHttpLink({
  uri: `https://${process.env.REACT_APP_BACKEND_URL_PRODUCTION}/graphql`,
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
  cache: new InMemoryCache({
    addTypename: false
  })
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
