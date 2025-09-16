'use client'
import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, CircleX, CircleCheckBig  } from 'lucide-react';
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item }: { item: CartItem }) => {
    const router = useRouter();

    const handleAddToCart = async () => {
        const res = await addItemToCart(item);
        if (!res.success) {
            toast('Something went worng', {
                description: res.message,
                classNames: {
                    title: "text-red-400",
                },
                icon: (<CircleX className="text-red-700"/>)
            });
            return;
        }
        toast('Product added to cart', {
            action: {
                label: 'Go to Cart',
                onClick: () => router.push('/cart')
            },
            icon: (<CircleCheckBig className="text-green-500"/>)
        })
    }
    return (  <Button className="w-full mt-4" type="button" onClick={handleAddToCart}><Plus /> Add to cart</Button>);
}
 
export default AddToCart;