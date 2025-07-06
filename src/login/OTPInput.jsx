import {
    Box,
    Button,
    Flex, HStack, IconButton, Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement, Link, PinInput, PinInputField,
    Text,
    VStack
} from "@chakra-ui/react";
import {useContext, useEffect, useState} from "react";
import {IoChevronBackOutline} from "react-icons/io5";
import {MailIcon} from "../assets/icons.jsx";
import Logo from "../assets/logo.png";
import {useNavigate} from "react-router-dom";
import {sendOTP, validateOTP} from "../../api/otp.js";
import mainContext from "../context/mainContext.jsx";
import {toast} from "react-hot-toast";
import {useInitData} from "@vkruglikov/react-telegram-web-app";


export default function OTPInput() {

    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [timer, setTimer] = useState(60)
    const [value, setValue] = useState('')

    const [initDataUnsafe, initData] = useInitData();

    const hash_str = initDataUnsafe.hash;
    const chat_id = initDataUnsafe.user.id

    const auth={hash_str:hash_str, chat_id:chat_id, data_check_string:initData}

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    clearInterval(interval); // Stop the interval when timer reaches zero
                    return prev;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);


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
                    <div
                        className='mt-10 bg-white drop-shadow-md py-10 pt-8 p-5 mx-auto w-5/6 rounded-lg flex-col flex gap-5 justify-between items-center '>
                        {/*<img src="/backgrounds/logo.png" alt="logo" className='w-1/2 mb-16'/>*/}

                        <VStack spacing={0} mb={4}>
                            <Text className={'text-center text-back font-semibold text-xl'}>
                                Email Verification
                            </Text>
                            <Text className={'text-center text-gray-500 text-xs'}>
                                Enter the OTP sent to your email.
                            </Text>
                        </VStack>
                        <HStack>
                            <PinInput onComplete={(value) => {
                                setValue(value)
                                setIsButtonDisabled(false);

                            }}>
                                <PinInputField/>
                                <PinInputField/>
                                <PinInputField/>
                                <PinInputField/>
                            </PinInput>
                        </HStack>

                        <Button colorScheme='purple' isDisabled={isButtonDisabled} isLoading={isLoading}
                                className={'w-1/2 bg-back'}
                                onClick={() => {
                                    setIsLoading(true)
                                    validateOTP(auth, value).then((res) => {
                                            if (res) {
                                                navigate('/vri')
                                            } else {
                                                toast.error('Invalid OTP')
                                                setIsLoading(false)
                                            }
                                        }
                                    )
                                    // setTimeout(() => {
                                    //     setIsLoading(false)
                                    //     navigate('/homepage')
                                    // }, 2000)
                                }}

                        >Verify</Button>
                        <p className={'text-gray-500 text-center'}>Didn&apos;t receive the OTP? <br/>
                            <Link onPress={() => {
                                setIsLoading(true)
                                if (!timer) {
                                    sendOTP(auth, '###').then((res) => {
                                        if (res) {
                                            setTimer(120)
                                            setIsLoading(false)
                                            toast.success('OTP resent.')
                                        } else {
                                            toast.error('Error while sending OTP.')
                                            setIsLoading(false)
                                        }
                                    }).catch(() => {
                                        setIsLoading(false)
                                        toast.error('Error while sending OTP.')
                                    })
                                }
                            }} isDisabled={Boolean(timer)}>
                                Resend OTP {timer ? `in ${timer}s` : 'now'}
                            </Link></p>


                    </div>

                </div>


            </Flex>
        </>
    );
}