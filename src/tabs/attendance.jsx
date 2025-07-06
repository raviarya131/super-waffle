import {Avatar, Box, HStack, IconButton, Spinner, Text, VStack} from "@chakra-ui/react";
import AnalysisCard from "../components/analysisCard.jsx";
import {useContext, useEffect, useState} from "react";
import DataContext from "../context/mainContext.jsx";
import {IoReload} from "react-icons/io5";
import {timeAgo} from "../utils/time.js";
import {getAttendance} from "../../api/getAttendance.js";
import toast from "react-hot-toast";
import CustomAvatar from "../components/customAvatar.jsx";
import {useInitData} from "@vkruglikov/react-telegram-web-app";



export default function Attendance() {

    const {attendanceData, setAttendanceData, attendanceFetchedTime, setAttendanceFetchedTime, user} = useContext(DataContext);
    const [loading, setLoading] = useState(true);
    // const {auth} = useContext(DataContext);
    const [fetchedTime, setFetchedTime] = useState(0);
    const [initDataUnsafe, initData] = useInitData();

    const hash_str = initDataUnsafe.hash;
    const chat_id = initDataUnsafe.user.id

    const auth={hash_str:hash_str, chat_id:chat_id, data_check_string:initData}

    // Fetch data on mount
    useEffect(() => {

        // console.log(chat_id, hash_str, data_check_string);
        // If data already exists, no need to fetch again

        console.log('attendanceData', attendanceData)
        if (attendanceData) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            if (!attendanceData) {
                const data = await getAttendance(auth);
                if(!data){
                    toast.error('Error fetching attendance data');
                    setLoading(false);
                    return null;
                }
                setAttendanceData(data);
                setAttendanceFetchedTime(Date.now());

                console.log(loading)
            }

        }
        fetchData();
    }, [attendanceData, fetchedTime]);


    if (loading || !user) {
        return (
            <Box textAlign='center' mt='50%'>
                <Spinner size='xl' />
                <Text fontSize={'lg'}>Loading...</Text>
            </Box>
        )
    }

    if (attendanceData===null) {
        return (
            <Box textAlign='center' mt='50%'>
                <Text fontSize={'lg'}>Error fetching data</Text>
                <IconButton colorScheme='blue' borderRadius='full' aria-label={'Refresh'} icon={<IoReload />} onClick={() => {
                    setLoading(true);
                    setAttendanceData(null);
                    setFetchedTime(Date.now());
                }} />
            </Box>
        )
    }


    return (
        <Box>
            <HStack justify={'space-between'} p={4}>
                <VStack align='start' spacing='0'>
                    <Text fontSize={'xl'} fontWeight={'bold'}>Hello, {user.name}👋</Text>
                    <Text textColor='gray.600' fontSize={'md'}>Welcome to I/O</Text>
                </VStack>
                <CustomAvatar size='md' src={user.avatar} />
            </HStack>
            <HStack spacing='2' px={4} mb='2'>
                <AnalysisCard title='Total Attendance' value={attendanceData["analysis"]['present_classes']}
                              valueLight={`/${attendanceData["analysis"]['total_classes']}`}  bottom='Classes Attended' />
                <AnalysisCard title={'Present Percentage'} value={attendanceData["analysis"]['present_percentage'].toFixed(2)}
                              valueLight={'%'} bottom={`${attendanceData.days[0].replace('-', ' ').substring(0, 6)} - ${attendanceData.days.at(-1).replace('-', ' ').substring(0, 6)}`} />
            </HStack>
            <HStack spacing='2' px={4} mb='4'>
                <AnalysisCard title='Percentile' value={attendanceData["analysis"]['percentile'].toFixed(2)} valueLight='%' bottom='Among your peers' />
                <AnalysisCard title='Current Streak' value={attendanceData["analysis"]['current_streak']} valueLight='&nbsp;Days'
                              bottom={`Highest ${attendanceData["analysis"]['longest_streak']} days`} />
            </HStack>

            <Box className='table-container' display='flex' flexDir='column'>
                <table className='attendance-table'>
                    <thead>
                    <tr>
                        <td>Class Code</td>
                        <td>Total Class</td>
                        <td>Present</td>
                        <td>Present (%)</td>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(attendanceData.courses).map((course) => (<tr key={course}>
                        <td>{course}</td>
                        <td>{attendanceData.courses[course].total}</td>
                        <td>{attendanceData.courses[course].present}</td>
                        <td>{attendanceData.courses[course].presentPercent}</td>
                    </tr>))}
                    </tbody>
                </table>
                {attendanceFetchedTime && <Text fontSize={'sm'} textAlign={'right'} color={'gray.500'} mt={2}>Last updated: {timeAgo(attendanceFetchedTime)}</Text>}
                {/*<Text fontSize={'sm'} textAlign={'right'} color={'gray.500'} mt={2}>Last updated: {timeAgo(fetchedTime)}</Text>*/}



            </Box>
            <IconButton colorScheme='blue' borderRadius='full' position={'absolute'} bottom={100} right={5} aria-label={'Refresh'} icon={<IoReload />} onClick={() => {
                setLoading(true);
                setAttendanceData(null);
            }} />
        </Box>
    )
        ;

}


