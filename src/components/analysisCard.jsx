import './style.css'
import {Box} from "@chakra-ui/react";

export default function analysisCard ({title, value, valueLight, bottom}) {
    return (
        <>
            <Box className='card' flex='1'>
                <div className='card-title'>
                    {title}
                </div>
                <div className='card-value'>
                    {value}
                    <span className='card-value-light'>{valueLight}</span>
                </div>
                <div className='card-bottom'>
                    {bottom}
                </div>
            </Box>
        </>
    )
}