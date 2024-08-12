import { db } from "../data/db"
import { CartItem, Guitar } from "../types"

export type CartActions =
    { type: 'add-to-cart', payload: {item: Guitar} } |
    { type: 'remove-from-cart', payload: {id: Guitar['id']} } |
    { type: 'drecrease-quantity', payload: {id: Guitar['id']} } |
    { type: 'increase-quantity', payload: {id: Guitar['id']} } |
    { type: 'clear-cart'}

    // Se crea el state Inicial

    export const initialState : CartState = {
        data: db,
        cart: []
    }

    // Se definen los Types que tendran

    export type CartState = {
        data : Guitar[]
        cart: CartItem[]
    }

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

// Funcion del useReducer (acciones)

    export const cartReducer = ( 
            state: CartState = initialState,
            actions: CartActions
        
        ) =>{

        if (actions.type === "add-to-cart") {

            const itemExists = state.cart.find((guitar) => guitar.id === actions.payload.item.id);
    
            let updatedCart : CartItem[] = []

            if (itemExists) {
              updatedCart = state.cart.map(item => {
                if (item.id === actions.payload.item.id){
                    if (item.quantity < MAX_ITEMS) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                } else {
                    return item
                }
              })
            
            } else {
              const newItem : CartItem = {...actions.payload.item, quantity : 1} /* Se crea una nueva variable (a la cual se le agrega el type CartItem), y en ella se copia todo lo de item y se agrega la variable quantity */
    /*           item.quantity = 1; */
              updatedCart = [...state.cart, newItem]
            }

            return{
                ...state,
                cart: updatedCart
            }
        }


        if (actions.type === "remove-from-cart"){
            return{
                ...state
            }
        }

        if (actions.type === "drecrease-quantity"){
            return{
                ...state
            }
        }

        if (actions.type === "increase-quantity"){
            return{
                ...state
            }
        }

        if (actions.type === "clear-cart"){
            return{
                ...state
            }
        }

        return state

    }




