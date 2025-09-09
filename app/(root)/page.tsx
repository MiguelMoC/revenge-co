import { getLatestProducts } from "@/lib/actions/product.actions";
import ProductList from "@/components/shared/product/product-list";
export const metadata = {
  title: "Home",
  description: "This is the home"
}

const Home = async () => {
  const latestProducts = await getLatestProducts();

  // Convert rating from Decimal to number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedProducts = latestProducts.map((product: any) => ({
    ...product,
    rating: typeof product.rating === "object" && "toNumber" in product.rating
      ? product.rating.toNumber()
      : Number(product.rating),
  }));
  
  return ( 
    <>
      <ProductList data={mappedProducts} title="Newest Arrivals" limit={6}/>
    </>
   );
}
 
export default Home;