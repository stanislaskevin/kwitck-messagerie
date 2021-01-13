import React from 'react'
import './Logged.css'
import Avatar from '@material-ui/core/Avatar'

export default function Logged({username}) {

    return (
        <div className="logged">
            <Avatar style={{width:3+'em', height:3+'em'}}/>
            <p>{username}</p>
        </div>
    )
}
