import './App.css';
import { useRef, useState, useEffect } from 'react';

// Lo interesante de utilizar 'useRef' es que cuando cambias el valor de una referencia. No necesariamente hace
// que el componente se vuelva a renderizar 


// Componente funcional (principal)
function App() {

  // Utilizando 'useRef'
  // Este caso tratará sobre uno de los casos más comunes cuando se trabaja con este Hook, y es obtener la referencia
  // a un elemento HTML. Más específicamente, crearemos un elemento 'input' y luego obtendremos una referencia a él.
  // Vamos a querer realizar un 'focus' sobre el 'input' cuando el componente se renderice
  const inputRef = useRef(null);

  // Utilizando 'useEffect'
  // Necesitaremos este Hook, ya que cuando el componente se renderice es cuando podremos hacer referencia a ese elemento.
  useEffect(() => {

    // Cuando hay una referencia, se tiene un valor actual asociado a esa referencia. Este mismo puede ser establecido o leído
    inputRef.current.focus();
  }, []); // No habra nada en el arreglo de dependencias, ya que correrá 1 vez


  // Utilizando 'useRef'
  // Hay otro tipo de uso para este Hook, y es el de mantener el estado sin realizar ninguna actualización.
  // En este caso el campo 'id' no nos interesa saber cuando se actualiza el valor de 'name'
  const idRef = useRef(1); // Valor inicial '1'

  // En esta ocasión tendremos una lista de nombres y utilizaremos un campo 'input' y un botón para añadirlo a la lista.
  const [names, setNames] = useState([

    // El estado inicial será un arreglo de objetos con los campos 'id' y 'name'
    // El campo 'id' se incrementará de a '1'
    { id: idRef.current++, name: "John" },
    { id: idRef.current++, name: "Jane" }
  ]);


  // Método para añadir un nuevo nombre
  const onAddName = () => {

    setNames([
      
      ...names, // Los nombres actuales

      // Más el valor ingresado en el inout
      // El campo 'id' será incrementable, esto quiere decir, que cada vez que agreguemos un nuevo nombre el id se aumentará en '1'
      {
        id: idRef.current++,
        name: inputRef.current.value
      }
    ]);

    // Establecer nuevamente el valor del input a ''
    inputRef.current.value = "";
  }


  return (

    <div className="App">
      {
        names && (
          <div>
            {
              names.map((name) => {
                return (
                  <div key={name}>
                    {name.id} - {name.name}
                  </div>
                )
              })
            }
          </div>
        )
      }
      <input type='text' ref={inputRef} />
      <button onClick={onAddName}>Add Name</button>
    </div>
  );
}

export default App;
