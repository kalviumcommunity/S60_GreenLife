import {createContext,useContext,useState} from "react";

const ContextStore=createContext();

export const ContextProvider=({children})=>{
    const[length,setlength]=useState(0);
    return(
         <ContextStore.Provider value={{length,setlength}}>
            {children}
        </ContextStore.Provider>
    )

}

export const useStoredState=()=>{
    return useContext(ContextStore)
}