// This file is used to upload the chat files and images to the server using axios

import {BASE_URL} from "./api.js";
import axios from "axios";
import toast from "react-hot-toast";


const api = axios.create({
    baseURL: BASE_URL,
    timeout: 45000, // Set an appropriate timeout
});

const uploadFiles = async (auth, formData) => {
    try {
        // console.log('Files uploaded successfully:', response);
        return await api.post('/create_blog', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                hash_str: auth.hash_str,
                data_check_string: auth.data_check_string,
            },

        }); // Return the response here
    } catch (error) {
        console.error('Error uploading files:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

export const handleUpload = async (auth, user_id, blog, files) => {
    try {
        const formData = new FormData();

        // Loop over selected files and append them to FormData
        Array.from(files).forEach((file) => {
            formData.append('files', file); // 'files' is the key for multiple files
        });

        formData.append('user_id', user_id);
        formData.append('title', blog.title);
        formData.append('content', blog.content);
        formData.append('is_anonymous', blog.is_anonymous);
        formData.append('question_id', blog.question_id);

        // Upload files to the server
        const res = await uploadFiles(auth, formData);
        // console.log(res)
        console.log('abra', res.data)
        return res.data;

        // setResponse(res.data);
    } catch (error) {
        console.error('Error uploading files:', error);
    }
};


// upload profile pic
export const uploadProfilePic = async (auth, image, user_id) => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('user_id', user_id);

        return await api.post('/api/upload_profile_pic', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                hash_str: auth.hash_str,
                data_check_string: auth.data_check_string,
            },
        });
    } catch (error) {
        console.error('Error uploading profile pic:', error);
        toast.error('Error uploading profile pic');
    }
};