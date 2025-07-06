import {useContext, useEffect, useState} from 'react';
import {VStack, Text, Button, Box, Avatar} from "@chakra-ui/react";
import {FaBlog, FaFingerprint, FaPlus} from "react-icons/fa";
import {MdOutlineSettings} from "react-icons/md";
import PropTypes from "prop-types";
import {LuSquarePen} from "react-icons/lu";
import DataContext from "../context/mainContext.jsx";
import CustomAvatar from "./customAvatar.jsx";

function BottomNav({activeTab, setActiveTab}) {

    const {user} = useContext(DataContext);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user) {
            setAvatar(user.avatar);
        }
    }, [user]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);  // Update the active tab when clicked
        console.log(tab);
    };

    return (

        // box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        // box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;

        <div style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 10px 0px'}}
             className="fixed bottom-0 left-0 z-50 w-full h-18 border-t border-gray-200 dark:border-gray-600"
        >
            <div className="grid h-full max-w-lg grid-cols-4 px-3 mx-auto font-medium py-2">
                <Box onClick={() => handleTabClick('attendance')} mt={2}>
                    <VStack gap='4px' color={activeTab==='attendance'?'cyan.900':'gray.700'}>
                        <FaFingerprint size={24} fill='currentColor' />
                        <Text fontSize='12px'>Attendance</Text>
                    </VStack>
                </Box>
                <Box onClick={() => handleTabClick('blogs')} mt={2}>
                    <VStack gap='4px' color={activeTab==='blogs'?'cyan.900':'gray.700'}>
                        <FaBlog size={24} fill='currentColor' />
                        <Text fontSize='12px'>Blogs</Text>
                    </VStack>
                </Box>
                <Box onClick={() => handleTabClick('create')} mt={2}>
                    <VStack gap='4px' color={activeTab==='create'?'cyan.900':'gray.700'}>
                        <LuSquarePen size={24} />
                        <Text fontSize='12px'>Create</Text>
                    </VStack>
                </Box>

                <Box onClick={() => handleTabClick('settings')} mt={2}>
                    <VStack gap='4px' color={activeTab==='settings'?'cyan.900':'gray.700'}>
                        <CustomAvatar size={'xs'} src={avatar} />
                        {/*<MdOutlineSettings size={24} />*/}
                        <Text fontSize='12px'>Profile</Text>
                    </VStack>
                </Box>

            </div>
        </div>
    );
}

export default BottomNav;

// prop validation

BottomNav.propTypes = {
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired
}