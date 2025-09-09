const ProductPrice = ({ value, className }: { value: number, className?: string }) => {
    const priceValue = Number(value);
    const strValue = priceValue.toFixed(2);
    const [intVal, floatVal] = strValue.split('.');
    return ( 
        <p className={className || 'text-2xl'}>
            <span className="text-xs align-super">$</span>
            {intVal}
            <span className="text-xs align-super">.{ floatVal }</span>
        </p>
     );
}
 
export default ProductPrice;