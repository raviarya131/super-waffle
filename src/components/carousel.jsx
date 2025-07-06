// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import {Image} from "@chakra-ui/react";
import {BASE_URL} from "../../api/api.js";
import PropTypes from "prop-types";

export default function BlogCarousel({images}) {
    return (
        <>
            <Swiper pagination={true} autoHeight lazyPreloadPrevNext={2} modules={[Pagination]} className="mySwiper">
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        {/*<Image src={image} fallbackSrc={`${BASE_URL}cdn/${image}`} alt="blog image" objectFit='contain' w='100%' h='auto' />*/}
                        <Image src={image} alt="blog image" objectFit='contain' w='100%' h='auto' />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

// prop validation
BlogCarousel.propTypes = {
    images: PropTypes.array.isRequired,
};