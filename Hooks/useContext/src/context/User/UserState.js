import { useReducer } from "react"
import UserReducer from './UserReducer';
import UserContext from "./UserContext";
import axios from "axios";
// import { GET_USERS, GET_PROFILE } from "../types";

/* 
Aquí se tratará lo que es la 'definición del estado'. Vamos a escribir tanto el estado que vamos a consumir
y las funciones que van a alterar a ese estado.
*/
const UserState = (props) => {


    // Definiendo el estado inicial de la aplicación (un objeto)
    const initialState = {

        // Arreglo de usuarios -> vacío
        users: [],

        // Guardar en el estado de la aplicación el usuario seleccionado
        selectedUser: null
    }


    // Utilizando 'useReducer'
    const [state, dispatch] = useReducer(UserReducer, initialState);


    // Función para llenar el estado de 'users'
    const getUsers = async () => {

        try {

            const res = await axios.get("https://reqres.in/api/users");
            const data = res.data.data;
            console.log(data);
            dispatch({ type: 'GET_USERS', payload: data });

        } catch (error) {
            console.error(error);
        }
    }


    // Función para llenar el estado de 'selectedUser'
    const getProfile = async (id) => {

        try {
            const res = await axios.get("https://reqres.in/api/users/" + id);
            const { data } = res;
            console.log(data.data);
            dispatch({ type: 'GET_PROFILE', payload: data.data });

        } catch (error) {
            console.error(error);
        }
    }

    return (

        <UserContext.Provider value={{

            // A continuación, lo que se le pasará a estos componentes, es decir, los valores
            users: state.users,
            selectedUser: state.selectedUser,

            // También se les pasará las funciones que nos permiten alterar el estado de estos valores
            getUsers,
            getProfile
        }}>

            {/* Todos los componentes (hijos) que estan dentro de Provieder van a poder acceder al estado definido aquí */}
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;
