import {BASE_URL} from "./api.js";
import axios from "axios";
import toast from "react-hot-toast";


const api = axios.create({
    baseURL: BASE_URL,
    timeout: 45000, // Set an appropriate timeout
});


export const sendOTP = async (auth, email) => {

    console.log(auth.chat_id, email)
    console.log(auth.chat_id, auth.hash_str, auth.data_check_string)

    try {
        const response = await api.post('/api/send_otp', {chat_id: auth.chat_id.toString(), email:email}, {
            headers: {
                hash_str: auth.hash_str,
                data_check_string: auth.data_check_string,
            }
        });

        // if (response.data.invalid) toast.error('Invalid Email')
        // else if (response.data.isSent) toast.success('OTP Sent to '+email)
        // else toast.error('Error Sending OTP')

        return response.data;

    } // Assuming the backend responds with an 'exists' property

    catch
        (error)
    {
        console.error('Error sending OTP:', error);
        // return false; // Handle error or return appropriate}
        toast.error('Some Error Occurred')
    }
}




export const validateOTP = async (auth, otp) => {
    try {
        const response = await api.post('/api/verify_otp', {chat_id: auth.chat_id.toString(), otp:otp}, {
            headers: {
                hash_str: auth.hash_str,
                data_check_string: auth.data_check_string,
            }
        });

        if (response.data.isVerified) toast.success('OTP Verified')
        else toast.error('Invalid OTP')
        console.log(response.data)

        return response.data.isVerified;
    } // Assuming the backend responds with an 'exists' property

    catch
        (error)
    {
        console.error('Error sending OTP:', error);
        // return false; // Handle error or return appropriate}
        // raise error
        toast.error('Error validating OTP')
        // throw error
    }
}
