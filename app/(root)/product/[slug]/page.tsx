import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import ProductPrice from "@/components/shared/product/product-price";
import ProductImages from "@/components/shared/product/product-images";
const ProductDetailsPage = async (props: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await props.params;
    const product = await getProductBySlug(slug);
    if (!product) {
        return notFound();
    }
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="col-span-2">
                    <ProductImages images={product.images}/>
                </div>
                <div className="col-span-2 p-5">
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-2">
                            <Badge>{product.brand}</Badge>
                            <Badge variant={'outline'}>{product.category}</Badge>
                        </div>
                        <h1 className="h3-bold">
                            {product.name}
                        </h1>
                        <p>{Number(product.rating)} of {product.numReviews} Reviews</p>
                        {/* <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <ProductPrice value={Number(product.price)}/>
                            {product.stock ? (
                                <Badge className="bg-green-500 text-white px-4 py-1 rounded-full">In Stock</Badge>
                            ) : (
                                <Badge className="bg-red-500 text-white px-4 py-1 rounded-full">Out of Stock</Badge>       
                            )}
                        </div> */}
                        <p className="text-sm">{product.description}</p>
                    </div>
                </div>
                <div className="col-span-1 ">
                    <Card className="w-full max-w-sm">
                        <CardContent className="px-4">
                            <div className="flex-between gap-2">
                                <div>Price</div>
                                <div>
                                    <ProductPrice value={Number(product.price)}/>
                                </div>
                            </div>
                            <div className="flex-between  gap-2">
                                <span className="text-xs">
                                    Status
                                </span> 
                                {product.stock ? (
                                    <Badge variant={'outline'}> In Stock</Badge>
                                ): (
                                    <Badge variant={'destructive'}> Out of Stock</Badge>
                                )} 
                            </div>
                            {product.stock > 0 && (
                                <Button className="w-full mt-4">
                                    <Link href={`/product/${product.slug}`}>Add to Cart</Link>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
 
export default ProductDetailsPage;