import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { closeModal } from '../features/modal/modalSlice';

// Componente de tipo funcional
// Representará una ventana para confirmar o no el borrado de todos los items del carrito
const Modal = () => {

    /* Utilizando 'useDispatch' */
    // Para poder acceder a las acciones definidas en los reducers
    const dispatch = useDispatch();

    return (

        <aside className='modal-container'>
            <div className='modal'>
                <h4>remove all items from your shopping cart?</h4>
                <div className='btn-container'>
                    <button
                        type='button'
                        className='btn confirm-btn'
                        onClick={() => {
                            dispatch(clearCart());
                            dispatch(closeModal());
                        }}
                    >
                        confirm
                    </button>
                    <button
                        type='button'
                        className='btn clear-btn'
                        onClick={() => {
                            dispatch(closeModal());
                        }}
                    >
                        cancel
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Modal;