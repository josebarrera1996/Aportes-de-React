import { useState, useMemo, useCallback } from 'react';
import './App.css';

// Componente de tipo funcional
// Será un componente genérico que ordenará una lista de cadenas entrantes
function SortedList({ list, sortFunction }) { // Definiendo 'props' de forma destructuradas

  // Utilizando 'useMemo'
  const sortedList = useMemo(() => {

    return [...list].sort(sortFunction);
  }, [list, sortFunction]);

  return (
    <div>Sorted names: {sortedList.join(', ')}</div>
  )
}

// Componente de tipo funcional
// Principal
function App() {

  // Lista de nombres para después ordenarlos
  const [names] = useState(['John', 'Paul', 'George', 'Ringo']);

  // Utilizando 'useCallback'
  // Ideal para 'estabilizar' referencias. Ya que en esta ocasión el componente 'SortedList' se renderizará cuando 'names' o 'sortFunction' cambien
  // Tiene 2 parámetros:
  // - El primero hace referencia a una función
  // - El segundo hace referencia a un arreglo de dependencias
  const sortFunc = useCallback(

    // Función que comparará 2 cadenas
    (a, b) => a.localeCompare(b) * -1,

    // No hay ninguna dependencia en el arreglo, para que se renderice solo 1 vez
    []
  );

  return (

    <div className="App">
      <div>Names: {names.join(', ')}</div>
      <SortedList list={names} sortFunction={sortFunc} />
    </div>
  );
}

export default App;
