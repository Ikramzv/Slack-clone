import React, { useEffect, useState } from 'react'
import './styles/sidebar.css'
import SidebarOption from './SidebarOption'
import db from '../firebase/firebase'

// ICONS
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import CreateIcon from '@mui/icons-material/Create'
import InsertCommentIcon from '@mui/icons-material/InsertComment'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import AppsIcon from '@mui/icons-material/Apps'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { useDataLayerValue } from '../appState/StateProvider'

function Sidebar() {

  const [channels , setChannels] = useState([])
  const [{user} , dispatch] = useDataLayerValue()

  useEffect(() => {
    onSnapshot(collection(db , 'rooms') , (snapshot) => {
      const channels = snapshot.docs.map((doc) => {
        return {...doc.data() , id: doc.id}
      })
      setChannels(channels)   
    })
  } , [])

  console.log(channels);

  const deleteChannelFromFirebase = (id) => {
    deleteDoc(doc(db , `/rooms` , id))
    console.log(id)
  }
  
  return (
    <div className='sidebar' >
        <div className='sidebar_header'>
            <div className='sidebar_info'>
                <h2>Frontend Developer</h2>
                <h3>
                    <FiberManualRecordIcon />
                    {user?.displayName}
                </h3>
            </div>
            <CreateIcon />
        </div>

        <SidebarOption Icon={InsertCommentIcon} title={'Threads'} />
        <SidebarOption Icon={InboxIcon} title={'Mentions & reactions'} />
        <SidebarOption Icon={DraftsIcon} title={'Saved items'} />
        <SidebarOption Icon={BookmarkBorderIcon} title={'Channel browser'} />
        <SidebarOption Icon={PeopleAltIcon} title={'People & user groups'} />
        <SidebarOption Icon={AppsIcon} title={'Apps'} />
        <SidebarOption Icon={FileCopyIcon} title={'File browser'} />
        <SidebarOption Icon={ExpandLessIcon} title={'Show less'} />
        <hr />
        <SidebarOption Icon={ExpandMoreIcon} title={'Channels'} />
        <hr />
        <SidebarOption Icon={AddIcon} addChannelOption title={'Add Channel'} />
        {channels && channels.map((channel) => (
            <SidebarOption key={channel.id} title={channel.name} id={channel.id} deleteChannel={() => deleteChannelFromFirebase(channel.id)} />
        ))}  

    </div>
  )
}

export default Sidebar