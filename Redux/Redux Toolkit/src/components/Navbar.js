import { CartIcon } from '../icons';
import { useSelector } from 'react-redux';

// Componente funcional
// Representará el menú de navegación
const Navbar = () => {


    /* Utilizando 'useSelector' */
    // Logeando gracias a 'useSelector' lo almacenado en 'store'
    // console.log(useSelector((store) => console.log(store)));

    // Accediendo al estado 'amount' (gracias a la destructuración) del 'store'
    const { amount } = useSelector((store) => store.cart);
    

    return (

        <>
            <nav>
                <div className='nav-center'>
                    <h3>Redux Toolkit</h3>
                    <div className='nav-container'>
                        <CartIcon />
                        <div className='amount-container'>
                            <p className='total-amount'>{amount}</p>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;

