import {useState, createContext, useEffect} from "react";
import PropTypes from "prop-types";
// import {chat_id2, data_check_string2, hash_str2} from "../assets/dummyData.js";
import {checkSession} from "../../api/session.js";
import {getUser} from "../../api/userApi.js";
import {useInitData} from "@vkruglikov/react-telegram-web-app";

// Create a context to store the user's data
const DataContext = createContext();

// create provider
export const DataProvider = ({children}) => {

    const [initDataUnsafe, initData] = useInitData();

    const hash_str = initDataUnsafe.hash;
    const chat_id = initDataUnsafe.user.id

    const auth={hash_str:hash_str, chat_id:chat_id, data_check_string:initData}

    const [attendanceData, setAttendanceData] = useState(null);
    const [blogsData, setBlogsData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);
    const [attendanceFetchedTime, setAttendanceFetchedTime] = useState(null);
    // const [chat_id, setChatId] = useState(chat_id2);
    // const [hash_str, setHashStr] = useState(hash_str2);
    // const [data_check_string, setDataCheckString] = useState(data_check_string2);
    // const auth = {chat_id: chat_id2, hash_str: hash_str2, data_check_string: data_check_string2};



    // const [auth, setAuth] = useState({chat_id: chat_id2, hash_str: hash_str2, data_check_string: data_check_string2});
    const [user_id, setUserId] = useState(null);



    useEffect(() => {

        const fetchData = async () => {
            const data = await checkSession(auth, chat_id);
            if (data) {
                // setUserData(data);
                setUserId(data.user_id);
                const data2 = await getUser(auth, data.user_id);
                if (data2) {
                    setUser(data2);
                }
            }

        }

        fetchData()

        const data = localStorage.getItem('userData');
        if (data) {
            setUserData(JSON.parse(data));
        } else{
            setUserData(null);
        }
    }, [])

    return (
        <DataContext.Provider value={{attendanceData, setAttendanceData, blogsData, setBlogsData, userData, setUserData,
                                        attendanceFetchedTime, setAttendanceFetchedTime, user_id, setUserId, auth, user, setUser
                                        }}>
            {children}
        </DataContext.Provider>
    )
}

// Export the context
export default DataContext;

// prop validation
DataProvider.propTypes = {
    children: PropTypes.node.isRequired
}