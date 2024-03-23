import { CartItem, Pokemon } from "../index";
import pokemonDB from '../apis/pokeApi'
// Define los tipos de acciones del carrito
export type CartActions = 
    { type: 'add-to-cart', payload: { item: Pokemon} } |
    { type: 'remove-from-cart', payload: { id: Pokemon['id'] } } |
    { type: 'decrease-quantity', payload: { id: Pokemon['id']  } } |
    { type: 'increase-quantity', payload: { id: Pokemon['id']  } } |
    { type: 'clear-cart' }

// Define el estado del carrito
export type CartState = {
    data: Pokemon[];
    cart: CartItem[];
}

// Función para inicializar el carrito desde el almacenamiento local
const initialCart = (): CartItem[] => {
    let localStorageCart: string | null = null;
    if (typeof window !== 'undefined') {
        localStorageCart = localStorage.getItem('cart');
    }
    return localStorageCart ? JSON.parse(localStorageCart) : [];
}


// Estado inicial del carrito
export const initialState: CartState = {
    data: pokemonDB, 
    cart: initialCart(),
}
const MIN_ITEMS = 1
const MAX_ITEMS = 5
// Reductor del carrito
export const cartReducer = (state: CartState = initialState, action: CartActions) => {
    switch (action.type) {
        case 'add-to-cart': {
            const { item } = action.payload;
            const itemExists = state.cart.find(cartItem => cartItem.id === item.id);
            let updatedCart: CartItem[] = [];

            if (itemExists) {
                updatedCart = state.cart.map(cartItem => {
                    if (cartItem.id === item.id && cartItem.quantity < MAX_ITEMS) {
                        return { ...cartItem, quantity: cartItem.quantity + 1 };
                    }
                    return cartItem;
                });
            } else {
                updatedCart = [...state.cart, { ...item, quantity: 1 }];
            }

            return {
                ...state,
                cart: updatedCart,
            };
        }

        case 'remove-from-cart': {
            const { id } = action.payload;
            const cart = state.cart.filter(item => item.id !== id);
            return {
                ...state,
                cart,
            };
        }

        case 'decrease-quantity': {
            const { id } = action.payload;
            const cart = state.cart.map(item => {
                if (item.id === id && item.quantity > MIN_ITEMS) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });

            return {
                ...state,
                cart,
            };
        }

        case 'increase-quantity': {
            const { id } = action.payload;
            const cart = state.cart.map(item => {
                if (item.id === id && item.quantity < MAX_ITEMS) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });

            return {
                ...state,
                cart,
            };
        }

        case 'clear-cart': {
            return {
                ...state,
                cart: [],
            };
        }

        default:
            return state;
    }
}
