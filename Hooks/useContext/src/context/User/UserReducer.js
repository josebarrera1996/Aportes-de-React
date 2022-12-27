// En este archivo se definirá el 'Reducer'

import { GET_USERS, GET_PROFILE } from "../types";

// Recibirá 'state', que es el estado del contexto
// Y 'action' que es lo que se quiere que se haga, como actualizar al estado
const reducer = (state, action) => {

    // Destructuro 'payload' (los datos que obtenemos de la función) y 'type' (GET_USERS, GET_PRIFLE, etc) del objeto 'action'
    const { payload, type } = action;

    // Decidir dependiendo del 'type' que se le pase
    switch (type) {

        // En el caso de que queramos la lista de usuarios
        case GET_USERS:

            // Retornar el estado previo y actualizar 'users' con la información que obtengamos del 'payload'
            return {
                ...state,
                users: payload,
            };

        // En el caso de que queramos la información de un usuario en específico (el seleccionado)
        case GET_PROFILE:

            // Retornar el estado previo y actualizar 'selectedUser' con la información que obtengmaos del 'payload'
            return {
                ...state,
                selectedUser: payload,
            };
            
        // Retornar el estado
        default:
            return state;
    }
}

export default reducer;

