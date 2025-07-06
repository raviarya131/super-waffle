import {
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    HStack,
    Spacer, Switch,
    Text,
    Textarea,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {TbMessage2Question} from "react-icons/tb";
import CustomAvatar from "./customAvatar.jsx";
import {postQuestion} from "../../api/posts.js";
import mainContext from "../context/mainContext.jsx";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import {useInitData} from "@vkruglikov/react-telegram-web-app";


export default function AskQuestionDrawer({setQuestions, questions}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const [isAnonymous, setIsAnonymous] = React.useState(false)
    const {user, userData, setUserData} = React.useContext(mainContext);

    const [initDataUnsafe, initData] = useInitData();

    const hash_str = initDataUnsafe.hash;
    const chat_id = initDataUnsafe.user.id

    const auth={hash_str:hash_str, chat_id:chat_id, data_check_string:initData}

    const [question, setQuestion] = React.useState({
        question: '',
        user_id: user.id,
        is_anonymous: isAnonymous
    });

    useEffect(() => {
        setQuestion({...question, is_anonymous: isAnonymous})
    }, [isAnonymous])


    return (
        <>
            <HStack  flex={1} bg='rgba(255,255,255,0.5)' ref={btnRef} onClick={onOpen} justifyContent='center'
                     w='max-content' mt={2} px='12px' spacing={1} h='36px' borderRadius={'full'} borderColor={'gray.400'} borderWidth={1}>
                <TbMessage2Question /><Text fontSize='sm'>Ask Question</Text>
            </HStack>
            {/*<Button  colorScheme='teal' >*/}
            {/*    Open*/}
            {/*</Button>*/}
            <Drawer

                size={'sm'}
                isOpen={isOpen}
                placement='bottom'
                onClose={onClose}
                autoFocus={false}
                blockScrollOnMount={false}
                // finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent borderRadius={'lg'} bg={isAnonymous?'#181818': 'white'}>
                    <DrawerCloseButton />
                    <Text fontSize='1.25rem' color={isAnonymous?'white':'gray.900'} fontWeight='bold' p={2}>Ask Question</Text>
                    <Divider />

                    <DrawerBody minH='80vh' overflowY='auto' p='8px'>
                        <HStack py={4}>
                            <CustomAvatar size={'md'} src={isAnonymous?'https://bit.ly/broken-link':'https://bit.ly/code-beast'} />
                            <VStack align="start" gap='0'>
                                {!isAnonymous && <>
                                    <Text fontWeight="bold" fontSize='14px'>Ravi Arya</Text>
                                    <Text color="gray.500" lineHeight='1' fontSize='12px'>@kumarravi23</Text></>
                                }
                            </VStack>
                            <Spacer />
                            <Text fontSize='sm' color='gray.500'>Anonymous</Text>
                            <Switch size='md' colorScheme='teal' onChange={() => setIsAnonymous(!isAnonymous)} />
                        </HStack>

                        <Textarea value={question.question} onChange={(e) => setQuestion({...question, question: e.target.value})}
                            size='md' h={100} color={isAnonymous?'white':'gray.900'} borderColor={isAnonymous?'rgba(255,255,255,0.2)':'rgba(0,0,0,0.1)'}
                                  variant='unstyled' placeholder='Ask your question here... 🔍 Switch to anonymous mode for privacy. No one will see your identity, but in case of issues, admins may review it if necessary.' />
                        <Divider/>
                        <HStack mt={4}>
                            {isAnonymous && <Text fontSize='sm' color='gray.500'>You are asking anonymously</Text>}
                            <Spacer />
                            <Button px={8} size='sm' colorScheme='teal'
                                    onClick={()=>{
                                        // {toast.loading('Posting Question...')}
                                        postQuestion(auth, question).then(res => {
                                            // console.log(res)
                                            if (res.post_id){
                                                res.question.user = user;
                                                toast.success('Question posted successfully')
                                                setUserData({...userData, questions: [...userData.questions, res.question]})
                                                setQuestions([...questions, res.question])
                                                onClose();
                                            }
                                        })
                                    }}
                                    borderRadius='full'>Ask</Button>
                        </HStack>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </>
    )
}

// prop validation

AskQuestionDrawer.propTypes = {
    setQuestions: PropTypes.func,
    questions: PropTypes.array
}