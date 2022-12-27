import './App.css';
import { useEffect, useState } from 'react';

// Componente funcional
// Este componente tendrá un tiempo creciente (por cada segundo que pase)
const Stopwatch = () => {

  // Utilizando 'useState'
  const [time, setTime] = useState(0);

  // Incrementar 'time' cada 1 segundo por 1 unidad
  // Si utilizaramos solo este código, este componente se renderizaría muchas veces debido al 'setInterval'
  /* setInterval(() => {
    setTime(time + 1);
  }, 1000); */

  // Utilizando 'useEffect'
  // Para implementar un 'setInterval' que actualizará a 'time' por cada segundo que pase en 1 unidad
  useEffect(() => {

    // Esto no es lo recomendado, ya que el contador se verá afectado y no obtendremos el resultado deseado de aumentar en 1 por cada segundo
   /*  setInterval(() => {
      setTime(time + 1);
    }, 1000); */

    // Forma correcta
    const interval = setInterval(() => { // Almacenar en esta variable al 'setInterval'

      // Actualizar a 'time' al incrementar en 1 unidad el valor del estado previo
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // La función que es pasada al hook puede retornar una función de 'limpieza'
    // Que será llamada cuando el 'viejo' useEffect está siendo 'desmontado' y el nuevo está viniendo.
    return () => clearInterval(interval);
  }, []); // No habrá nada en la dependencia, porque querremos que este intervalo se cree solo 1 vez

  return (
    <div>Time: {time}</div>
  )
}

// Componente de tipo funcional (Principal)
function App() {

  // Utilizando 'useState'
  const [names, setNames] = useState([]); // Estado inicial -> Un arreglo vacío

  // El siguiente bloque de código muestra el porque hay que usar 'useEffect' y no solo 'fetch',
  // ya que de por sí solo, se generaría un bucle infinito (provocando un error)

  /* fetch('/jsons/names.json')
    .then((response) => response.json())
    .then((data) => setNames(data)); */

  // Utilizando 'useEffect'
  // Se suele utilizar 'useEffect' para realizar peticiones de tipo API
  // Tiene 2 parámetros:
  // - El primero hace referencia a una función de tipo callback. Que será invocada después de que el DOM se ha renderizado
  //   No se la invocará de manera inmediata, se retiene y se llama cuando nuestro 'arreglo de dependencias' se vea alterado
  // - El segundo hace referencia a un 'arreglo de dependencias', cuya función es invocar a la función del primer parámetro cuando este se modifique
  useEffect(() => {

    fetch('/jsons/names.json')
      .then((response) => response.json())
      .then((data) => setNames(data));
  }, []); // Como el arreglo es vacío, solo será llamado 1 vez

  // Utilizando 'useState' para el manejo de los datos con respecto a la selección del nombre
  const [selectedNameDetails, setSelectedNameDetails] = useState(null);

  // Método para poder traer los datos del nombre seleccionado
  const onSlectedNameChange = (name) => {

    fetch(`/jsons/${name}.json`)
      .then((response) => response.json())
      .then((data) => setSelectedNameDetails(data));
  }


  return (

    <div className="App">
      <Stopwatch />
      <div>
        {names.map((name) => <button onClick={() => onSlectedNameChange(name)} key={name}>{name}</button>)}
      </div>
      {
        selectedNameDetails && <div>{JSON.stringify(selectedNameDetails)}</div>
      }
    </div>
  );
}

export default App;
