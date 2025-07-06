import {
    Box,
    Button,
    Flex, IconButton, Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text,
    VStack
} from "@chakra-ui/react";
import {useContext, useState} from "react";
import {IoChevronBackOutline} from "react-icons/io5";
import {MailIcon} from "../assets/icons.jsx";
import Logo from "../assets/logo.png";
import {useNavigate} from "react-router-dom";
import {sendOTP} from "../../api/otp.js";
import toast from "react-hot-toast";
import mainContext from "../context/mainContext.jsx";
import {useInitData} from "@vkruglikov/react-telegram-web-app";


export default function Login() {

    const [emailTextColor, setEmailTextColor] = useState('default')
    const [email, setEmail] = useState('')
    const [endText, setEndText] = useState('@iitk.ac.in')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const [initDataUnsafe, initData] = useInitData();

    const hash_str = initDataUnsafe.hash;
    const chat_id = initDataUnsafe.user.id

    const auth={hash_str:hash_str, chat_id:chat_id, data_check_string:initData}

    // const {auth} = useContext(mainContext)

    return (
        <>
            <Flex direction='column' height='100vh'>


            <div className={'w-screen h-screen'}>
                <IconButton
                    className='absolute top-5 left-5 z-10 bg-none rounded-full '
                    isRound={true}
                    onClick={() => navigate(-1)}
                    variant='solid'
                    aria-label='Done'
                    fontSize='20px'
                    icon={<IoChevronBackOutline/>}
                />
                <div className={'absolute pt-8 top-0 -z-40 w-screen h-84 bg-gradient-to-r from-violet-500 to-purple-500'}>


                </div>
                <div className='my-2'>
                    <Image src={Logo} alt='logo' className='w-1/3 mx-auto'/>
                    {/*<Text className={'text-center text-white font-semibold text-3xl'}>*/}
                    {/*    Welcome to I/O*/}
                    {/*</Text>*/}
                    <p className={'text-center text-white font-normal px-8 text-sm'}>
                        Your IITK community platform for knowledge sharing and attendance tracking.
                    </p>
                </div>
                <div className='mt-10 bg-white drop-shadow-md py-10 pt-8 p-5 mx-auto w-5/6 rounded-lg flex-col flex gap-5 justify-between items-center '>
                    {/*<img src="/backgrounds/logo.png" alt="logo" className='w-1/2 mb-16'/>*/}

                    <VStack spacing={0} mb={4}>
                        <Text className={'text-center text-back font-semibold text-xl'}>
                            Email Verification
                        </Text>
                        <Text className={'text-center text-gray-500 text-xs'}>
                            Enter your IITK email ID.
                        </Text>
                    </VStack>
                    <InputGroup className={'w-2/3'} _focus={{borderColor: 'var(--chakra-colors-gray-200)'}}>
                        <InputLeftElement><MailIcon className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" /></InputLeftElement>
                    <Input
                        fontSize={'sm'}
                        _focus={{borderColor: 'var(--chakra-colors-gray-200)'}}
                        size={'md'}
                        isRequired
                        type="email"
                        spellCheck={false}
                        placeholder="username"
                        textColor={emailTextColor}

                        onChange={(event) => {
                            const e = event.target.value
                            setEmail(e)
                            if (e.includes('@')) {
                                setEndText('')
                                const domain = e.split('@')[1]
                                // console.log(domain)
                                if (domain==='iitk.ac.in' || domain==='iitk.ac.in') {
                                    setEmailTextColor('default')
                                    setIsButtonDisabled(false)
                                }
                                else if ('iitk.ac.in'.includes(domain)) {
                                    setEmailTextColor('default')
                                    setIsButtonDisabled(true)}
                                else {
                                    console.log('invalid')
                                    setEmailTextColor('crimson')
                                    setIsButtonDisabled(true)
                                }
                            } else {
                                setEndText('@iitk.ac.in')
                                setIsButtonDisabled(false)
                                if (e.length === 0) {
                                    setIsButtonDisabled(true)
                                }
                            }


                        }}
                    />
                        <InputRightElement width='7rem' ><p className='text-gray-500 text-sm'>{endText}</p></InputRightElement>
                    </InputGroup>

                    <Button colorScheme='purple' isDisabled={isButtonDisabled} isLoading={isLoading} className={'w-1/2 bg-back'}
                            onClick={() => {
                                console.log(email + endText)
                                if (email) {
                                    setIsLoading(true)
                                    sendOTP(auth, email + endText).then((res) => {
                                        if (res.isSent) {
                                            navigate('/verify-otp')
                                            setIsLoading(false)
                                            toast.success(`OTP sent to ${email + endText}`)
                                        } else if (res.invalid) {
                                            setIsLoading(false)
                                            toast.error('Enter a valid IITK Student Email ID')
                                        } else {
                                            setIsLoading(false)
                                            toast.error('Error sending OTP')
                                        }
                                    }).catch(() => {
                                        setIsLoading(false)
                                        toast.error('Some Error Occurred')
                                    })
                                }
                            }}
                    >Get OTP</Button>


                </div>
                {/*<Button className='absolute top-5 left-5 z-10 bg-none rounded-full ' isIconOnly*/}
                {/*        onClick={() => navigate(-1)}*/}
                {/*>*/}
                {/*    <img src="https://img.icons8.com/ios-filled/50/FAFAFA/expand-arrow--v1.png" alt='arrow'*/}
                {/*         className='rotate-90 w-5 h-5'/>*/}
                {/*</Button>*/}
                {/*<div className={'absolute bottom-0 -z-40 w-screen'}><Wave/></div>*/}

            </div>
            </Flex>
        </>
    );
}