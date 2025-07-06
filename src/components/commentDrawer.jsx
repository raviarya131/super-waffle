import {
    Avatar,
    Button, Divider,
    Drawer, DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerFooter,
    DrawerOverlay, Flex, HStack, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Spacer, Text,
    useDisclosure, VStack
} from "@chakra-ui/react";
import React, {useContext, useEffect} from "react";
import {IoChatbubbleOutline} from "react-icons/io5";
import PropTypes from "prop-types";
import {timeAgo, timeAgoShort} from "../utils/time.js";
import {addBlogComment, getBlogComments, getBlogLikes} from "../../api/posts.js";
import mainContext from "../context/mainContext.jsx";
import CustomAvatar from "./customAvatar.jsx";
import DeleteModal from "./deleteModal.jsx";

export default function CommentDrawer({blogId, comments_count}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const [commentCount2, setCommentCount2] = React.useState(comments_count);




    return (
        <>
            <HStack ref={btnRef} onClick={onOpen} mt={2} px='10px' spacing={1} h='28px' borderRadius={'full'} borderColor={'gray.400'} borderWidth={1}>
                <IoChatbubbleOutline size={16} color={'#52525b'}/>
                <Text color="gray.600" mt={'2px'} fontSize='0.75rem'>{commentCount2}</Text>
            </HStack>
            {isOpen && <CommentDrawerContent blogId={blogId} isOpen={isOpen} onClose={onClose} setCommentCount={setCommentCount2}/>}

        </>
    )
}

function CommentDrawerContent({ blogId, isOpen, onClose, setCommentCount }) {
    const [comments, setComments] = React.useState(null);
    const { auth, user } = useContext(mainContext);
    const [commentValue, setCommentValue] = React.useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (blogId) {
                const data = await getBlogComments(auth, blogId);
                if (data) {
                    setComments(data.comments);
                }
            }
        };
        fetchData();
    }, [blogId]); // Add blogId to the dependency array

    if (!comments) return <></>;

    return (
        <Drawer
            size={'sm'}
            isOpen={isOpen}
            placement='bottom'
            onClose={onClose}
            autoFocus={false}
            blockScrollOnMount={false}
        >
            <DrawerOverlay />
            <DrawerContent borderRadius={'lg'}>
                <DrawerCloseButton />
                <Text fontSize='1.25rem' fontWeight='bold' p={2}>Comments</Text>
                <Divider />

                <DrawerBody maxH='40vh' overflowY='auto' p='8px'>
                    {comments.map(comment => (
                        <Flex gap='12px' mb='8px' direction='column' key={comment.id} borderRadius="md" p={2} w="100%">
                            <Flex direction={'row'} gap='8px'>
                                <CustomAvatar src={comment.user.avatar} height='36px' width='36x' />
                                <VStack align="start" gap='0'  w='100%'>
                                    <HStack w='95%'>
                                        <Text fontWeight="450" color="gray.900" fontSize='14px'>{comment.user.username}</Text>
                                        <Text fontSize='12px' color="gray.400">{timeAgoShort(new Date(comment.created_at))}</Text>
                                        <Spacer/>
                                        {comment.user.id===user.id &&
                                            <DeleteModal postList={comments} setPostList={setComments}
                                                         setCommentCount={setCommentCount}
                                            post_type={'comment'} post_id={comment.id}/>}
                                    </HStack>
                                    <Text fontSize='14px' color="gray.600" lineHeight='1.4'>{comment.comment}</Text>
                                </VStack>
                            </Flex>
                        </Flex>
                    ))}
                </DrawerBody>

                <DrawerFooter px='8px'>
                    <InputGroup>
                        <InputLeftElement>
                            <CustomAvatar size='sm' src={user.avatar} />
                        </InputLeftElement>
                        <Input
                            _focus={{ borderColor: 'var(--chakra-colors-gray-200)' }}
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            borderRadius='full'
                            placeholder="Add a comment"
                        />
                        <InputRightElement width='4rem'>
                            <Button
                                onClick={() => {
                                    addBlogComment(auth, blogId, user.id, commentValue).then(data => {
                                        setComments([...comments, data.comment]);
                                        setCommentValue(''); // Clear the input after posting
                                        setCommentCount(comments.length + 1);
                                    });
                                }}
                                borderRadius='full'
                                colorScheme="teal"
                                size="sm"
                                isDisabled={commentValue.length === 0}
                            >
                                Post
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}



// prop validation

CommentDrawer.propTypes = {
    blogId: PropTypes.string.isRequired,
    comments_count: PropTypes.number.isRequired
}

CommentDrawerContent.propTypes = {
    setCommentCount: PropTypes.func.isRequired,
    blogId: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}