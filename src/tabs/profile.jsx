import {
    Box,
    VStack,
    Text,
    Avatar,
    HStack,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Flex, Image,
    Stack, Skeleton, SkeletonText, Divider, useDisclosure, Square, Icon, IconButton, Spacer
} from "@chakra-ui/react";
import DataContext from "../context/mainContext.jsx";
import React, {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {getUserData} from "../../api/userApi.js";
import {AiFillHome, AiFillLike, AiOutlineLike} from "react-icons/ai";
import {RiEyeLine, RiVerifiedBadgeFill} from "react-icons/ri";
import {BiSolidBookOpen} from "react-icons/bi";
import {MdEdit, MdEmail} from "react-icons/md";
import {timeAgoShort} from "../utils/time.js";
import {motion} from "framer-motion";
import LikeDrawer from "../components/likeDrawer.jsx";
import CommentDrawer from "../components/commentDrawer.jsx";
import PropTypes from "prop-types";
import {likeBlog, unlikeBlog} from "../../api/posts.js";
import BlogDrawer from "../components/blogDrawer.jsx";
import {uploadProfilePic} from "../../api/uploadFile.js";
import {BASE_URL} from "../../api/api.js";
import CustomAvatar from "../components/customAvatar.jsx";
import DeleteModal from "../components/deleteModal.jsx";
import Book from "../assets/book.svg"
import WriteBlogDrawer from "../components/writeBlogDrawer.jsx";
import Question from "../assets/question.svg";
import AskQuestionDrawer from "../components/askQuestionDrawer.jsx";
import {useInitData} from "@vkruglikov/react-telegram-web-app";

// {
//   "name": "Ravi Kumar",
//   "username": "kumarravi23",
//   "address": "gaya, Bihar",
//   "roll_number": "230847",
//   "gender": "Male",
//   "id": "81f9892f-fcdd-4d6d-8845-d3764fc98cfc",
//   "avatar": "https://avatars.dicebear.com/api/avataaars/kumarravi23.svg",
//   "branch": "Economics",
//   "programme": "BS",
//   "joined_at": "2025-02-05T23:40:36.291324"
// }

function handleImageUpload(e, auth, user, setUser) {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
        const toastId = toast.loading('Uploading Image...');
        uploadProfilePic(auth, file, user.id).then((res) => {
            if (res.status === 200) {
                toast.success('Image Uploaded Successfully', {id: toastId})
                setUser({...user, avatar: res.data.image_url})
            } else {
                toast.error('Image Upload Failed', {id: toastId})
            }
        })
    }
}



