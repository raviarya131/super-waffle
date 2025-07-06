


// a popover that shows the user's profile. it has children that are the trigger for the popover. it also has a prop

import {
    Avatar, HStack,
    Popover,
    PopoverArrow, PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger, Portal, VStack
} from "@chakra-ui/react";
import {RiVerifiedBadgeFill} from "react-icons/ri";
import {BiSolidBookOpen} from "react-icons/bi";
import {AiFillHome} from "react-icons/ai";
import {MdEmail} from "react-icons/md";
import PropTypes from "prop-types";
import CustomAvatar from "./customAvatar.jsx";

export default function ProfilePopover({user, children}) {
    return (
        <Popover position='absolute'>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <Portal>
            <PopoverContent>
                <PopoverArrow />
                {/*<PopoverCloseButton />*/}
                <PopoverBody>
                    <VStack>
                    <CustomAvatar size={'xl'} name={user.name} src={user.avatar} />
                    <VStack spacing={0}>
                        <HStack spacing={1} ><p className={'text-back font-semibold text-xl'}>{user.name}</p>
                            <RiVerifiedBadgeFill size={20} color='#008abf'/></HStack>
                        <p className={'text-gray-500 text-xs'}>{user.username}</p>
                    </VStack>
                    <VStack p={4} align='flex-start' w={'90%'}
                            className='bg-gradient-to-r from-blue-300 to-purple-300 border-amber-100 drop-shadow-sm rounded-lg'>
                        <HStack><BiSolidBookOpen className={'text-white'} />
                            <p className={'text-white text-sm'}>{user.programme} {user.branch}</p></HStack>
                        <HStack><MdEmail className={'text-white'} />
                            <p className={'text-white text-sm'}>{user.username}@iitk.ac.in</p></HStack>
                    </VStack>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
            </Portal>
        </Popover>
    );
}


// prop validation
ProfilePopover.propTypes = {
    user: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
};
