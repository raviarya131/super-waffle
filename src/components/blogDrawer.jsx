import {Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay} from "@chakra-ui/react";
import BlogCarousel from "./carousel.jsx";
import {Text} from "@chakra-ui/react";
import PropTypes from "prop-types";


export default function BlogDrawer({isOpen, onClose, blog}) {
    return(
        <>
            <Drawer
                isOpen={isOpen}
                placement="bottom"
                onClose={onClose}
                size='lg'
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>{blog.title}</DrawerHeader>
                        <DrawerBody minH='70vh' maxH='80vh' overflowY='auto' p={6}>

                            <BlogCarousel images={blog.images.map(image=>image.image_url)}/>
                            <Box mt={4}>
                                <Text>{blog.content}</Text>
                            </Box>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

// prop validation
BlogDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
}