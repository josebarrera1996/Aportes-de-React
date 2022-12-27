import { ChevronDown, ChevronUp } from '../icons';
import { useDispatch } from 'react-redux';
import { removeItem, increase, decrease } from '../features/cart/cartSlice';

// Componente funcional
// Representará la estructura del item del carrito, junto con la posibilidad de agregar o reducir su cantidad, etc.
const CartItem = ({ id, img, title, price, amount }) => {


    /* Utilizando 'useDispatch' */
    // Este Hook devuelve una referencia a la función de 'dispatch' del 'store' de Redux. Puede usarlo para enviar acciones según sea necesario.
    // Básicamente, se utilizará para poder acceder a las acciones (funciones definidas en los reducers) y despacharlas. 
    const dispatch = useDispatch();


    return (

        <article className='cart-item'>
            <img src={img} alt={title} />
            <div>
                <h4>{title}</h4>
                <h4 className='item-price'>${price}</h4>
                <button
                    className='remove-btn'
                    onClick={() => {
                        dispatch(removeItem(id));
                    }}
                >
                    Remove
                </button>
            </div>
            <div>
                <button
                    className='amount-btn'
                    onClick={() => {
                        dispatch(increase({ id }));
                    }}
                >
                    <ChevronUp />
                </button>
                <p className='amount'>{amount}</p>
                <button
                    className='amount-btn'
                    onClick={() => {
                        // Si la cantidad es igual a '1', en vez de decrementar, lo removeremos
                        if (amount === 1) {
                            dispatch(removeItem(id));
                            return;
                        }
                        // Caso contrario, decrementar
                        dispatch(decrease({ id }));
                    }}
                >
                    <ChevronDown />
                </button>
            </div>
        </article>
    )
}

export default CartItem;