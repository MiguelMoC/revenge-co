import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import ProductPrice from "./product-price";
import { Product as ProductType } from "@/types";

const ProductCard = ({product}: {product: ProductType}) => {
    return ( 
        <Card className="w-full max-w-sm">
            <CardHeader className="p-0 items-center">
                <Link href={`/product/${product.slug}`}>
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        height={300}
                        width={300}
                        priority={true}
                    />
                </Link>
            </CardHeader>
            <CardContent className="p-4 grid gap-4">
                <span className="text-xs">{ product.brand}</span>
                <h2 className="text-sm font-bold">{product.name}</h2>
                <div className="flex-between gap-4">
                    <span className="text-xs">
                        {product.rating} Stars
                    </span>
                   
                    {product.stock ? (
                        <ProductPrice value={Number(product.price)}/>
                    ): (
                        <span className="text-xs font-black text-destructive">
                                Out of stock
                        </span>  
                    )}
                   
                </div>
            </CardContent>
            <CardFooter className="border-t">
                <Button className="m-auto">
                    <Link href={`/product/${product.slug}`}>Check it out</Link>
                </Button>
            </CardFooter>
        </Card>
     );
}
 
export default ProductCard;