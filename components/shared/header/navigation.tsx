import { Button } from "@/components/ui/button";
import Toggle from "./theme-toggle";
import { EllipsisVertical, ShoppingCart } from "lucide-react"
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const Navigation = () => {
    return (
        <div className="flex justify-end gap-3 ">
            <nav className="hidden md:flex w full max-w-s gap-1">
                <Toggle />
                <Button asChild variant={`ghost`}>
                    <Link href={`/cart`}>
                        <ShoppingCart/> Cart
                    </Link>
                </Button>
                <Button asChild>
                    <Link href={`/user`}>
                        Sign In
                    </Link>
                </Button>
            </nav>
            <nav className="md:hidden">
                <Sheet>
                    <SheetTrigger className="align-middle">
                        <EllipsisVertical />
                    </SheetTrigger>
                    <SheetContent className="flex flex-col align-start">
                        <SheetTitle></SheetTitle>
                        <Toggle />
                        <Button>
                            <Link href={`/cart`}>
                                <ShoppingCart/>
                            </Link>
                        </Button>
                        <SheetDescription>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis pariatur, quo fuga libero quia quod unde ducimus tenetur asperiores eveniet nulla soluta exercitationem suscipit qui delectus. Quisquam fugit laudantium enim.
                        </SheetDescription>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    );
}
 
export default Navigation;