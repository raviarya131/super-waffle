import {useEffect} from "react";
import {Spinner} from "@chakra-ui/react";


export default function Verified() {

    useEffect(() => {
        setTimeout(() => {
            window.location.href = '/'
        }, 3000)
    })

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='flex-col items-center justify-center'>
            <Spinner size="lg" color='warning' className='m-auto'/>
            <h1 className='text-back text-2xl m-auto m-auto'>Verified!</h1>
            <p className='text-gray-500'>Redirecting to homepage...</p>
            </div>
        </div>
    // <div className='flex-col justify-center items-center m-auto h-screen w-screen'>
    //     <Spinner color={'warning'} size={'lg'}/>
    //
    //     </div>
    )
}