import {Toaster} from "react-hot-toast";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./login/login.jsx";
import App from "./App.jsx";
import Welcome from "./login/welcome.jsx";
import OTPInput from "./login/OTPInput.jsx";
import {useEffect, useState} from "react";
import {checkSession} from "../api/session.js";
import Verified from "./login/verified.jsx";
import {hash_str2, data_check_string2} from "./assets/dummyData.js";
import { useInitData } from '@vkruglikov/react-telegram-web-app';




export default function Redirects() {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [loading, setLoading] = useState(true)
    // const chat_id = '123456789'
    // const auth = {chat_id: chat_id, hash_str: hash_str2, data_check_string: data_check_string2}

    const [initDataUnsafe, initData] = useInitData();

    const hash_str = initDataUnsafe.hash;

    if(!initData.Unsafe.user){
        console.log('not telegram')
        return <Login/>
    }
    const chat_id = initDataUnsafe.user.id

    const auth={hash_str:hash_str, chat_id:chat_id, data_check_string:initData}


    // const [initDataUnsafe] = useInitData();
    // const [initDataUnsafe, initData] = useInitData();




    useEffect(() => {
        window.Telegram.WebApp.requestFullscreen();
        window.Telegram.WebApp.lockOrientation();


        checkSession(auth, chat_id).then((data) => {
            console.log(data, 'data')
            if (data.user_id) {
                setIsAuthorized(true)
                setLoading(false)

            }
            else{
                setIsAuthorized(false)
                setLoading(false)
            }
        })
    },[])

    if (loading) return <div>Loading...</div>


    return (
        <Router>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={isAuthorized?<App/>:<Welcome/>} />
                <Route path="/verify-otp" element={<OTPInput/>} />
                <Route path={'/vri'} element={<Verified/>} />
            </Routes>
        </Router>
    )
}
