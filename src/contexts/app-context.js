import { useState, createContext} from "react";

export const AppContext = createContext();

//we take the props becuase we want access to the children
const AppContextProvider = (props) => {
    //put our state
    const [user, setUser] = useState(false);

    return (
        <AppContext.Provider value={{
            user,
            setUser
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

//default export from file
export default AppContextProvider;