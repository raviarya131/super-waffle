import {Box, SkeletonCircle, SkeletonText, VStack} from "@chakra-ui/react";
import BlogCard from "../components/blogCard.jsx";
import {useContext, useEffect, useState} from "react";
import {getPosts} from "../../api/posts.js";
import DataContext from "../context/mainContext.jsx";
import {useInitData} from "@vkruglikov/react-telegram-web-app";


export default function Blog() {



    const {user} = useContext(DataContext)
    const [blogs, setBlogs] = useState(null)
    const [initDataUnsafe, initData] = useInitData();

    const hash_str = initDataUnsafe.hash;
    const chat_id = initDataUnsafe.user.id

    const auth={hash_str:hash_str, chat_id:chat_id, data_check_string:initData}


    useEffect(() => {
            console.log('fetching posts')
            const fetchData = async () => {

                if (auth && user) {
                    const data = await getPosts(auth, user.id);
                    if (data) {
                        setBlogs(data);
                    }
                }
            }
            fetchData()
    }, [])

    if (!auth || !user || !blogs) return <>
        <VStack spacing={2} w='100%'>
        <Box padding='6' boxShadow='lg' bg='white' w='100%'>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
        <Box padding='6' boxShadow='lg' bg='white' w='100%'>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
        <Box padding='6' boxShadow='lg' bg='white' w='100%'>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
            <Box padding='6' boxShadow='lg' bg='white' w='100%'>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>

        </VStack>

    </>


    return (

            <VStack spacing={2}>
                {blogs.blogs.map(blog => (
                    <BlogCard key={'blogCard'+blog.id+Math.random()} blog={blog} />
                ))}
            </VStack>
    );
}