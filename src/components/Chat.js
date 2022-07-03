import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import db from '../firebase/firebase'
import './styles/chat.css'
import Message from './Message'
import { useDataLayerValue } from '../appState/StateProvider'

// ICONS 
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'


function Chat() {

    const [roomDetails , setRoomDetails] = useState({})
    const [roomMessages , setRoomMessages] = useState([])
    const [ value , setValue ] = useState('')
    const [{user} , dispatch] = useDataLayerValue()

    const { roomId } = useParams()

    useEffect(() => {
        getDoc(doc(collection(db , 'rooms') , roomId)).then((doc) => {
            if(doc.exists()) {
                setRoomDetails(doc.data())
            }
        }).catch((err) => console.log('Error' , err))

        onSnapshot(query(collection(db , `rooms/${roomId}/messages`) , orderBy('timestamp' , 'asc')) , (snapshot) => {
            const messages = snapshot.docs.map((msg) => {
                return { ...msg.data() , id: msg.id }
            })
            setRoomMessages(messages)
        })

    } , [roomId , roomMessages])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        if(value.length > 0) {
            addDoc(collection(db , `rooms/${roomId}/messages`) , {
                user: user?.displayName ,
                userImg: user?.photoURL,
                message: value,
                timestamp:  new serverTimestamp()
            })
        }
        setValue('')
    }

    return (
        <div className='chat' >
            <div className='chat_header'>
                <div className='chat_header_left'>
                    <h4 className='chat_channel_name'>
                        <strong>#{roomDetails?.name}</strong>
                        <StarBorderOutlinedIcon />
                    </h4>
                </div>
                <div className='chat_header_right'>
                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>
                </div>
            </div>
            <div className='chat_messages'>
                { roomMessages.map(({ user , id , message , userImg , timestamp }) => (
                    <Message 
                        key={ id }
                        user = { user } 
                        timestamp = { timestamp }
                        userImg = { userImg }
                        message = { message }
                        deleteMessage = {() => {
                            deleteDoc(doc(db , `rooms/${roomId}/messages` , id))
                            return id
                        }}
                     />
                )) }
            </div>
            <form onSubmit={handleSubmit} >
                <input 
                    className='message_input' 
                    type={'text'} 
                    placeholder={`Message ${roomDetails?.name} ...`}
                    value={ value }
                    onChange={((e) => setValue(e.target.value) )}
                    />
                <button className='send_button' type={'submit'} onClick={handleSubmit} >SEND</button>
            </form>
        </div>
    )
}

export default Chat