import React , { useContext , createContext , useReducer } from "react";

export const AppDataLayer = createContext(null)

function DataLayer({reducer , initialState , children }) {
    return (
        <AppDataLayer.Provider value={useReducer(reducer , initialState)} >
            { children }
        </AppDataLayer.Provider>
    )
}

export const useDataLayerValue = () => useContext(AppDataLayer)
export default DataLayer;
