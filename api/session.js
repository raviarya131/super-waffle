
import {api} from './api';

export const checkSession = async (auth, chat_id) => {

    try {
        const response = await api.post(`/api/check_session`,{chat_id:chat_id.toString()}, {
            headers: {
                hash_str: auth.hash_str,
                data_check_string: auth.data_check_string,
            }

        })
        console.log(response)
        return response.data;
    }
    catch (error) {
        console.error('Error getting session', error);
        return false;
    }
}