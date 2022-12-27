import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from '../api/apiSlice';

// Componente de tipo funcional
// Este componente albergará los todos y la posibilidad de crear uno nuevo
const TodoList = () => {

    // Utilizando 'useState' para trabajar con el input para crear un nuevo 'todo'
    const [newTodo, setNewTodo] = useState('');

    // Utilizando el hook personalizado 'useGetTodosQuery'
    const {

        // Campos
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery();

    // Utilizando el resto de los hooks personalizados para lograr modificaciones (mutations)
    const [addTodo] = useAddTodoMutation(); // Hook para crear un nuevo registro

    const [updateTodo] = useUpdateTodoMutation(); // Hook para actualizar un registro

    const [deleteTodo] = useDeleteTodoMutation(); // Hook para eliminar un registro

    // Método para insertar un nuevo todo
    const handleSubmit = (e) => {

        e.preventDefault(); // Para evitar que la página se recargue

        // Utilizando el Hook para insertar un nuevo registro
        addTodo({ userId: 1, title: newTodo, completed: false });

        setNewTodo(''); // Resetear el estado (y con esto el campo del input) a un string vacío
    }

    // Sección para crear un nuevo item
    const newItemSection =
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>


    // Contenido a renderizar dependiendo de condiciones
    let content;

    if (isLoading) {

        // Si se está cargando la petición, mostrar lo siguiente
        content = <p>Loading...</p>

    } else if (isSuccess) {

        // Si la petición ha sido exitosa, mostrar lo siguiente
        content = todos.map(todo => {
            return (
                <article key={todo.id}>
                    <div className='todo'>
                        <input
                            type='checkbox'
                            // Actualizar el campo 'completed' del todo a 'true' o 'false'
                            checked={todo.completed}
                            // Obtener el id del 'todo'
                            id={todo.id}
                            // Actualizar el 'todo' preservando el contenido previo + la modificación al campo 'completed'
                            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button className='trash' onClick={() => deleteTodo({ id: todo.id })}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )
        })

    } else if (isError) {
        content = <p>{error}</p>
    }


    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}

export default TodoList;