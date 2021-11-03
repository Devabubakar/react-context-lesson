import React, { useContext } from 'react';



import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import {  withRouter } from 'react-router-dom';

import './cart-dropdown.styles.scss';
import { CartContext } from '../../providers/cart.provider';

const CartDropdown = ({ history }) => {
  const { cartItems, toggleCart } = useContext(CartContext);
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push('/checkout');
          toggleCart();
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

export default withRouter(CartDropdown);
