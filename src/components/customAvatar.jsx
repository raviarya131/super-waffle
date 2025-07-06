

// a custom avatar component that is built on top of chakra-ui's Avatar component.

import {Avatar, Box, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {RiVerifiedBadgeFill} from "react-icons/ri";
import {BASE_URL} from "../../api/api.js";


export default function CustomAvatar({...props}) {

    // const {src, ...rest} = props;

    // if (src){
    // if (src.startsWith('profilePic')) {
    //     return (
    //         <Avatar {...props} src={`${BASE_URL}cdn/${src}`} />
    //     );
    // }
    // }else{
    //     <Avatar {...props} />
    // }

    return (
            <Avatar {...props} />
    );

}

// prop validation
CustomAvatar.propTypes = {
    src: PropTypes.string.isRequired,
};