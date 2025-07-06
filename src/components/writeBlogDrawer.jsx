import {
    Avatar,
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay, Flex,
    HStack, Input,
    Spacer, Switch,
    Text,
    Textarea,
    useDisclosure, VStack,
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ImagePanel from "./fileUpload.tsx";
import {RiQuillPenAiFill} from "react-icons/ri";
import {FaPen} from "react-icons/fa";
import {handleUpload} from "../../api/uploadFile.js";
import mainContext from "../context/mainContext.jsx";
import toast from "react-hot-toast";
import CustomAvatar from "./customAvatar.jsx";
import {useInitData} from "@vkruglikov/react-telegram-web-app";



export default function WriteBlogDrawer({isAnswer=false, question='', questionId=null}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [imageUrls, setImageUrls] = useState([]);
    const [imageObjects, setImageObjects] = useState([]);
    const [isAnonymous, setIsAnonymous] = React.useState(false)
    const {user, userData, setUserData} = React.useContext(mainContext);
    const [loading, setLoading] = React.useState(false);

    const [initDataUnsafe, initData] = useInitData();

    const hash_str = initDataUnsafe.hash;
    const chat_id = initDataUnsafe.user.id

    const auth={hash_str:hash_str, chat_id:chat_id, data_check_string:initData}

    const [blog, setBlog] = React.useState({
        title: '',
        content: '',
        question_id: questionId,
        user_id: user.id,
        is_anonymous: isAnonymous
    });

    useEffect(() => {
        setBlog({...blog, is_anonymous: isAnonymous})
    }, [isAnonymous])

    return (
        <>
            {isAnswer?
                <HStack ref={btnRef} onClick={onOpen} mt={2} px='8px' spacing={1} h='28px'
                        borderRadius={'full'} borderColor={'gray.400'} borderWidth={1}>
                    <FaPen size={12} color={'#52525b'}/>
                    <Text color="gray.600" mt={'2px'} fontSize='0.75rem'>Answer</Text>
                </HStack>:
                <HStack flex={1} bg='rgba(255,255,255,0.5)' ref={btnRef} onClick={onOpen} justifyContent='center'
                        mt={2} px='12px' spacing={1} h='36px' borderRadius={'full'} borderColor={'gray.400'} borderWidth={1}>
                    <RiQuillPenAiFill size={12} /> <Text fontSize='sm'>Write Blog</Text>
                </HStack>
            }
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
                    <Text fontSize='1.25rem' color={isAnonymous?'white':'gray.900'} fontWeight='bold' p={2}>Write Blog</Text>
                    <Divider />

                    <DrawerBody minH='80vh' overflowY='auto' p='8px'>
                        <HStack py={4}>
                            <CustomAvatar size={'md'} src={isAnonymous?'https://bit.ly/broken-link':user.avatar} />
                            <VStack align="start" gap='0'>
                                {!isAnonymous && <>
                                    <Text fontWeight="bold" fontSize='14px'>{user.name}</Text>
                                    <Text color="gray.500" lineHeight='1' fontSize='12px'>{user.username}</Text></>
                                }
                            </VStack>
                            <Spacer />
                            <Text fontSize='sm' color='gray.500'>Anonymous</Text>
                            <Switch size='md' colorScheme='teal' onChange={() => setIsAnonymous(!isAnonymous)} />
                        </HStack>
                        <VStack>
                            <Textarea color={isAnonymous?'white':'gray.900'}
                                        onChange={(e) => setBlog({...blog, title: e.target.value})}
                                      value = {question?`Answer to: ${question}`:blog.title}
                                      disabled={isAnswer}
                                      _focus={{borderColor: 'var(--chakra-colors-gray-200)'}}
                                      borderColor={isAnonymous?'rgba(255,255,255,0.2)':'rgba(0,0,0,0.1)'} colorScheme={'teal'} placeholder='Title' />
                            <Textarea onChange={(e) => setBlog({...blog, content: e.target.value})}
                                h={200} color={isAnonymous?'white':'gray.900'}  _focus={{borderColor: 'var(--chakra-colors-gray-200)'}}
                                      borderColor={isAnonymous?'rgba(255,255,255,0.2)':'rgba(0,0,0,0.1)'}
                                      placeholder='Write your blog here... 🔍 Switch to anonymous mode for privacy. No one will see your identity, but in case of issues, admins may review it if necessary.' />
                        </VStack>
                        {/*<Divider />*/}
                        <Flex direction={'row'} gap={4} mt={4} color={isAnonymous?'gray.400':'gray.600'}>
                            {/*<LuImagePlus size={28} />*/}
                            <ImagePanel imageObjects={imageObjects} imageUrls={imageUrls}
                                        setImageObjects={setImageObjects} setImageUrls={setImageUrls}
                            />
                            {/*<FileInput fileList={[]} onChange={console.log}/>*/}
                            {/*{isAnonymous && <Text fontSize='sm' color='gray.500'>You are asking anonymously</Text>}*/}
                            <Spacer />
                            <Button
                                isLoading={loading}
                                onClick={() => {
                                    console.log('clicked')
                                    setLoading(true)
                                    // console.log(blog)
                                    handleUpload(auth, user.id, blog, imageObjects).then((data) => {
                                        // console.log(data);
                                        if (data.uploaded){
                                            toast.success('Blog posted successfully');
                                            console.log(data.blog)
                                            if (userData) setUserData({...userData, blogs: [data.blog, ...userData.blogs]});
                                            setLoading(false);
                                            onClose();

                                        }
                                        else{
                                            toast.error('Error posting blog');
                                            setLoading(false);
                                        }
                                    });
                                }}
                                px={8} size='sm' colorScheme='teal' borderRadius='full'>Post</Button>
                        </Flex>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </>
    )
}

// prop validation

WriteBlogDrawer.propTypes = {
    isAnswer: PropTypes.bool,
    question: PropTypes.string,
    questionId: PropTypes.string
}