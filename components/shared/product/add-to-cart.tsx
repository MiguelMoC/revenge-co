'use client'
import { CartItem, Cart } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, CircleX, CircleCheckBig, Minus, Trash, Loader  } from 'lucide-react';
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart, removeAllItemsSameSkuFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

const AddToCart = ({ item, cart }: { item: CartItem, cart?: Cart }) => {
    const router = useRouter();
    const [isPendingAdd, startTransitionAdd] = useTransition();
    const [isPendingRemove, startTransitionRemove] = useTransition();
    const [isPendingClear, startTransitionClear] = useTransition();

    const handleAddToCart = async () => {
        startTransitionAdd(async () => { 
            const res = await addItemToCart(item);
            if (!res.success) {
                toast('Something went wrong', {
                    description: res.message,
                    classNames: {
                        title: "text-red-400",
                    },
                    icon: (<CircleX className="text-red-700" />),
                    position: "top-right",
                });
                return;
            }
            toast(`${item.name} added to cart`, {
                action: {
                    label: 'Go to Cart',
                    onClick: () => router.push('/cart')
                },
                icon: (<CircleCheckBig className="text-green-500" />),
                position: "top-right",
                duration: 2500,
            })
        })
    }

    const handleRemoveFromCart = async () => {
        startTransitionRemove(async () => {
            const res = await removeItemFromCart(item.productId);
            toast(res.success ? 'Item removed from cart' : 'Failed to remove item', {
                icon: (<CircleCheckBig className="text-green-500" />),
                position: "top-right",
                duration: 2500,
            });
            return;
        })
    }

    const handleClearAllItemsSameSkuFromCart = async () => {
        startTransitionClear(async () => {
            const res = await removeAllItemsSameSkuFromCart(item.productId);
            toast(res.success ? `All ${item.name} removed from cart` : 'Failed to remove item', {
                icon: (<CircleCheckBig className="text-green-500" />),
                position: "top-right",
                duration: 2500,
            });
        })
    }

    // Check if item is already in cart
    let existItem = cart && cart?.items.find(i => i.productId === item.productId);
    if (existItem?.qty === 0) {
        existItem = undefined
    }
    
    // return (<Button className="w-full mt-4" type="button" onClick={handleAddToCart}><Plus /> Add to cart</Button>);
    return existItem ? (
        <>
        <div className="flex items-center justify-between gap-2 mt-4">
            
            <Button type="button" variant={`outline`} onClick={handleRemoveFromCart}>
                    { isPendingRemove ? (<Loader className="h-4 w-4 animate-spin"/>) : (<Minus className="h-4 w-4" />) }
            </Button>
            <span className="px-2">{existItem!.qty}</span>
            <Button type="button" variant={`outline`} onClick={handleAddToCart}>
                { isPendingAdd ? (<Loader className="h-4 w-4 animate-spin"/>) : (<Plus className="h-4 w-4" />) }
            </Button>
            
            </div>
            {
                existItem!.qty > 1 &&
                <Button className="bg-gray-100 text-gray-500 hover:bg-red-900 hover:text-white w-full mt-4 border-t-2" type="button" variant={`outline`} onClick={handleClearAllItemsSameSkuFromCart}>
                        {isPendingClear ? (<Loader className="h-4 w-4 animate-spin" />) : (<Trash className="h-4 w-4" />)}
                        Clear all?
                </Button>
            }
           
        </>
    ) : (
        <Button className="w-full mt-4" type="button" onClick={handleAddToCart}>
            { isPendingAdd ? (<Loader className="h-4 w-4 animate-spin"/>) : (<Plus className="h-4 w-4" />) }
            Add to cart
        </Button>
    );
}
 
export default AddToCart;