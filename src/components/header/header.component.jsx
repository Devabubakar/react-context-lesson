import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../contexts/currentUser/currentUser.context';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';
import CartIconContext from '../../contexts/cart.icon/cart.icon.context';

const Header = () => {
  const [hidden, setHidden] = useState(true);
  const currentUser = useContext(CurrentUserContext);
  const toggleHidden = () => setHidden(!hidden);

  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/shop'>
          CONTACT
        </Link>
        {currentUser ? (
          <div className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className='option' to='/signin'>
            SIGN IN
          </Link>
        )}

        <CartIconContext.Provider
          value={{
            hidden: hidden,
            toggleHidden,
          }}
        >
          <CartIcon />
        </CartIconContext.Provider>
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

export default Header;
