/* Aquí crearemos los métodos que interactuarán con nuestra API */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Definiendo el feature para crear nuestra API
export const apiSlice = createApi({

    // Propiedades (configuraciones)
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Todos'], // Definiendo los tags
    endpoints: (builder) => ({

        // Método para traer todos los 'todos'
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: res => res.sort((a, b) => b.id - a.id), // Para ordenar los todos en orden descendente (para ver los últimos todos primeros)
            providesTags: ['Todos'] // Utilizado para el cache
        }),

        // Método para insertar un nuevo 'todo'
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos'] // Invalidando el cache
        }),

        // Método para actualizar un 'todo' existente
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos'] // Invalidando el cache
        }),

        // Método para eliminar un 'todo' existente
        deleteTodo: builder.mutation({
            query: ({ id }) => ({ // Desestructurando al 'todo' para solo obtener el 'id'
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos'] // Invalidando el cache
        })
    })
});

// Exportando estos métodos (creando hooks personalizados)
export const {

    useGetTodosQuery, // referencia a 'getTodos',
    useAddTodoMutation, // referencia a 'addTodo',
    useUpdateTodoMutation, // referencia a 'updateTodo'
    useDeleteTodoMutation // referencia a 'deleteTodo'
} = apiSlice;