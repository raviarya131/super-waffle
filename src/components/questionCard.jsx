import {Avatar, Box, Flex, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import {RiEyeLine} from "react-icons/ri";
import {FaPen} from "react-icons/fa";
import PropTypes from "prop-types";
import WriteBlogDrawer from "./writeBlogDrawer.jsx";
import CustomAvatar from "./customAvatar.jsx";
import {timeAgoShort} from "../utils/time.js";


export default function QuestionCard({question}) {

    // console.log(question)

    return(<>
        <Flex bg='rgba(255,255,255,1)'
            direction='column' key={question.user.username} h='fit-content' gap={0} justify='flex-start'  boxShadow="md" p={4} w="100%">
            <HStack>
                <CustomAvatar src={question.user.avatar} size='sm' />
                <VStack align="start" gap='0'>
                    <Text fontWeight="semibold" fontSize='14px'>{question.user.username}</Text>
                    <Text fontSize='12px' color="gray.500">{timeAgoShort(new Date(question.created_at))}</Text>
                </VStack>
            </HStack>
            <Text mt={2} fontSize="1rem" fontWeight='400'>{question.question}</Text>
            <Stack direction='row' gap={1}>
                {/*<HStack  mt={2} px='8px' spacing={1} h='28px' borderRadius={'full'} borderColor={'gray.400'} borderWidth={1}>*/}
                {/*    <FaPen size={12} color={'#52525b'}/>*/}
                {/*    <Text color="gray.600" mt={'2px'} fontSize='0.75rem'>Answer</Text>*/}
                {/*</HStack>*/}
                <WriteBlogDrawer isAnswer={true} question={question.question} questionId={question.id}/>
                {/*<HStack  mt={2} px='8px' spacing={1} h='28px' borderRadius={'full'} borderColor={'gray.400'} borderWidth={1}>*/}
                {/*    <RiEyeLine size={16} color={'#52525b'}/>*/}
                {/*    <Text color="gray.600" mt={'2px'} fontSize='0.75rem'>{question.views}</Text>*/}
                {/*</HStack>*/}
            </Stack>
        </Flex>
    </>)
}


// prop validation
QuestionCard.propTypes = {
    question: PropTypes.object.isRequired,
};