export default function Profile() {

    const {user_id, user, auth, userData, setUserData, setUser} = useContext(DataContext);


    // console.log(user_id)

    useEffect(() => {

            const fetchData = async () => {

                if (user_id && user && !userData) {
                    const data = await getUserData(auth, user_id);
                    if (data) {
                        setUserData(data);

                    }
                }

            }
            fetchData()
    }, [user_id, user]);


    if (!user_id || !user) {
        return (
            <Box textAlign='center' mt='50%'>
                <Text fontSize={'lg'}>Please login to view your profile</Text>
            </Box>
        )
    }





    return (
        <>
            <Box>
                <VStack pt={8} pb={4} spacing={4} bg='white' m={4} mb={2} className='border-amber-100 drop-shadow-sm rounded-xl'>
                    <Square size='96px' position={'relative'}>
                        <CustomAvatar size={'xl'} name={user.name} src={user.avatar}/>
                        <IconButton
                            onClick={()=>document.getElementById('profile-image').click()}
                            size={'sm'}
                            isRound={true}
                            variant='solid'
                            className='outline-amber-100 shadow-md'
                            colorScheme='gray'
                            aria-label='Done'
                            fontSize='20px'
                            position='absolute'
                            bottom={0}
                            right={0}
                            icon={<MdEdit/>}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            id="profile-image"
                            style={{display: 'none'}}
                            onChange={(e) => handleImageUpload(e, auth, user, setUser)}
                        />
                    </Square>
                    <VStack spacing={0}>
                        <HStack spacing={1}><p className={'text-back font-semibold text-xl'}>{user.name}</p>
                            <RiVerifiedBadgeFill size={20} color='#008abf'/></HStack>
                        <p className={'text-gray-500 text-xs'}>{user.username}</p>
                    </VStack>
                    <VStack p={4} align='flex-start' w={'90%'}
                            className='bg-gradient-to-r from-blue-300 to-purple-300 border-amber-100 drop-shadow-sm rounded-lg'>
                        <HStack><BiSolidBookOpen className={'text-white'} />
                            <p className={'text-white text-sm'}>{user.programme} {user.branch}</p></HStack>
                        <HStack><AiFillHome className={'text-white'} />
                            <p className={'text-white text-sm'}>{user.address}</p></HStack>
                        <HStack><MdEmail className={'text-white'} />
                            <p className={'text-white text-sm'}>{user.username}@iitk.ac.in</p></HStack>
                    </VStack>
                </VStack>
                <Flex className='border-amber-100 drop-shadow-sm rounded-xl bg-white m-4 mt-3' pt={2}>
                    <Tabs variant='unstyled' isFitted w='100%' >
                        <TabList sx={{borderBottom: '1px solid #d5d8dc'}}>
                            <Tab pb={1} fontWeight={500} _selected={{ borderBottom: '2px solid #6495ED', color: '#6495ED'}}>Blogs</Tab>
                            <Tab  pb={1} fontWeight={500} _selected={{ borderBottom: '2px solid #6495ED', color: '#6495ED'}}>Questions</Tab>
                        </TabList>

                        {createTabContent()}
                    </Tabs>
                </Flex>
            </Box>
        </>
    );


    function createTabContent() {

        if (!userData) {
            return (
                <TabPanels>
                    <TabPanel>
                        <Stack spacing={0} mb={8}>
                            <Skeleton height='20px' />
                            <SkeletonText mt={4} noOfLines={3} spacing='2' />
                        </Stack>

                        <Stack spacing={0} mb={8}>
                            <Skeleton height='20px' />
                            <SkeletonText mt={4} noOfLines={3} spacing='2' />
                        </Stack>

                        <Stack spacing={0} mb={8}>
                            <Skeleton height='20px' />
                            <SkeletonText mt={4} noOfLines={3} spacing='2' />
                        </Stack>
                    </TabPanel>
                    <TabPanel>
                        <Stack spacing={0} mb={8}>
                            <Skeleton height='20px' />
                            <SkeletonText mt={4} noOfLines={3} spacing='2' />
                        </Stack>

                        <Stack spacing={0} mb={8}>
                            <Skeleton height='20px' />
                            <SkeletonText mt={4} noOfLines={3} spacing='2' />
                        </Stack>

                        <Stack spacing={0} mb={8}>
                            <Skeleton height='20px' />
                            <SkeletonText mt={4} noOfLines={3} spacing='2' />
                        </Stack>
                    </TabPanel>
                </TabPanels>

            )}

        return (
            <>

                <TabPanels>
                    <TabPanel>
                        {userData.blogs.length===0 &&
                            <VStack p={4} my={8} spacing={2}>
                                <Image mb={8} src={Book} alt='No Blogs' h='100px' objectFit='cover' borderRadius='md'/>
                                <Text textAlign='center' fontSize='md' color='gray.500'>Looks like your book is empty. Why not write one to fill it up!</Text>
                                <WriteBlogDrawer isAnswer={false}/>
                            </VStack>
                        }
                        {userData.blogs.map((blog, index) => {
                            return <SmallBlogCard key={index+876} blog={blog} index={index}/>
                            })}
                    </TabPanel>
                    <TabPanel>
                        {userData.questions.length===0 &&
                            <VStack p={4} my={8} spacing={2}>
                                <Image mb={8} src={Question} alt='No Questions' h='100px' objectFit='cover' borderRadius='md'/>
                                <Text textAlign='center' fontSize='md' color='gray.500'>Hmm! You haven't asked any questions yet. Why not ask one now!</Text>
                                <AskQuestionDrawer/>
                            </VStack>
                        }
                        {userData.questions.map((question, index) => {
                            return <SmallQuestionCard key={index+876} question={question} index={index}/>
                        })}
                    </TabPanel>
                </TabPanels>
            </>
        )
    }
}

