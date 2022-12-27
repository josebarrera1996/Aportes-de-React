import { useQuery, useMutation, useQueryClient } from "react-query"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../../api/todosApi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

// Componente funcional
// Mostrará un listado con los 'todo'
const TodoList = () => {


    // Utilizando 'useState'
    const [newTodo, setNewTodo] = useState('');


    // Definiendo un 'Query client'
    // Utilizaremos 'useQueryClient' para traer lo definido en 'index.js'
    const queryClient = useQueryClient();


    // Utilizando 'useQuery'
    // Este Hook se utiliza para obtener datos.
    // Tiene 3 parámetros (el tercero es opcional):
    // - El primero es una clave, una función para llamar a la API
    // - El segundo, un objeto para configurar esa llamada
    // - Un objeto para indicar los selectores (donde podemos alterar los datos)
    // Todas las consultas serán almacenadas en el QueryCache
    const { isLoading, isError, error, data: todos } = useQuery('todos', getTodos, {

        // Selectores
        // Ordenando los datos (para posicionar a los últimos items agregados al principio)
        select: data => data.sort((a, b) => b.id - a.id)
    });


    /* Utilizando 'useMutation' */
    // Se utiliza para crear, borrar y actualizar los datos en el servidor.

    // Creando un nuevo todo
    const addTodoMutation = useMutation(addTodo, {

        onSuccess: () => {

            // Invalida el caché cuando añadimos un nuevo todo y luego desencadena una recuperación, es decir, tenemos la lista de los todos
            // con el registro recien creado
            queryClient.invalidateQueries('todos');
        }
    });

    // Actualizando un todo
    const updateTodoMutation = useMutation(updateTodo, {

        onSuccess: () => {

            // Invalida el caché cuando actualizamos un todo y luego desencadena una recuperación, es decir, tenemos la lista de los todos
            // con el registro recien actualizado
            queryClient.invalidateQueries('todos');
        }
    });

    // Eliminando un todo
    const deleteTodoMutation = useMutation(deleteTodo, {

        onSuccess: () => {

            // Invalida el caché cuando borramos un todo y luego desencadena una recuperación, es decir, tenemos la lista de los todos
            // sin el registro recien eliminado
            queryClient.invalidateQueries('todos');
        }
    });


    // Poniendo en funcionamiento las mutaciones definidas anteriormente
    // Función para crear un nuevo 'todo'
    const handleSubmit = (e) => {

        e.preventDefault(); // Para evitar que la página se recargue

        // Implementando la mutación
        addTodoMutation.mutate({

            // Llenando los campos
            userId: 1,
            title: newTodo,
            completed: false
        });

        // Actualizando el estado para resetear a una cadena vacía
        setNewTodo('');
    };


    // Definiendo el formulario para la creación de un nuevo 'todo'
    const newItemSection = (

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
    )


    /* Definiendo lo que se visualizará si se está cargando, o si hay o no error */
    let content;

    if (isLoading) {

        content = <p>Loading...</p>

    } else if (isError) {

        content = <p>{error.message}</p>

    } else {

        content = todos.map((todo) => {

            return (

                <article key={todo.id}>
                    <div className="todo">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() =>
                                updateTodoMutation.mutate({ ...todo, completed: !todo.completed })
                            }
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button className="trash" onClick={() => deleteTodoMutation.mutate({ id: todo.id })}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )
        })
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