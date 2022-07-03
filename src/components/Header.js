import React, { useEffect } from "react";
import './styles/header.css'
import { Avatar }  from '@mui/material'
import AccessTimeIcon  from '@mui/icons-material/AccessTime'
import SearchIcon  from '@mui/icons-material/Search'
import HelpOutlineIcon  from '@mui/icons-material/HelpOutline'
import { useDataLayerValue } from "../appState/StateProvider";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Header() {
    const [{user} , dispatch] = useDataLayerValue()
    console.log(user)

    useEffect(() => {
        onAuthStateChanged(auth , (user) => {
            if(!user) {
                dispatch({
                    type: 'SIGN_OUT'
                })
            }
        })
    })
    const logOut = () => {
        signOut(auth).then(() => {
            console.log('signed out')
        })
    }
    return (
        <div className="header">
            <div className="header_left">
                <Avatar className="header_avatar" src="../slack.svg" alt="avatar" />
                <AccessTimeIcon />
            </div>
            <div className="header_search">
                <SearchIcon />
                <input type={'text'} placeholder="Search.." name="search" autoFocus autoComplete="off" />
            </div>
            <div className="header_right">
                <HelpOutlineIcon />
                <div onClick={logOut} >
                    <Avatar className="header_avatar" src={user?.photoURL} alt="user image" />
                </div>
            </div>
        </div>
    )
}

export default Header