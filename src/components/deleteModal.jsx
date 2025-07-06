import {
    Button, IconButton,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {deleteBlog, deleteComment, deleteQuestion} from "../../api/posts.js";
import {useContext} from "react";
import mainContext from "../context/mainContext.jsx";
import PropTypes from "prop-types";
import {useInitData} from "@vkruglikov/react-telegram-web-app";


function DeleteModal({post_type, post_id, postList, setPostList, setCommentCount}) {

    const {userData, setUserData, user} = useContext(mainContext);
    const [initDataUnsafe, initData] = useInitData();

    const hash_str = initDataUnsafe.hash;
    const chat_id = initDataUnsafe.user.id

    const auth={hash_str:hash_str, chat_id:chat_id, data_check_string:initData}


    function handleDelete() {
        if (post_type === 'blog') {
            deleteBlog(auth, post_id, user.id, auth.chat_id).then(data => {
                if (data) {
                    setUserData({...userData, blogs: userData.blogs.filter(blog => blog.id !== post_id)});
                }
            })
        } else if (post_type === 'question') {
            deleteQuestion(auth, post_id, user.id, auth.chat_id).then(data => {
                if (data) {
                    setUserData({...userData, questions: userData.questions.filter(question => question.id !== post_id)});
                }
            })}
            else if (post_type === 'comment') {
                deleteComment(auth, post_id, user.id, auth.chat_id).then(data => {
                    if (data) {
                        setPostList(postList.filter(comment => comment.id !== post_id));
                        if (setCommentCount) {
                            setCommentCount(prev => prev - 1);
                    }
                }})
            }


    }



    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {/*<Button onClick={onOpen}>Open Modal</Button>*/}
            <IconButton variant='ghost' fontSize='14px' h='14px' aria-label={'delete'} icon={<DeleteIcon />} onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose} size='xs'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete {post_type}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p className={'text-back text-lg'}>Are you sure you want to delete this {post_type}?</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={handleDelete}
                            variant="ghost">Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteModal;

// prop types
DeleteModal.propTypes = {
    post_type: PropTypes.string.isRequired,
    post_id: PropTypes.number.isRequired,
    postList: PropTypes.array,
    setPostList: PropTypes.func,
    setCommentCount: PropTypes.func
};