import {useEffect, useState} from "react";
import {VStack, Text, Wrap, Center, Box, Image} from "@chakra-ui/react";
import {LuImagePlus} from "react-icons/lu";
import {IoMdCloseCircle} from "react-icons/io";

export default function ImagePanel({imageUrls, setImageUrls, imageObjects, setImageObjects}) {
    //
    // const [imageUrls, setImageUrls] = useState([]);
    // const [imageObjects, setImageObjects] = useState([]);

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImageUrls((prevImages) => [...prevImages, e.target.result]);
                    setImageObjects((prevImages) => [...prevImages, files[i]]);
                };
                reader.readAsDataURL(files[i]);
        }}

    };


    return(<>
        <VStack pt='8px' spacing='8px' w='100%' h='100%' align='left' p={0} overflowY='auto'>
            {/*<Text fontSize='sm' fontWeight='500' color='text.main'>Image Image</Text>*/}
            <input
                type="file"
                multiple
                accept="image/*"
                id="imageUpload2"
                style={{display: 'none'}}
                onChange={handleImageUpload}
            />
            <Wrap spacing='8px' p='0' overflowY='auto' className='custom-scroll'>
                <Box h='40px' w='40px' borderRadius='4px' bg='gray.100' cursor='pointer'
                     onClick={()=>document.getElementById('imageUpload2').click()}>
                    <Center h='100%'>
                        {/*<Image src={'https://img.icons8.com/external-kmg-design-glyph-kmg-design/64/external-upload-ui-essentials-kmg-design-glyph-kmg-design.png'} h='16px' />*/}
                        <VStack spacing='0' align='center'>
                            <LuImagePlus size={28} />
                        </VStack>
                    </Center>
                </Box>
                {imageUrls && imageUrls.map((url, index) => (<Box position='relative'>
                    <Box position='absolute' top='0' right='0' color='white'
                         onClick={() => {
                             setImageUrls((prevImages) => prevImages.filter((_, i) => i !== index))
                             setImageObjects((prevImages) => prevImages.filter((_, i) => i !== index))
                         }}
                         p='2px' bg='rgba(0,0,0,0.5)' borderRadius='50%' cursor='pointer'>
                        <IoMdCloseCircle />
                    </Box>
                    <Image key={'imageEditor'+index} objectFit="cover" cursor='pointer' p='1px' h='68px' w='68px' borderRadius='4px' src={url}
                           // onClick={() => setSelectedImage(url)}
                           // border={template.design.imageType==='image' && selectedImage === url ? '2px solid #2D9CDB' : 'none'}
                    />
                </Box>))}
            </Wrap>
        </VStack>
    </>)
}

// props for ImagePanel