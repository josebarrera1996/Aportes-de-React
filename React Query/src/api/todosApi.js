import axios from "axios";

// Creando una nueva instancia de 'axios' con la siguiente configuración
const todosApi = axios.create({

    baseURL: "http://localhost:3500", // Ruta donde inicializaremos nuestro servidor de JSON
});


// Método para traer todos los 'todos'
export const getTodos = async () => {

    // Obteniendo los registros.
    const response = await todosApi.get('/todos');

    return response.data;
};


// Método para crear un nuevo 'todo'
export const addTodo = async (todo) => {

    // Crear el nuevo 'todo' con los datos pasados en la petición
    return await todosApi.post('/todos', todo);
}


// Método para actualizar un 'todo' en específico (y ya existente)
export const updateTodo = async (todo) => {

    // Actualizar el 'todo' gracias a su ID
    return await todosApi.patch(`/todos/${todo.id}`, todo);
}


// Método para actualizar un 'todo' en específico (y ya existente)
export const deleteTodo = async ({ id }) => {

    // Actualizar el 'todo' gracias a su ID
    return await todosApi.delete(`/todos/${id}`, id);
}


// Exportando los métodos
export default todosApi;