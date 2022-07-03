import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import db from '../firebase/firebase'
import './styles/sidebarOption.css'

// ICONS
import DeleteIcon from '@mui/icons-material/Delete'

function SidebarOption({Icon , title , id , addChannelOption , deleteChannel }) {

  const navigate = useNavigate()

  const selectChannel = () => {
    if(id) {
      navigate(`/room/${id}`)
    }else {
      navigate(title)
    }
  }

  const addChannel = () => {
    const channelName = prompt('Please enter channel name')

    if(channelName) {
      addDoc(collection(db , 'rooms') , {
        name: channelName,
      })
    }
  }

  return (
    <div className='sidebar_option' onClick={addChannelOption ? addChannel : selectChannel} >
        {Icon && <Icon className="sidebar_option_icon" />}
        {Icon ? (
            <h3>{title}</h3>
        ) : 
        <h3 className='sidebar_option_channel' style={{height: '40px' , marginLeft: '10px'}} >
            <span className='sidebar_option_hash'>#</span> {title}
            <div onClick={deleteChannel} ><DeleteIcon /></div>
        </h3>
        }
    </div>
  )
}

export default SidebarOption