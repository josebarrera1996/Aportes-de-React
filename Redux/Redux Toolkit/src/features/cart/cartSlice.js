import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import cartItems from '../../cartItems';

// En esta sección se desarrollará todo lo relacionado con el 'feature' de 'cartSlice'
// Básicamente, esta controlará todo lo relacionado con el 'carrito'

// URL para realizar consultas
const url = 'https://course-api.com/react-useReducer-cart-project';

// Estado inicial
const initialState = {

    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true
};

// Método '1' (con fetch) para obtener los items de la API con 'createAsyncThunk'
// El tipo de acción definido será 'cart/getCartItems'
// El segundo parámetro se definirá una función de tipo callback
export const getCartItems = createAsyncThunk('cart/getCartItems', () => {

    // Retornar en formato JSON lo obtenido
    return fetch(url).then((resp) => resp.json()).catch((err) => console.log(err));
});

// Método '2' (con axios) para obtener los items de la API con 'createAsyncThunk'
// El tipo de acción definido será 'cart/getCartItems'
// El segundo parámetro se definirá una función de tipo callback
export const getCartItems1 = createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {

    try {

        // console.log(name);

        // console.log(thunkAPI);

        // console.log(thunkAPI.getState());

        // thunkAPI.dispatch(openModal());

        // Obtener los datos
        const resp = await axios(url);

        // Retornarlos en formato JSON
        return resp.data;

    } catch (error) {

        return thunkAPI.rejectWithValue('something went wrong');
    }
});


// Creando el slice
const cartSlice = createSlice({

    /* Propiedades */
    name: 'cart',
    initialState,

    // Definiendo otra propiedad importante en Redux: los reducers
    // Cuando instalamos 'Redux' viene por defecto 'Immer library' que hace hace todo el trabajo pesado detrás de escema
    // Por lo tanto, no deberemos de retornar un nuevo estado y de esta manera, se podrá actualizar o mutar el estado directamnete.
    reducers: {

        // Reducer para limpiar los items del carrito
        // Se creará la acción 'clearCart'
        clearCart: (state) => {

            // Reasignando con un arreglo vacío a 'cartItems'
            state.cartItems = [];
        },

        // Reducer para remover un item del carrito
        // Se creará la acción 'removeItem'
        removeItem: (state, action) => {

            // Obteniendo el item (al cual accederemos gracias a su ID)
            const itemId = action.payload;

            // Filtrar los items para que no se traiga el que tenga el valor definido en 'itemId'
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },

        // Reducer para incrementar la cantidad de un item del carrito
        // Se creará la acción 'increase'
        increase: (state, { payload }) => { // Destructuraremos al objeto 'action'

            // Obteniendo el item gracias al ID
            const cartItem = state.cartItems.find((item) => item.id === payload.id);

            // Proceder a incrementar la propiedad 'amount' de 1 en 1
            cartItem.amount = cartItem.amount + 1;
        },

        // Reducer para reducir la cantidad de un item del carrito
        decrease: (state, { payload }) => { // Accedemos al 'payload' al destructurarlo

            // Obteniendo el item gracias al ID
            const cartItem = state.cartItems.find((item) => item.id === payload.id);

            // Proceder a decrementar la propiedad 'amount' de 1 en 1
            cartItem.amount = cartItem.amount - 1;
        },

        // Reducer para calcular el total (basado en las cantidades de items y sus respectivos precios)
        calculateTotals: (state) => {

            let amount = 0;
            let total = 0;

            // Recorriendo los items del carrito
            state.cartItems.forEach((item) => {

                // Sumando las cantidades de los items
                amount += item.amount;

                // Obtener el total gracias a sumar la cantidad de items por sus precios
                total += item.amount * item.price;
            });

            // Actualizar el estado de las propiedades 'amount' y 'total'
            state.amount = amount;
            state.total = total;
        },
    },

    // Utilizando otra propiedad importante los 'extraReducers'. 
    // En donde definiremos 'lifecycle actions', es decir, acciones del ciclo de vida. Relacionadas con los estados de las promesas
    extraReducers: (builder) => {

        // Utilizando 'builder' para añadir casos
        builder

            // Ciclo 'pending', en donde se hace referencia a que se está pendiente a la obtención de los datos
            .addCase(getCartItems.pending, (state) => {

                // Actualizar el estado de 'isLoading' a 'true'
                state.isLoading = true;
            })

            // Ciclo 'fulfilled', en donde se hace referencia a que se logró obtener los datos de la api
            .addCase(getCartItems.fulfilled, (state, action) => {

                // Actualizar el estado de 'isLoading' a 'false'
                state.isLoading = false;

                // Actualizar 'cartItems' con los datos obtenidos en el 'payload'
                state.cartItems = action.payload;
            })

            // Ciclo 'rejected', en donde se hará referencia a que no se pudo concretar la obtención de los datos debido a un error
            .addCase(getCartItems.rejected, (state) => {

                // Actualizar el estado de 'isLoading' a 'false'
                state.isLoading = false;
            })
    }
});

// Ver el objeto por consola
console.log(cartSlice);

// Exportando las acciones de los reducers
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

// Exportando la función 'reducer' del objeto
export default cartSlice.reducer;



