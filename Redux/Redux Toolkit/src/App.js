import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";

// Componente funcional (principal)
function App() {


  /* Utilizando 'useDispatch' */
  // Para poder acceder a la acción 'calculateTotals' de los reducers
  const dispatch = useDispatch();


  /* Utilizando 'useSelector' */
  // Para acceder a el estado 'cartItems' y 'isLoading' del 'cart' del 'store'
  const { cartItems, isLoading } = useSelector((store) => store.cart);

  /* Utilizando 'useSelector' */
  // Para acceder a el estado 'isOpen' del 'modal' del 'store'
  const { isOpen } = useSelector((store) => store.modal);


  /* Utilizando 'useEffect' */
  // Para traer los datos de la API
  useEffect(() => {

    // Realizando el dispatch
    dispatch(getCartItems());
  }, []);

  /* Utilizando 'useEffect' */
  // Para que actualice el total cada vez que aumentemos/decrementemos/removamos items del cartito
  useEffect(() => {

    // Realizando el dispatch
    dispatch(calculateTotals());
  }, [cartItems]);


  // Pieza de código a mostrar cuando la app se está cargando (y a la espera de los datos de la API)
  if (isLoading) {

    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }


  return (

    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
