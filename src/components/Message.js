import Delete from '@mui/icons-material/Delete'
import React from 'react'
import './styles/message.css'

function Message({ message , timestamp , user , userImg , deleteMessage }) {

  return (
    <div className='message' >
        <img src={ userImg } alt='' />
        <div className='message_info' >
            <h4>
                { user } <span className='message_timestamp' >{ timestamp?.toDate().toUTCString() }</span>
            </h4>
            <p>{ message }</p>
        </div>
        <div className='delete' onClick={deleteMessage} >
          <Delete className='delete_icon' fontSize='medium' />
        </div>
    </div>
  )
}

export default Message