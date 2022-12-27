import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import modalReducer from './features/modal/modalSlice';

// Configurando el 'Store'
export const store = configureStore({ // Dentro de esta función, pasaremos un 'objeto' 

    // Propiedad 'reducer' (que es un objeto también), dentro de la cual colocaremos nuestros 'features'.
    // Más en específico, los 'reducer' de estos.
    reducer: {

        // Feature -> cartSlice
        // 'cartReducer' será la función que controlará el estado definido en 'cartSlice'. Esta representa a 'reducer'
        cart: cartReducer,

        // Feature -> modalSlice
        // 'modalReducer' será la función que controlará el estado definido en 'modalSlice'. Esta representa a 'reducer'
        modal: modalReducer
    },
});