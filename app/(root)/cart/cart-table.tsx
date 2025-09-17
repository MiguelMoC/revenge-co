'use client'
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { addItemToCart, removeItemFromCart, removeAllItemsSameSkuFromCart } from "@/lib/actions/cart.actions";
import { Plus, Minus, Trash, Loader, ArrowRight, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cart } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Table, TableBody, TableHead, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const CartTable = ({ cart }: { cart?: Cart }) => {
    const router = useRouter();
    const [isPendingAdd, startTransitionAdd] = useTransition();
    const [isPendingRemove, startTransitionRemove] = useTransition();
    const [isPendingClear, startTransitionClear] = useTransition();
    const [isPendingCheckout, startTransitionCheckout] = useTransition();

    return (<>
        <h1 className="py-4 h2-bold"></h1>
        {cart && cart!.items.length > 0 ? (
            <div className="flex justify-between gap-4">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {cart.items.map((item) => (
                        <TableRow key={item.slug}>
                            <TableCell> 
                                <Link className="relative w-24 h-24" href={`/product/${item.slug}`}>
                                    <Image 
                                        src={item.image}
                                        alt={item.name}
                                        width={50}
                                        height={50}
                                    />
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/product/${item.slug}`} className="hover:underline">
                                    {item.name}
                                </Link>
                            </TableCell>
                            <TableCell>${item.price}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button 
                                        size="icon"
                                        variant="outline"
                                        onClick={() => startTransitionRemove(async () => {
                                            const res = await removeItemFromCart(item.productId);
                                            if (!res?.success) { 
                                                toast(res.message, {
                                                    description: res.message,
                                                    classNames: {
                                                        title: "text-red-400",
                                                    },
                                                    icon: (<CircleX className="text-red-700" />),
                                                    position: "top-right",
                                                });
                                                return;
                                            }
                                        })}
                                        disabled={isPendingRemove}
                                    >
                                        {isPendingRemove ? <Loader className="animate-spin h-4 w-4"/> : <Minus className="h-4 w-4"/>}
                                    </Button>   
                                    <span>{item.qty}</span>
                                    <Button 
                                        size="icon"
                                        variant="outline"
                                        onClick={() => startTransitionAdd(async () => {
                                            const res = await addItemToCart(item);
                                            if (!res?.success) { 
                                                toast(res.message, {
                                                    description: res.message,
                                                    classNames: {
                                                        title: "text-red-400",
                                                    },
                                                    icon: (<CircleX className="text-red-700" />),
                                                    position: "top-right",
                                                });
                                                return;
                                            }
                                        })}
                                        disabled={isPendingAdd}
                                    >
                                        {isPendingAdd ? <Loader className="animate-spin h-4 w-4"/> : <Plus className="h-4 w-4"/>}
                                    </Button> 
                                </div>
                            </TableCell>
                            <TableCell>${(Number(item.price) * item.qty).toFixed(2)}</TableCell>    
                            <TableCell className="text-right">
                                <Button 
                                    size="icon"
                                    variant="destructive"
                                    onClick={() => startTransitionClear(async () => {
                                        const res = await removeAllItemsSameSkuFromCart(item.productId);
                                        if (!res?.success) { 
                                            toast(res.message, {
                                                description: res.message,
                                                classNames: {
                                                    title: "text-red-400",
                                                },
                                                icon: (<CircleX className="text-red-700" />),
                                                position: "top-right",
                                            });
                                            return;
                                        }
                                    })}
                                    disabled={isPendingClear}
                                >
                                    {isPendingClear ? <Loader className="animate-spin h-4 w-4"/> : <Trash className="h-4 w-4"/>}
                                </Button> 
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>    
                </Table>
                <Card className="basis-md">
                    <CardContent className="p-4 gap-4">
                        <div className="pb-3 text-xl">
                            Subtotal ({
                                cart.items.reduce((a,c) => a + c.qty, 0)
                            })
                            <span className="font-bold">
                                {formatCurrency(cart.itemsPrice)}
                            </span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            disabled={isPendingCheckout}
                            onClick={
                                () => startTransitionCheckout(() => router.push('/shipping-address'))
                            }
                        >
                            {
                                isPendingCheckout ?
                                    (<Loader className="w-4 h-4 animate-spin" />)
                                    :
                                    (<ArrowRight className="w-4 h-4"/>)
                            }
                            Checkout
                        </Button>
                    </CardFooter>
                </Card>
            </div>  
            
                
        ) : (
            <div className="text-center py-20">
                <h2 className="h2-bold mb-4">Your cart is empty</h2>
                <Button size="lg" onClick={() => router.push('/')} >Go Shopping</Button>
            </div>
        ) }
    </>);
}
 
export default CartTable;