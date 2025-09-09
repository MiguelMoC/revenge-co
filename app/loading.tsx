import Image from "next/image";
const LoadingPage = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw'
        }}                              >
            <Image src="/images/loader.gif" height={150} width={150} className="w-16" alt="Loading..." />
        </div>
    )
}
 
export default LoadingPage;