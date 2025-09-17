import CartTable from './cart-table';
import { getMyCart } from '@/lib/actions/cart.actions';

export const metadata = {
    title: 'Cart - Revenge Co',
    description: 'Your shopping cart at Revenge Co',
}

const CartPage = async () => {
    const cart = await getMyCart();

    return (<>The cart
        <CartTable cart={cart}/>
    </>);
}
 
export default CartPage;