import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../features/modal/modalSlice';

// Componente funcional
// Será el componente en el que se renderizarán: los items del carrito, la suma total, y la posibilida de limpiarlo.
const CartContainer = () => {


    /* Utilizando 'useDispatch' */
    // Este Hook devuelve una referencia a la función de 'dispatch' del 'store' de Redux. Puede usarlo para enviar acciones según sea necesario.
    // Básicamente, se utilizará para poder acceder a las acciones (funciones definidas en los reducers) y despacharlas. 
    const dispatch = useDispatch();


    /* Utilizando 'useSelector */
    // Accediendo a los siguientes estados (gracias a la destructuración) del 'cart' del 'store'
    const { cartItems, total, amount } = useSelector((state) => state.cart);


    // Si el carro está limpio, es decir no hay items...
    if (amount < 1) {

        return (
            <section className='cart'>
                <header>
                    <h2>your bag</h2>
                    <h4 className='empty-cart'>is currently empty</h4>
                </header>
            </section>
        );
    }


    return (
        <section className='cart'>
            <header>
                <h2>your bag</h2>
            </header>
            <div>
                {cartItems.map((item) => {
                    return <CartItem key={item.id} {...item} />;
                })}
            </div>
            <footer>
                <hr />
                <div className='cart-total'>
                    <h4>
                        total <span>${total.toFixed(2)}</span>
                    </h4>
                </div>
                <button className='btn clear-btn' onClick={() => dispatch(openModal())}>
                    clear cart
                </button>
            </footer>
        </section>
    )
}

export default CartContainer;