// response type
// {
//     "days": [
//     "06-Jan-2025",
//     "07-Jan-2025",
//     "08-Jan-2025",
//     "09-Jan-2025",
//     "10-Jan-2025",
//     "13-Jan-2025",
//     "15-Jan-2025",
//     "16-Jan-2025",
//     "17-Jan-2025",
//     "20-Jan-2025",
//     "21-Jan-2025"
// ],
//     "courses": {
//     "ESO201 (G-1)": {
//         "attendance": [
//             "A",
//             "",
//             "A",
//             "P",
//             "P",
//             "P",
//             "P",
//             "A",
//             "P",
//             "P",
//             ""
//         ],
//             "total": "9",
//             "present": "6",
//             "presentPercent": "66.67",
//             "absent": "3",
//             "absentPercent": "33.33"
//     },
//     "EE250 (G-1)": {
//         "attendance": [
//             "",
//             "A",
//             "",
//             "P",
//             "P",
//             "",
//             "P",
//             "A",
//             "P",
//             "",
//             "P"
//         ],
//             "total": "7",
//             "present": "5",
//             "presentPercent": "71.43",
//             "absent": "2",
//             "absentPercent": "28.57"
//     },
//     "SOC173 (G-1)": {
//         "attendance": [
//             "A",
//             "P",
//             "P",
//             "P",
//             "",
//             "P",
//             "A",
//             "P",
//             "",
//             "P",
//             "P"
//         ],
//             "total": "9",
//             "present": "7",
//             "presentPercent": "77.78",
//             "absent": "2",
//             "absentPercent": "22.22"
//     },
//     "AE233M (G-1)": {
//         "attendance": [
//             "",
//             "",
//             "",
//             "",
//             "",
//             "",
//             "",
//             "A",
//             "P",
//             "",
//             "P"
//         ],
//             "total": "3",
//             "present": "2",
//             "presentPercent": "66.67",
//             "absent": "1",
//             "absentPercent": "33.33"
//     },
//     "ESC201 (G-1)": {
//         "attendance": [
//             "",
//             "",
//             "",
//             "",
//             "",
//             "P",
//             "P",
//             "P",
//             "",
//             "P",
//             ""
//         ],
//             "total": "4",
//             "present": "4",
//             "presentPercent": "100",
//             "absent": "0",
//             "absentPercent": "0"
//     }
// }
// }


//         'roll_number': roll_number,
//         'name': name,
//         'total_classes': total_classes,
//         'present_classes': present_classes,
//         'present_percentage': present_percentage,
//         'longest_streak': streak[0],
//         'current_streak': streak[1],
//         'percentile': percentile

