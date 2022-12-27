import { createSlice } from '@reduxjs/toolkit';

// En esta sección se desarrollará todo lo relacionado con el 'feature' de 'modalSlice'
// Básicamente, esta controlará todo lo relacionado con el borrado de los items del carrito

// Estado inicial
const initialState = {

    isOpen: false
};

// Creando el slice
const modalSlice = createSlice({

    // Propiedades
    name: 'modal',
    initialState,

    // Definiendo otra propiedad importante en Redux: los reducers
    // Cuando instalamos 'Redux' viene por defecto 'Immer library' que hace hace todo el trabajo pesado detrás de escema
    // Por lo tanto, no deberemos de retornar un nuevo estado y de esta manera, se podrá actualizar o mutar el estado directamnete.
    reducers: {

        // Reducer para poder abrir el modal
        // Se creará la acción 'openModal'
        openModal: (state, action) => {

            // Actualizará el estado de 'isOpen' a true
            state.isOpen = true;
        },

        // Reducer para poder cerrar el modal
        // Se creará la acción 'closeModal'
        closeModal: (state, action) => {

            // Actualizará el estado de 'isOpen' a false
            state.isOpen = false;
        }
    }
});

// Ver el objeto por consola
// console.log(modalSlice);

// Exportando las acciones de los reducers
export const { openModal, closeModal } = modalSlice.actions;

// Exportando la función 'reducer' del objeto
export default modalSlice.reducer;