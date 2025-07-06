import {createContext, useState} from "react";
import PropTypes from "prop-types";


const userDataContext = createContext();

export const UserDataProvider = ({children}) => {
    const [userData, setUserData] = useState(null);

    return (
        <userDataContext.Provider value={{userData, setUserData}}>
            {children}
        </userDataContext.Provider>
    )
}

// prop validation
UserDataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};