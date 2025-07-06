
import {api} from './api';

export const getUser = async (auth, user_id) => {

    try {
        const response = await api.get(`/api/user/${user_id}`, {

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


export const getUserData = async (auth, user_id) => {

    try {
        const response = await api.get(`/api/self`, {
            params:{
                chat_id: auth.chat_id.toString(),
                user_id: user_id
            },
            headers: {
                "Content-Type": "application/json",
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

export async function fetchSelf(auth, user_id) {
    const url = `http://172.23.179.185:8000/api/self/?chat_id=${encodeURIComponent(auth.chat_id)}&user_id=${encodeURIComponent(user_id)}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "hash_str": auth.hash_str,
                "data_check_string": auth.data_check_string,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}