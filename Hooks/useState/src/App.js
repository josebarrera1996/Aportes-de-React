import './App.css';
import { useState } from 'react';

// Componente de tipo funcional
// Mostrará una lista de nombres y la posibilidad de agregar nuevos a la misma
function NameList() {

  // Utilizando 'useState'
  // Dentro del arreglo:
  // - El primer item es el actual valor del estado
  // - El segundo item es una función que sirve para actualizar al mismo
  // Esta instrucción sirve para poder manejar los nombres
  const [list, setList] = useState(['Jack', 'Jill', 'John']);

  // Utilizando 'useState'
  // Dentro del arreglo:
  // - El primer item es el actual valor del estado
  // - El segundo item es una función que sirve para actualizar al mismo
  // Esta instrucción sirve para poder manejar el ingreso de datos en un campo 'input'
  // Y posteriormente, poder agregar lo ingresado al arreglo de nombres del primer Hook
  const [name, setName] = useState(''); /* Se puede asignar como estado inicial una función -> useState(() => 'Jack') para realizar operaciones sobre el mismo */

  // Función para añadir un nuevo nombre al arreglo de nombres 'list'
  const onAddName = () => {

    // Forma incorrecta
    // Esta instrucción añadirá un nuevo nombre a la lista, pero esto se verá cuando ingresemos nuevamente contenido
    // al campo del 'input'. Ya que se renderizará todo gracias a 'useState'
    // list.push(name);
    // setList(list);

    // Forma correcta
    setList([...list, name]); // Actualizamos el estado preservando lo anterior + el nuevo valor
    setName(''); // Actualizamos el estado de 'name' para que el campo del input se resetee
  }

  return (

    <div>
      <ul>
        {
          list.map((name, i) => {
            return (
              <li key={i}>{name}</li>
            )
          })
        }
      </ul>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={onAddName}>Add name</button>
    </div>
  )
}

// Componente de tipo funcional
// Representará un botón que incrementará al hacerle click
function Counter() {

  // Utilizando 'useState'
  // Dentro del arreglo:
  // - El primer item es el actual valor del estado
  // - El segundo item es una función que sirve para actualizar al mismo
  const [count, setCount] = useState(10); // Estado inicial '10'

  return (

    <div>
      <button onClick={() => setCount(count + 1)}>Count = {count}</button>
    </div>
  );
}

// Componente de tipo funcional
// Componente principal
function App() {

  return (

    <div>
      {/* Cada uno de estos 'contadores' tendrá su propio estado (es decir, son independientes) */}
      <Counter />
      <Counter />
      <Counter />
      {/* Renderizando el componente 'NameLIst' */}
      <NameList />
    </div>
  )
}

export default App;
