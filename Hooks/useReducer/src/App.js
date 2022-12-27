import './App.css';
import { useReducer } from 'react';

// Componente de tipo funcional
// Representará un simple formulario con 2 campos
function UserForm() {

  // Utilizando 'useReducer'
  // Similar a 'useState'. Primero retornará un arreglo con 2 elementos:
  // - El primero hace referencia al estado actual
  // - El segundo hace referencia a el 'dispatch', que es una manera de invocar la función de 'reduce' que añadiremos
  const [state, dispatch] = useReducer(

    // En esta ocasión combinaremos el estado existente con lo que venga de la acción
    (state, action) => ({
      ...state,
      ...action,
    }),
    {
      first: "",
      last: "",
    }
  );

  return (

    <div>
      <input
        type="text"
        // Accediendo a la propiedad 'first' del objeto 'state'
        value={state.first}
        // En este evento, llamaremos a 'dispatch'. Dentro de el tendrá un objeto con clave cualquiera y la acción especificada
        onChange={(e) => dispatch({ first: e.target.value })}
      />
      <input
        type="text"
        // Accediendo a la propiedad 'last' del objeto 'state'
        value={state.last}
        // En este evento, llamaremos a 'dispatch'. Dentro de el tendrá un objeto con clave cualquiera y la acción especificada
        onChange={(e) => dispatch({ last: e.target.value })}
      />
      <div>First: {state.first}</div>
      <div>Last: {state.last}</div>
    </div>
  )
}




// Componente de tipo funcional
// En este se podrá ingresar nombres y agregarlos a una lista que se visualizará al renderizarse el componente 
function NamesList() {

  // Utilizando 'useReducer'
  // Similar a 'useState'. Primero retornará un arreglo con 2 elementos:
  // - El primero hace referencia al estado actual (el objeto con las 2 propiedades)
  // - El segundo hace referencia a el 'dispatch', que es una manera de invocar la función de 'reduce' que añadiremos
  const [state, dispatch] = useReducer(

    // Función 'reducer'
    // Toma el estado actual (parámetro 'state')
    // Luego, toma cierto tipo de acción que es lo que será enviado a el propio 'dispatch' (parámetro 'action')
    (state, action) => {

      // Por convención, 'action' es un objeto, el cual tiene un tipo ('type'), el cuál será utilizado en una declaración 'swtich'
      // para mutar el estado y retornar uno nuevo basado en los datos que se obtienen de esa acción.
      switch (action.type) {

        // En caso de que deseemos establecer un nombre
        case 'SET_NAME':

          // Retornaremos una nueva versión del estado, tomando todo el estado existente 
          // Luego tenemos una variable 'name' que viene con una clave llamada 'payload' (convención)
          return { ...state, name: action.payload };

        // En caso de que deseemos agregar un nuevo nombre
        case 'ADD_NAME':

          // Retornaremos una nueva versión del estado, tomando todo el estado existente 
          // Luego, sobreescribiremos 'names' para que sea un nuevo arreglo que tendrá todos los 'names' previos, más el 'name' generado
          return {

            ...state,
            names: [...state.names, state.name],
            name: "" // Se reseteará el campo que tiene el estado 'name'
          };

        default:
          return state;
      }
    },
    {
      // Lo siguiente es lo que estará en el 'state' (estado)
      names: [],
      name: ''
    })

  return (

    <div>
      {/* Mostrando la lista de los nombres */}
      <div>
        {state.names.map((name, index) => (
          <div key={index}>{name}</div>
        ))}
      </div>
      {/* Mostrando un campo de tipo 'input' para ingresar nombres y un botón para agregarlos */}
      <input
        type='text'
        // Accediendo a la propiedad 'name' del objeto 'state'
        value={state.name}
        // En este evento, utilizaremos al 'dispatch'. En el que le asignaremos un objeto, que tendrá un tipo (type) en donde asignaremos el caso
        // Y la acción en si con 'payload'
        onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
      />
      <button
        // Con el manejador 'onClick' llamaremos al 'dispatch'. En el que le asignaremos un objeto, que tendrá un tipo (type) en donde asignaremos el caso
        onClick={() => dispatch({ type: 'ADD_NAME', payload: state.name })}
      >Add Name</button>
    </div>
  );
}

// Componente funcional principal
function App() {

  return (

    <div className='App'>
      <UserForm />
      <br /> <br /> <br />
      <NamesList />
    </div>
  )
}

export default App;
