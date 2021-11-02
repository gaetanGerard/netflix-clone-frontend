import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'TO CHANGE LATER',
});

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const GET_MOVIE = gql `
  query Query {
    getMovie(id: "181812") {
      title
    }
  }
`;

function Movie() {
  const { loading, error, data } = useQuery(GET_MOVIE);

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error.graphQLErrors[0].message}</p>

  console.log(data);

  return <p>There is some data, check console</p>
}


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
      <Movie />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
