import { useState, useEffect, useMemo } from "react";

import type {Guitar, CartItem} from '../types'

export const useCart = () =>{

    const initialCart = () : CartItem [] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? [...JSON.parse(localStorageCart)]: []
      };
    
      
      const [cart, setCart] = useState(initialCart);
    
      const MAX_ITEMS = 5;
      const MIN_ITEMS = 1;
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);
    
      const addToCart = (item: Guitar) => {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    
        if (itemExists >= 0) {
          if (cart[itemExists].quantity >= MAX_ITEMS) return;
          const updatedCart = [...cart];
          updatedCart[itemExists].quantity++;
          setCart(updatedCart);
        } else {
          const newItem : CartItem = {...item, quantity : 1} /* Se crea una nueva variable (a la cual se le agrega el type CartItem), y en ella se copia todo lo de item y se agrega la variable quantity */
/*           item.quantity = 1; */
          setCart([...cart, newItem]);
        }
      };
    
      const removeFromCart = (id: Guitar ['id']) => {
        setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
      };
    
      const increaseQuantity = (id: Guitar ['id']) => {
        const updatedCart = cart.map((item) => {
          if (item.id === id && item.quantity < MAX_ITEMS) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        setCart(updatedCart);
      };
      const decreaseQuantity = (id: Guitar ['id']) => {
        const updatedCart = cart.map((item) => {
          if (item.id === id && item.quantity > MIN_ITEMS) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
        setCart(updatedCart);
      };
    
      const clearCart = () => {
        setCart([]);
      };

      /* UseMemo evita que se ejecute el codigo si alguna de las dependencias que definamos no haya cambiado*/
// State derivado
  const isEmpty = useMemo (() => cart.length === 0,[cart]);
  const cartTotal = useMemo (()=> cart.reduce ( (total, item)=> total + (item.quantity * item.price),0),[cart])

    return {
   
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

 