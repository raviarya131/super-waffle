import {Box, Button, HStack, Image, Spacer, Stack, Text, VStack, Avatar, AvatarGroup, Flex} from "@chakra-ui/react";
import React, {useContext, useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {AiOutlineLike, AiFillLike, AiOutlineEye} from "react-icons/ai";
import PropTypes from "prop-types";
import CommentDrawer from "./commentDrawer.jsx";
import {timeAgo, timeAgoShort} from "../utils/time.js"
import BlogCarousel from "./carousel.jsx";
import LikeDrawer from "./likeDrawer.jsx";
import {IoChatbubbleOutline, IoEyeOutline} from "react-icons/io5";
import {RiEyeLine, RiVerifiedBadgeFill} from "react-icons/ri";
import DataContext from "../context/mainContext.jsx";
import {likeBlog, unlikeBlog} from "../../api/posts.js";
import ProfilePopover from "./profilePopover.jsx";
import CustomAvatar from "./customAvatar.jsx";
import {useInitData} from "@vkruglikov/react-telegram-web-app";




export default function BlogCard({blog}){
    const {user} = useContext(DataContext)
    const [initDataUnsafe, initData] = useInitData();

    const hash_str = initDataUnsafe.hash;
    const chat_id = initDataUnsafe.user.id

    const auth={hash_str:hash_str, chat_id:chat_id, data_check_string:initData}



    const [isLiked, setIsLiked] = useState(blog.is_liked)
    const [likeCount, setLikeCount] = useState(blog.like_count)
    const [likes, setLikes] = useState(blog.likes)
    const [isExpanded, setIsExpanded] = useState(false)

    const [showButton, setShowButton] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
            const maxHeight = lineHeight * 3;

            if (textRef.current.scrollHeight > maxHeight) {
                setShowButton(true);
            }
        }
    }, [textRef.current]);

    if (!blog) return <></>


    return (
        <Box key={blog.username + Math.random()} className='blog-card' py={3} w="100%">
            <ProfilePopover user={blog.user}>
            <HStack px={3} data-popover-target={`${user.username}popover`}>
                <CustomAvatar src={blog.user.avatar} height='48px' width='48px'/>

                <VStack align="start" gap='0'>
                    <HStack gap={1}>
                        <Text fontWeight="500" color='gray.900' lineHeight={1.2} fontSize='14px'>{blog.user.name}</Text>
                        {!blog.is_anonymous &&
                        <RiVerifiedBadgeFill size={16} color='#008abf'/>}
                    </HStack>
                    <Text color="gray.500" noOfLines={1} lineHeight={1.2} fontSize='12px'>{blog.user.username} • {blog.user.programme} {blog.user.branch}</Text>
                    <Text color="gray.500" mt={1} lineHeight={1.3}
                          fontSize='12px'>{timeAgoShort(new Date(blog.created_at))}</Text>
                </VStack>
            </HStack>
            {/*<div data-popover id={`${user.username}popover`} role="tooltip"*/}
            {/*     className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">*/}
            {/*</div>*/}
                </ProfilePopover>


                <Text mx={3} mt={2} fontSize="1.125rem" fontWeight='500'>{blog.title}</Text>
                {blog.question &&
                    <Text mx={3} color='gray.500' fontStyle='italic' fontSize="12px" fontWeight='400'> Asked
                        by {blog.question.user.username}</Text>}
                <Text ref={textRef} mx={3} noOfLines={isExpanded ? 0 : 3} mt={0} fontSize="14px"
                      color="gray.700" sx={{whiteSpace: 'pre-line'}}>{blog.content}</Text>
            {showButton &&
                <Button mx={3} onClick={() => setIsExpanded(!isExpanded)} p={0} my={0} mb={2} h='12px' fontSize="12px"
                        colorScheme="blue" size="sm" variant="link">{isExpanded ? 'Read Less' : 'Read More'}</Button>}
                <Box>
                    <BlogCarousel style={{margin: '0 4px 0 4px'}} images={blog.images.map(
                        image => image.image_url)}/>
                </Box>


                <Stack direction='row' gap={1} mx={3}>
                    <HStack mt={2} px='10px' spacing={1} h='28px' borderRadius={'full'} borderColor={'gray.400'}
                            borderWidth={1}>
                        <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 1.3}}>
                            <VStack onClick={() => {
                                if (isLiked) {
                                    setLikeCount(likeCount - 1)
                                    setLikes(likes.filter(like => like.user.name !== user.name))
                                    unlikeBlog(auth, blog.id, user.id)
                                } else {
                                    console.log(user, likes)
                                    setLikeCount(likeCount + 1)
                                    likeBlog(auth, blog.id, user.id)
                                    likes.push({id: 'none', user})
                                }
                                setIsLiked(!isLiked)
                            }}>{isLiked ? <AiFillLike size={18} fill={'#319795'}/> :
                                <AiOutlineLike fill={'#52525b'} size={18}/>}</VStack>
                        </motion.div>
                        {blog && <LikeDrawer blogId={blog.id} likeCount={likeCount}
                                             likes={likes}
                        />}
                        {/*<LikeDrawer blog={blog} blogId={blog.id} isLiked={isLiked}/>*/}
                    </HStack>
                    <CommentDrawer blogId={blog.id} comments_count={blog.comments.length}/>
                    {/*<HStack mt={2} px='8px' spacing={1} h='28px' borderRadius={'full'} borderColor={'gray.400'}*/}
                    {/*        borderWidth={1}>*/}
                    {/*    <RiEyeLine size={16} color={'#52525b'}/>*/}
                    {/*    <Text color="gray.600" mt={'2px'} fontSize='0.75rem'>{blog.views}</Text>*/}
                    {/*</HStack>*/}

                </Stack>
        </Box>
)
}


// prop types
BlogCard.propTypes = {
    blog: PropTypes.object.isRequired
}