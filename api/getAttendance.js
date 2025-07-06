import {api} from './api';

export const getAttendance = async (auth) => {

    try {
        const response = await api.get(`/attendance/${auth.chat_id}`, {
            headers: {
                hash_str: auth.hash_str,
                data_check_string: auth.data_check_string,
            }
        })
        console.log(response)
        return response.data;
    }
    catch (error) {
        console.error('Error getting attendance:', error);
        return false;
    }
}