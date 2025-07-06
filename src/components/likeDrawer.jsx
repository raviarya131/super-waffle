import {
    Avatar, AvatarGroup,
    Divider,
    Drawer, DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay, Flex, SkeletonCircle, SkeletonText, Text,
    useDisclosure, VStack
} from "@chakra-ui/react";
import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {getBlogLikes} from "../../api/posts.js";
import mainContext from "../context/mainContext.jsx";
import CustomAvatar from "./customAvatar.jsx";
import {useInitData} from "@vkruglikov/react-telegram-web-app";

export default function LikeDrawer({blogId, likes, likeCount}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()




    return (
        <>
        <Flex ref={btnRef} onClick={onOpen} gap={'2px'}>
            <AvatarGroup spacing={'-0.5rem'} size='2xs' max={3} >
                {likes.map(like => (
                    <CustomAvatar borderWidth='0.5px' borderColor='transparent' key={like.user.username+Math.random()} name={like.user.name} src={like.user.avatar} />
                ))}
            </AvatarGroup>
            {likes && likes.length>0 && <Text color="gray.600" mt={'2px'} fontSize='0.75rem'>{likeCount}</Text>}
            {/*<Text color="gray.600" mt={'2px'} fontSize='0.75rem'>+{likes.count+isLiked}</Text>*/}
        </Flex>
            {isOpen && <OpenDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} blogId={blogId} isLiked/>}
        {/*<OpenDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} blogId={blogId} isLiked/>*/}
        </>
    )
}


function OpenDrawer({isOpen, onClose, blogId}) {

    const [likes, setLikes] = React.useState(null)
    // const {auth} = useContext(mainContext)
    const [initDataUnsafe, initData] = useInitData();

    const hash_str = initDataUnsafe.hash;
    const chat_id = initDataUnsafe.user.id

    const auth={hash_str:hash_str, chat_id:chat_id, data_check_string:initData}

    useEffect(() => {
        // console.log('blogId', blogId, 'fetching likes')
        const fetchData = async () => {

            if (blogId) {
                const data = await getBlogLikes(auth, blogId);
                // console.log('likes', data)
                if (data) {
                    setLikes(data);
                }
            }
        }
        fetchData()
    }, []);

    return(

        <Drawer
            size={'sm'}
            isOpen={isOpen}
            placement='bottom'
            onClose={onClose}
            autoFocus={false}
            blockScrollOnMount={false}
            // finalFocusRef={btnRef}
        >
            <DrawerOverlay/>
            <DrawerContent borderRadius={'lg'}>
                <DrawerCloseButton/>
                <Text fontSize='1.25rem' fontWeight='bold' p={2}>Likes</Text>
                <Divider/>

                <DrawerBody maxH='40vh' overflowY='auto' p='8px'>
                    <LikeBody likes={likes}/>

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}


function LikeBody({likes}) {

    // console.log('like', likes, typeof likes)

    if (!likes) {
        return (<>
                <Flex gap='8px' mb='4px' direction='row' borderRadius="md" p={2} w="100%">
                    <SkeletonCircle size="36px" isLoaded={false}/>
                    <SkeletonText mt="4" noOfLines={1} w='20%' spacing="4" />
                </Flex>
                <Flex gap='8px' mb='4px' direction='row' borderRadius="md" p={2} w="100%">
                    <SkeletonCircle size="36px" isLoaded={false}/>
                    <SkeletonText mt="4" noOfLines={1} w='20%' spacing="4" />
                </Flex>
            </>
        )
    }

    return (<>
    {likes.likes.map(like => (
        <><Flex gap='4px' mb='4px' direction='column' key={like.username+'like'} borderRadius="md" p={2} w="100%">
            <Flex direction={'row'} gap='8px'>
                <CustomAvatar src={like.avatar} size='md'/>
                <VStack align="start" gap='0'>
                    <Text fontWeight="600" color="gray.600" fontSize='14px'>{like.username}</Text>
                    <Text fontWeight="400" color="gray.500" fontSize='14px'>{like.name}</Text>
                </VStack>
            </Flex>
            {/*<Divider/>*/}

        </Flex>
        </>
    ))}</>
)

}



// prop validation

LikeDrawer.propTypes = {
    blogId: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    likeCount: PropTypes.number.isRequired
}

// prop validation
OpenDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    blogId: PropTypes.string.isRequired
}

// prop validation
LikeBody.propTypes = {
    likes: PropTypes.object.isRequired
}