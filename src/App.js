import React, { useState, useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CurrentUserContext from './contexts/currentUser/currentUser.context';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';


const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  function onAuthStateChanged() {
    return auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) =>
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          })
        );
      }
      setCurrentUser(userAuth);
    });
  }
  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged();

    //when components unmounts
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
      </CurrentUserContext.Provider>

      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route
          exact
          path='/signin'
          render={() =>
            currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

// //components will unmount
// this.unsubscribeFromAuth();

export default App;
