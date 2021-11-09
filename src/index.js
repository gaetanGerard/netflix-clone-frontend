import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
