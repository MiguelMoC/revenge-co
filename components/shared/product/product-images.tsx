
'use client'
import { useState } from "react";
import Image from "next/image";
const ProductImages = ({ images }: { images: string[] }) => {
    const [currentImage, setCurrentImage] = useState(0);
    return ( 
    <>
        <div className="space-y-4">
            <Image
                src={images[currentImage]}
                alt={`Product Image ${currentImage + 1}`}
                height={500}
                width={500}
                className="w-full h-auto object-cover object-center"
            />
        </div>
        <div className="flex gap-1">
            {images.map((img, index) => (
                <div 
                    key={index  }
                    className={`border ${index === currentImage ? 'border-amber-500 border-2' : 'border-transparent'} rounded-sm p-1 cursor-pointer hover:border-amber-500`}
                    onClick={() => setCurrentImage(index)}
                >
                    <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        height={100}
                        width={100}
                        className="w-20 h-20 object-cover object-center"
                    />
                </div>
            ))}
        </div>
     </>
     );
}
 
export default ProductImages;