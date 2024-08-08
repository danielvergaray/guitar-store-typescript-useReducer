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

// Funcion del useReducer (acciones)

    export const cartReducer = ( 
            state: CartState = initialState,
            actions: CartActions
        
        ) =>{

        if (actions.type === "add-to-cart") {
            return{
                ...state
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

    }




