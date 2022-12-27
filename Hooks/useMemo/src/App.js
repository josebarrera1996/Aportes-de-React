import { useState, useMemo } from 'react';
import './App.css';

// Componente de tipo funcional
// Principal
function App() {

  // Lista de números para después obtener la suma total de sus elementos
  const [numbers] = useState([10, 20, 30]);

  // Utilizando 'useMemo'
  // Es un Hook ideal para trabajar con propiedades calculadas (algo complejas)
  // Tiene 2 parámetros:
  // - El primero es una función
  // - El segundo es un arreglo de dependencias
  const total = useMemo(

    // Función para obtener la suma de los números del arreglo 'numbers'
    () => numbers.reduce((acc, number) => acc + number, 0),

    // Esta dependencia sirve para aclarar que la función se empleará cada vez que el arreglo 'numbers' cambie.
    [numbers] 
  );

  // Lista de nombres para después ordenarlos
  const [names] = useState(['John', 'Paul', 'George', 'Ringo']);
  
  // Utilizando 'useMemo'
  // Es un Hook ideal para cuando creas un arreglo o un objeto. Ya que React compara los arreglos y los objetos por 'referencia'
  // Tiene 2 parámetros:
  // - El primero es una función
  // - El segundo es un arreglo de dependencias
  const sortedNames = useMemo(

    // Función para ordenar los nombres
    () => [...names].sort(),

    // Esta dependencia sirve para aclarar que la función se empleará cada vez que el arreglo 'names' cambie.
    [names]
  );


  return (
    
    <div className="App">
      <div>Total: {total}</div>
      <div>Names: {names.join(', ')}</div>
      <div>Sorted names: {sortedNames.join(', ')}</div>
    </div>
  );
}

export default App;
