import BottomNav from "./components/navbar.jsx";
import Blog from "./tabs/blogs.jsx";
import {Box, Flex} from "@chakra-ui/react";
import {useContext, useState} from "react";
import Attendance from "./tabs/attendance.jsx";
import Create from "./tabs/create.jsx";
import Profile from "./tabs/profile.jsx";
import Logo2 from "./assets/logo3.png";
import {DataProvider} from "./context/mainContext.jsx";

function App() {
    const [activeTab, setActiveTab] = useState('attendance');  // Default active tab is 'attendance'



    return (
        <>
            <DataProvider>
            <Flex direction='column' height='100vh' style={{background: "linear-gradient(-225deg, #fbcffb 0%, hsl(188.86deg 80.97% 80.97%) 100%)"}}>
                <Box textAlign='center' mt='32px' h={'54px'} p='4'>
                    <img src={Logo2} alt='logo' className='w-[24px] mx-auto'/>
                    {/*<Box fontSize='xl'>App</Box>*/}
                </Box>
                <Box flex='1' overflowY='auto' mb='72px'>
                    {/* Render the active tab */}
                    {activeTab === 'attendance' && <Attendance/>}
                    {activeTab === 'blogs' && <Blog/>}
                    {activeTab === 'create' && <Create/>}
                    {activeTab === 'settings' && <Profile/>}
                </Box>
                <BottomNav activeTab={activeTab} setActiveTab={setActiveTab}/>
            </Flex>
            </DataProvider>
        </>
    )
}

export default App