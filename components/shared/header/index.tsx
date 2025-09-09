import Image from "next/image";
import Link from "next/link";
import Navigation from "./navigation";
const Header = () => {
    return (
    <header className="w-full border-b">
        <div className="wrapper flex-between">
            <div className="flex-start">
                <Link href="/" className="flex-start">
                    <Image src="/images/logo.svg" alt="Logo" width="45" height="45" priority={true} />
                    <span className="hidden lg:block font-bold text-2xl ml-3">Shop Co.</span>
                </Link> 
            </div>
            <Navigation />
        </div>
    </header>
    );
}
 
export default  Header;