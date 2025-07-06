import {Button, IconButton, Image, Text} from "@chakra-ui/react"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Logo from "../assets/logo.png";
import {IoChevronBackOutline, IoChevronForwardOutline} from "react-icons/io5";


export default function Welcome() {

    const navigate = useNavigate()
    const [page, setPage] = useState(0)
    const data = [{
        backgroundImage: '/backgrounds/back2.jpg',
        illustration: '/backgrounds/illustration1.png',
        illustrationSize: 'w-4/5',
        text: <>Find fellow IITK students traveling to the same destinations. Save on fares, enhance safety, and make
            new friends!</>,
    },
        {
            backgroundImage: '/backgrounds/back3.jpg',
            illustration: '/backgrounds/illustrator2.png',
            illustrationSize: 'h-1/5 my-8',
            text: 'Plan your trips seamlessly with IITK Travel Buddy. Set your match preferences to find your ideal travel companion.',
        },
        {
            backgroundImage: '/backgrounds/back4.jpg',
            illustration: '/backgrounds/couple.png',
            illustrationSize: 'w-5/6',
            text: 'Manage your travel plans and connect with fellow travelers to ensure a smooth and enjoyable journey.',

        }]
    console.log(page)

    return (
        <div
            className='flex w-screen h-screen transition-all duration-2000 bg-center bg-gradient-to-r from-violet-500 to-purple-500'>
            <div className='p-5 rounded-lg flex-col flex justify-between items-center '>
                <div className='mt-12 transition-all duration-2000'>
                    <Image src={Logo} alt='logo' className='w-1/2 mx-auto'/>
                    {/*<Text className={'text-center text-white font-semibold text-3xl'}>*/}
                    {/*    Welcome to I/O*/}
                    {/*</Text>*/}
                    {page === 0 && <>
                        <Text fontSize={'3xl'} mb='12px' className={'text-center text-white font-bold px-8'}>Guess
                            What?</Text>
                        <Text mb='48px' className={'text-center text-white font-bold px-4 text-xl'}>
                            Your favorite Attendance Bot just got an upgrade!
                        </Text>
                        <p className={'text-center text-white font-normal px-4 text-base'}>
                            Welcome to the new and improved I/O—where knowledge meets convenience.
                        </p></>}

                    {page === 1 && <>
                        <Text fontSize={'3xl'} mb='12px' className={'text-center text-white font-bold px-8'}>
                            Attendance at Your Fingertips
                        </Text>
                        <Text mb='48px' className={'text-center text-white font-normal px-4 text-base'}>
                            Your attendance, now even faster and easier to access.
                            No more waiting—get instant updates!
                        </Text>
                        {/*<p className={'text-center text-white font-normal px-4 text-base'}>*/}
                        {/*    Find fellow IITK students traveling to the same destinations. Save on fares, enhance safety, and make new friends!*/}
                        {/*</p>*/}
                    </>}
                    {page === 2 && <>
                        <Text fontSize={'3xl'} mb='12px' className={'text-center text-white font-bold px-8'}>More Than
                            Just Attendance</Text>
                        <Text mb='48px' className={'text-center text-white font-normal px-4 text-base'}>
                            Now, it's not just about checking attendance.
                            Ask questions openly or anonymously, share insights through blogs, spark discussions, and give your ideas a voice.
                        </Text>
                        {/*<p className={'text-center text-white font-normal px-4 text-base'}>*/}
                        {/*    Find fellow IITK students traveling to the same destinations. Save on fares, enhance safety, and make new friends!*/}
                        {/*</p>*/}
                    </>}




                </div>


            </div>
            <div
                className='flex justify-between absolute bottom-12 items-center px-4 w-full transition-all ease-soft-spring duration-250'>
                {/*<Button isDisabled={page === 0} className='bg-main rounded-full float'*/}
                {/*        onClick={() => setPage(page - 1)}>*/}
                {/*    <img src="https://img.icons8.com/ios-filled/50/FAFAFA/expand-arrow--v1.png" alt='arrow'*/}
                {/*         className='rotate-90 w-5 h-5'/>*/}
                {/*</Button>*/}
                <IconButton
                    onClick={() => setPage(page - 1)}
                    isDisabled={page === 0}
                    isRound={true}
                    variant='solid'
                    aria-label='Done'
                    fontSize='20px'
                    icon={<IoChevronBackOutline/>}
                />
                {page === 2 ?
                    <Button ml={8} rounded className='ml-4 w-full rounded-full float' onClick={() => navigate('/login')}>Get
                        Started</Button> :
                    <>
                        <div className='flex justify-center'>
                            {data.map((item, index) => (
                                <div key={index}
                                     className={`h-2 w-2 rounded-full ${index === page ? 'bg-white' : 'bg-gray-300'} mx-1`}/>
                            ))}</div>
                        <IconButton
                            onClick={() => setPage(page + 1)}
                            isRound={true}
                            variant='solid'
                            aria-label='Done'
                            fontSize='20px'
                            icon={<IoChevronForwardOutline/>}/>
                        </>
                }
            </div>
        </div>
    )
}