import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useDataLayerValue } from '../appState/StateProvider'
import { auth, provider } from '../firebase/firebase'
import './styles/login.css'

function Login() {
    const [{ user } , dispatch] = useDataLayerValue()
    const signIn = () => {
        signInWithPopup(auth , provider).then((user) => {
            dispatch({
                type: 'SET_USER',
                user: user.user
            })
        }).catch(err => console.log(err.message))
    }

    console.log(user)
  return (
    <div className='login' >
        <div className='login_container'>
            <img src='../slack.svg' alt='logo' />
            <h1>Sign in to Slack HQ</h1>
            <p>Cleverprogrammer.slack.com</p>
            <Button onClick={signIn} >Sign in with Google</Button>
        </div>
    </div>
  )
}

export default Login