import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Flex,
    HStack,
    SimpleGrid,
    SkeletonCircle,
    SkeletonText,
    VStack
} from "@chakra-ui/react";
import {RiQuillPenAiFill} from "react-icons/ri";
import {TbMessage2Question} from "react-icons/tb";
import AskQuestionDrawer from "../components/askQuestionDrawer.jsx";
import WriteBlogDrawer from "../components/writeBlogDrawer.jsx";
import Blog from "./blogs.jsx";
import QuestionCard from "../components/questionCard.jsx";
import {useContext, useEffect, useState} from "react";
import {getQuestions} from "../../api/posts.js";
import mainContext from "../context/mainContext.jsx";
import {useInitData} from "@vkruglikov/react-telegram-web-app";


export default function Create() {

    const {user} = useContext(mainContext);
    const [questions, setQuestions] = useState(null);
    const [initDataUnsafe, initData] = useInitData();

    const hash_str = initDataUnsafe.hash;
    const chat_id = initDataUnsafe.user.id

    const auth={hash_str:hash_str, chat_id:chat_id, data_check_string:initData}

    useEffect(() => {
        const fetchData = async () => {
            const questionsData = await getQuestions(auth, user.id);
            if (questionsData) {
                setQuestions(questionsData.questions);
                console.log(questionsData)
            }
        }
        fetchData()
    }, [])

    if (!auth || !user || !questions) return <>
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
        <Flex direction='column' h='100%' position='relative' overflowY='hidden'>
                <HStack w='100vw' px={4} pb={2} justifyContent='center' className='backdrop-blur-lg'>
                    <AskQuestionDrawer setQuestions={setQuestions} questions={questions}/>
                    <WriteBlogDrawer/>
                </HStack>
            <VStack overflowY='auto' spacing={2} flex={1}>
                {questions.map(question => <QuestionCard key={question.id+Math.random()} question={question}/>)}
            </VStack>
        </Flex>
    )
}