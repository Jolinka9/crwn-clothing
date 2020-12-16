import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepages/homepage.components';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  // initialize variable for unsuscribing the user from authentication
  unsubscribeFromAuth = null;

  // Lifecycle method. is executed after the first render only on the 
  // client side. This is where AJAX requests and DOM or state updates should occur.
  componentDidMount() {

    // Initializing const setCurrentUser which value is retrieved from the destructuring 
    // of the props
    // this refers to the object or func it is used within 
    // Props are arguments passed into React components. Props are passed to components via HTML attributes.
    const { setCurrentUser } = this.props;


    // Assign value returned by onAuthStateChanged to unsuscribeFromAuth
    // onAuthStateChanged is way to get the current user by setting an observer on the Auth object
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      // checks if user is signed in so we create an user profile doc in firebase
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={
            () => this.props.currentUser ? 
            (<Redirect to='/'/>) 
            : (<SignInAndSignUpPage/>)
          } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

// The connect() function connects a React component to a Redux store.

// It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.

// It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component you passed in.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);