function SmallQuestionCard({question, index}){
    return(
        <Box key={index+'smallBlog'+Math.random()} p={4} mb={2} className='bg-gray-100 border-amber-200 rounded-lg shadow-2xs'>
            <HStack>
                <Flex direction='column' w='100%'>
                <Text fontSize={'10px'} color={'gray.500'}>{timeAgoShort(new Date(question.created_at))}</Text>
                <Text fontWeight={500}  fontSize='md' w='90%'>{question.question}</Text>
                </Flex>
                <DeleteModal post_type={'question'} post_id={question.id}/>
            </HStack>

            {/*<Text noOfLines={2} fontSize='sm'>{question.question}</Text>*/}
        </Box>

    )
}

// prop types
SmallQuestionCard.propTypes = {
    question: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}


function SmallBlogCard({blog, index}){
    const [isLiked, setIsLiked] = useState(blog.is_liked)
    const [likeCount, setLikeCount] = useState(blog.like_count)
    const [likes, setLikes] = useState(blog.likes)
    // const {auth} = useContext(DataContext)
    const [initDataUnsafe, initData] = useInitData();

    const hash_str = initDataUnsafe.hash;
    const chat_id = initDataUnsafe.user.id

    const auth={hash_str:hash_str, chat_id:chat_id, data_check_string:initData}

    const {isOpen, onOpen, onClose} = useDisclosure()

    const {user} = useContext(DataContext)

    return (
        <Box key={index+'smallBlog'+Math.random()} p={4} mb={2} className='bg-gray-100 border-amber-200 rounded-lg shadow-2xs'>
            <Box _active={{
                bg: 'rgba(0,0,0,0.02)', // Change background when tapped
                transform: "scale(0.97)", // Slightly shrink on tap
                transition: "transform 0.5s",
            }}
                 onClick={onOpen}
                  w='100%' >
                <BlogDrawer isOpen={isOpen} onClose={onClose} blog={blog}/>
                <Text fontSize={'10px'} color={'gray.500'}>{timeAgoShort(new Date(blog.created_at))}</Text>
                <HStack>
                    <VStack align='start' spacing={0}>
                        <Text fontWeight={500} noOfLines={1} fontSize='lg'>{blog.title}</Text>
                        <Text noOfLines={2} fontSize='sm'>{blog.content}</Text>
                    </VStack>
                    {blog.images && blog.images.length>0 &&
                        <Image src={blog.images[0].image_url} alt={blog.title} w='100px' h='72px' objectFit='cover' borderRadius='md'/>
                        // <Image src={BASE_URL+'cdn/'+blog.images[0].image_url} alt={blog.title} w='100px' h='72px' objectFit='cover' borderRadius='md'/>
                    }
                </HStack>
            </Box>

            <Divider mt={2} sx={{borderColor:'rgba(0,0,0,0.2)'}}/>
            <Stack direction='row' gap={1} >
                <HStack  mt={2} px='10px' spacing={1} h='28px' borderRadius={'full'} borderColor={'gray.400'} borderWidth={1}>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.3 }}>
                        <VStack onClick={()=>{
                            if(isLiked){
                                setLikeCount(likeCount-1)
                                setLikes(likes.filter(like => like.user.name !== user.name))
                                unlikeBlog(auth, blog.id, user.id)
                            }else{
                                console.log(user, likes)
                                setLikeCount(likeCount+1)
                                likeBlog(auth, blog.id, user.id)
                                likes.push({id: 'none', user})
                            }
                            setIsLiked(!isLiked)}}>{isLiked?<AiFillLike size={18} fill={'#319795'}/>:<AiOutlineLike fill={'#52525b'} size={18}/>}</VStack>
                    </motion.div>
                    {blog && <LikeDrawer blogId={blog.id} likeCount={likeCount}
                                        likes={likes}
                                />}

                    {/*<LikeDrawer blog={blog} blogId={blog.id} isLiked={isLiked}/>*/}
                </HStack>
                <CommentDrawer blogId={blog.id} comments_count={blog.comments.length}/>
                {/*<HStack mt={2} px='8px' spacing={1} h='28px' borderRadius={'full'} borderColor={'gray.400'} borderWidth={1}>*/}
                {/*    <RiEyeLine size={16} color={'#52525b'}/>*/}
                {/*    <Text color="gray.600" mt={'2px'} fontSize='0.75rem'>{blog.views}</Text>*/}
                {/*</HStack>*/}
                <Spacer/>
                <Box p={2}><DeleteModal post_type={'blog'} post_id={blog.id}/></Box>


            </Stack>
        </Box>
    )
}


// prop types
SmallBlogCard.propTypes = {
    blog: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}