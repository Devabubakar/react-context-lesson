import { createContext } from 'react';
const CartIconContext = createContext({
  hidden: true,
  toggleCart: () => {},
});

export default CartIconContext;
