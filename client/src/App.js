import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import './style/calendar.css'

// Apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// component imports:
import Header from './components/layout/Header';
import Cart from './components/Cart'
import NavBar from './components/layout/NavBar';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Shop from './components/Shop';
import Footer from './components/layout/Footer';
import Services from './components/Services';
import Product from './components/Product';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import Calendar from './components/Calendar';
import { StoreProvider } from './utils/GlobalState';


// Middleware
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
          <div>
            <StoreProvider>
              <NavBar />
              <Header />
              <Cart />
                <Route exact path="/about">
                  <AboutUs />
                </Route>
                <Route exact path="/products">
                  <Product />
                </Route>
                <Route exact path="/services">
                  <Services />
                </Route>
                <Route exact path="/contact">
                  <Contact />
                </Route>
                <Route exact path="/shop">
                  <Shop  />
                </Route>
                <Route exact path="/reviews">
                  <Reviews  />
                </Route>
                <Route exact path="/gallery">
                  <Gallery />
                </Route>
                <Route exact path="/calendar">
                  <Calendar />
                </Route>
              <Footer />
            </StoreProvider>
          </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
